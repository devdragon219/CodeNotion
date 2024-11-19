using Autofac;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using RealGimm.Core.IAM;
using RealGimm.Infrastructure;
using RealGimm.SharedKernel;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.FunctionalTests.TenantCtl;

public static class TestHostConfigurator
{
  public static IHostBuilder ConfigureBuilder(IHostBuilder builder, params string[] args)
  {
    builder.UseEnvironment("Development"); // will not send real emails
    
    builder.ConfigureServices(config =>
    {
      config.AddEntityFrameworkInMemoryDatabase();
      config.AddDistributedMemoryCache();
    });

    builder.ConfigureContainer<ContainerBuilder>(contBuilder =>
    {
      var config = new ConfigurationBuilder()
        .AddCommandLine(args)
        .AddInMemoryCollection(new Dictionary<string, string?>{
          {"ConnectionString:RabbitMq", "amqp://guest:guest@"
            + RabbitMqContainer.Instance.GetConnectionStringHostPort()},
          {"DatabaseProvider", "PostgreSQL"}
        })
        .Build();

      if (!contBuilder.Properties.ContainsKey(RuntimeEnv.ENV))
      {
        contBuilder.Properties.Add(RuntimeEnv.ENV, RuntimeEnv.DEV);
      }

      contBuilder.RegisterInstance<IMemoryCache>(new MemoryCache(
        new MemoryCacheOptions()
      ));

      contBuilder.RegisterInstance<IConfiguration>(config);

      contBuilder.RegisterInstance<IUserDataProvider>(UserDataProvider.Instance);

      contBuilder.RegisterAssemblyModules(typeof(IAMCoreModule).Assembly);

      contBuilder.RegisterAssemblyModules(typeof(InfrastructureModule).Assembly);
    });

    return builder;
  }
}
