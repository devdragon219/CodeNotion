using RealGimm.Core.IAM;
using RealGimm.SharedKernel;
using RealGimm.SharedKernel.Interfaces;
using Serilog;
using System.Reflection;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Autofac;
using Autofac.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Localization;
using RealGimm.Core.Resources;
using Microsoft.Extensions.Caching.Memory;
using Community.Microsoft.Extensions.Caching.PostgreSql;
using RealGimm.Core.EventSystem;

namespace RealGimm.TenantCtl;

public static class HostBuilder
{
  public static IHostBuilder CreateHostBuilder(string[] args, IDictionary<string, string?>? additionalConfiguration = null)
  {
    var cbuilder = new ConfigurationBuilder()
      .SetBasePath(Directory.GetCurrentDirectory())
      .AddJsonFile("./appsettings.json")
      .AddEnvironmentVariables()
      .AddCommandLine(args);

    if (additionalConfiguration is not null)
    {
      cbuilder.AddInMemoryCollection(additionalConfiguration);
    }

    var config = cbuilder.Build();

    var builder = Host.CreateDefaultBuilder(args)
      .UseServiceProviderFactory(new AutofacServiceProviderFactory());

    builder.UseSerilog((_, cfg) =>
    {
      var minimumLevel = config.GetValue<string>(
        "Serilog.MinimumLevel",
        "Information")!;

      cfg.WriteTo.Console(Enum.Parse<Serilog.Events.LogEventLevel>(minimumLevel));
      cfg.MinimumLevel.Override(
        "Microsoft.AspNetCore",
        Serilog.Events.LogEventLevel.Warning);
    });

    var infraAssembly = Assembly.LoadFrom(_infrastructureAssembly.Value);
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
        svc.AddLocalization();

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
            null);
        }

        svc.AddDistributedPostgreSqlCache(setup =>
        {
          setup.ConnectionString = config.GetConnectionString("DefaultConnection");
          setup.SchemaName = "caching";
          setup.TableName = "CacheItems";
        });

        svc.AddHttpClient();
      });

    return builder.UseCommandLineApplication<Program>(args);
  }

  private static readonly Lazy<string> _infrastructureAssembly = new(() =>
  {
    var assemblyPath = Path.Combine(
      Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location) ?? ".",
      "RealGimm.Infrastructure.dll");

    if (!File.Exists(assemblyPath))
    {
      throw new FileNotFoundException("Unable to find RealGimm.Infrastructure.dll in path");
    }

    return assemblyPath;
  });

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
