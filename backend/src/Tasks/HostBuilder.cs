using System.Reflection;
using Autofac;
using Autofac.Extensions.DependencyInjection;
using Community.Microsoft.Extensions.Caching.PostgreSql;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Localization;
using Quartz;
using RealGimm.Core;
using RealGimm.Core.EventSystem;
using RealGimm.Core.IAM;
using RealGimm.Core.Resources;
using RealGimm.SharedKernel;
using RealGimm.SharedKernel.Attributes;
using RealGimm.SharedKernel.Interfaces;
using Rebus.Handlers;
using Serilog;

namespace RealGimm.Tasks;

public static class HostBuilder
{
  public static IHostBuilder CreateHostBuilder(string[] args, IEnumerable<KeyValuePair<string, string?>>? inMemorySettings = null)
  {
    var config = new ConfigurationBuilder()
      .SetBasePath(Directory.GetCurrentDirectory())
      .AddJsonFile("./appsettings.json")
      .AddEnvironmentVariables()
      .AddCommandLine(args)
      .AddInMemoryCollection(inMemorySettings ?? [])
      .Build();

    var builder = Host.CreateDefaultBuilder(args)
      .UseServiceProviderFactory(new AutofacServiceProviderFactory());

    builder.UseSerilog((_, cfg) =>
    {
      var minimumLevel = config.GetValue<string>(
        "Serilog.MinimumLevel",
        "Information")!;

      cfg.WriteTo.Console(Enum.Parse<Serilog.Events.LogEventLevel>(minimumLevel));
    });

    var infraAssembly = Assembly.LoadFrom(_infrastructureAssembly);
    var customizationAssembly = LoadInfrastructureCustomizationAssembly();

    builder
      .ConfigureContainer<ContainerBuilder>(containerBuilder =>
      {
        containerBuilder.Properties.Add(RuntimeEnv.ENV, RuntimeEnv.PROD);

        containerBuilder.RegisterInstance<IConfiguration>(config);

        containerBuilder
          .RegisterInstance<IUserDataProvider>(new UserDataProvider());

        containerBuilder.RegisterAssemblyModules(typeof(IAMCoreModule).Assembly);

        containerBuilder.RegisterInstance<IMemoryCache>(new MemoryCache(
          new MemoryCacheOptions()
        ));

        containerBuilder
          .RegisterInstance(new JsonStringLocalizer())
          .As<IStringLocalizer>();

        containerBuilder
          .RegisterInstance(new JsonStringLocalizerFactory())
          .As<IStringLocalizerFactory>();

        containerBuilder.RegisterAssemblyModules(infraAssembly);

        containerBuilder.RegisterPlugins();

        if (customizationAssembly is not null)
        {
          containerBuilder.RegisterAssemblyModules(customizationAssembly);
        }
      })
      .ConfigureServices(svc =>
      {
        svc.AddHttpClient();

        svc.AddQuartz(quartz =>
        {
          var coreAssembly = typeof(AnyTenantJob).Assembly;

          var jobTypes = coreAssembly
            .GetTypes()
            .Where(type => type.IsAssignableTo(typeof(IJob)) && !type.IsAbstract)
            .ToList();

          var endlessJobs = jobTypes.Where(type => type.GetCustomAttribute<EndlessJobAttribute>() is not null);
            
          foreach (var jobType in endlessJobs)
          {
            quartz.AddEndlessJobAndTrigger(jobType, config);
          }
          
          var scheduledJobs = jobTypes.Where(type => type.GetCustomAttribute<EndlessJobAttribute>() is null);

          foreach (var jobType in scheduledJobs)
          {
            quartz.AddScheduledJobAndTrigger(jobType, config);
          }
        });

        svc.AddQuartzHostedService(opt =>
        {
          opt.WaitForJobsToComplete = true;
        });

        var backgroundHandlers = typeof(IAMCoreModule).Assembly
          .GetTypes()
          .Concat(infraAssembly.GetTypes())
          .Concat(customizationAssembly?.GetTypes() ?? [])
          .Where(t => t.GetCustomAttribute<BackgroundEventHandlerAttribute>() is not null)
          .Append(typeof(RunTaskHandler))
          .Where(bh => bh.GetInterfaces().Any(intf => intf.IsGenericType && intf.GetGenericTypeDefinition() == typeof(IHandleMessages<>)))
          .ToArray();

        var rebusConfiguratorType = infraAssembly
          .GetTypes()
          .FirstOrDefault(t => typeof(IRebusConfigurator).IsAssignableFrom(t)
            && !t.IsInterface
            && !t.IsAbstract);

        if (rebusConfiguratorType is not null)
        {
          var rebusConfigurator = (IRebusConfigurator?)Activator.CreateInstance(rebusConfiguratorType);

          rebusConfigurator?.ConfigureRGRebus(
            svc,
            config,
            MessageQueues.TASKS_QUEUE_NAME,
            backgroundHandlers);
        }

        svc.AddDistributedPostgreSqlCache(setup =>
        {
          setup.ConnectionString = config.GetConnectionString("DefaultConnection");
          setup.SchemaName = "caching";
          setup.TableName = "CacheItems";
        });

        svc.AddLocalization();
      });

    return builder;
  }

  private static string _infrastructureAssembly 
  {
    get {
    var assemblyPath = Path.Combine(
      Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location) ?? ".",
      "RealGimm.Infrastructure.dll");

    if (!File.Exists(assemblyPath))
    {
      throw new FileNotFoundException("Unable to find RealGimm.Infrastructure.dll in path");
    }

    return assemblyPath;
    }
  }

  private static Assembly? LoadInfrastructureCustomizationAssembly()
  {
    var assemblyPath = Path.Combine(
      Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location) ?? ".",
      "RealGimm.Infrastructure.Customization.dll");

    if (!File.Exists(assemblyPath))
    {
      return null;
    }

    return Assembly.LoadFrom(assemblyPath);
  }
}
