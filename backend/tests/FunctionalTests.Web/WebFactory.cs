using Autofac;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using RealGimm.Infrastructure;
using RealGimm.SharedKernel;
using RealGimm.SharedKernel.Interfaces;
using RealGimm.Web;
using RealGimm.WebCommons.GraphQL.User;

namespace RealGimm.FunctionalTests.Web;

public abstract class WebFactory : DockerApiFactory<Program>
{
  private readonly bool _seedDefaultData;

  public WebFactory(string imageName, string databaseName, bool seedDefaultData)
    : this(imageName, databaseName, seedDefaultData, null)
  {
  }

  protected WebFactory(string imageName, string databaseName, bool seedDefaultData, DelegatedApiFactoryOptions? options)
    : base(imageName, databaseName, options)
  {
    _seedDefaultData = seedDefaultData;
  }

  protected sealed override IHost CreateHost(IHostBuilder builder)
  {
    builder.ConfigureContainer<ContainerBuilder>(containerBuilder =>
    {
      if (!containerBuilder.Properties.ContainsKey(RuntimeEnv.ENV))
      {
        containerBuilder.Properties.Add(RuntimeEnv.ENV, RuntimeEnv.DEV);
      }

      containerBuilder.RegisterInstance(new UserDataProvider())
        .As<IUserDataProvider>();

      containerBuilder.RegisterType<TestInfrastructurePreparer>()
        .As<IInfrastructurePreparer>()
        .InstancePerLifetimeScope();

      containerBuilder.RegisterType<UserIdentity>()
        .As<UserIdentity>()
        .InstancePerLifetimeScope();

      containerBuilder.RegisterType<Auth>()
        .As<IAuthSettingsProvider>()
        .InstancePerLifetimeScope();
    });

    ConfigureHost(builder);

    return base.CreateHost(builder);
  }

  protected sealed override void ConfigureWebHost(IWebHostBuilder builder)
  {
    base.ConfigureWebHost(builder);

    RabbitMqContainer.Instance.EnsureInitialized();

    var defaultConnectionString = GetConnectionString()!;
    var tenantConnectionString = defaultConnectionString.Replace(DatabaseName, $"{DatabaseName}_{TrackableDbContext.TENANT_PLCHLDR}");

    builder.UseSetting("ConnectionStrings:DefaultConnection", defaultConnectionString);
    builder.UseSetting("ConnectionStrings:TenantConnection", tenantConnectionString);
    builder.UseSetting("DatabaseProvider", "PostgreSQL");
    builder.UseSetting("ConnectionStrings:RabbitMq", "amqp://guest:guest@"
      + RabbitMqContainer.Instance.GetConnectionStringHostPort());
    builder.UseSetting(TestInfrastructurePreparer.SeedDefaultDataOptionName, _seedDefaultData.ToString());
    builder.UseSetting(Jwt.CONF_SIGNING_KEY, "SSDA549PPPL88XMVNGKEJAADASGLKOPW");

    ConfigureHost(builder);
  }

  protected virtual void ConfigureHost(IWebHostBuilder builder)
  {
    // nothing here
  }

  protected virtual void ConfigureHost(IHostBuilder builder)
  {
    // nothing here
  }
}
