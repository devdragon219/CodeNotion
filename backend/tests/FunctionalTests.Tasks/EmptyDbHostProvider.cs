using Autofac;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using RealGimm.FunctionalTests.Web;
using RealGimm.SharedKernel;
using RealGimm.SharedKernel.Interfaces;
using Rebus.Bus;

namespace RealGimm.FunctionalTests.Tasks;

public sealed class EmptyDbHostProvider : ITestHostProvider, IAsyncLifetime
{
  private IHost _host = default!;
  private readonly SharedDockerDbService _dockerDbService;

  public EmptyDbHostProvider()
  {
    _dockerDbService = SharedDockerDbService.GetOrCreate("postgis/postgis:14-3.3-alpine", "rg5_tasks_empty");
  }

  public IHost GetHost() => _host;
  public Task ResetTenantDatabaseAsync() => _dockerDbService.ResetTenantDatabaseAsync();

  public async Task InitializeAsync()
  {
    RabbitMqContainer.Instance.EnsureInitialized();
    await _dockerDbService.StartAsync();

    _host = CreateHost();
    await PrepareHostAsync();
    await _dockerDbService.InitializeDefaultTenantRespawnerAsync();
  }

  public async Task DisposeAsync()
  {
    _host.Dispose();
    await _dockerDbService.RequestDisposeAsync();
  }

  private IHost CreateHost()
  {
    var inMemorySettings = new Dictionary<string, string?>
    {
      ["ConnectionStrings:RabbitMq"] = $"amqp://guest:guest@{RabbitMqContainer.Instance.GetConnectionStringHostPort()}",
      ["ConnectionStrings:DefaultConnection"] = _dockerDbService.GetConnectionString(),
      ["ConnectionStrings:TenantConnection"] = _dockerDbService.GetTenantConnectionString(),
      ["DatabaseProvider"] = "PostgreSQL",
    };

    var builder = RealGimm.Tasks.HostBuilder.CreateHostBuilder(Array.Empty<string>(), inMemorySettings);

    builder.UseEnvironment("Development");

    builder.ConfigureContainer<ContainerBuilder>(containerBuilder =>
    {
      if (!containerBuilder.Properties.ContainsKey(RuntimeEnv.ENV))
      {
        containerBuilder.Properties.Add(RuntimeEnv.ENV, RuntimeEnv.DEV);
      }

      containerBuilder
        .RegisterInstance(new UserDataProvider())
        .As<IUserDataProvider>();

      containerBuilder
        .RegisterType<TestInfrastructurePreparer>()
        .As<IInfrastructurePreparer>()
        .InstancePerLifetimeScope();

      containerBuilder.RegisterType<UserIdentity>()
        .As<UserIdentity>()
        .InstancePerLifetimeScope();
    });

    return builder.Build();
  }

  private async Task PrepareHostAsync()
  {
    await using var scope = _host.Services.CreateAsyncScope();

    //Disable message processing
    var bus = scope.ServiceProvider.GetRequiredService<IBus>();
    bus.Advanced.Workers.SetNumberOfWorkers(0);

    await scope.ServiceProvider
      .GetRequiredService<IInfrastructurePreparer>()
      .PrepareAsync();
  }
}
