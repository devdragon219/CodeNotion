using DotNet.Testcontainers.Builders;
using DotNet.Testcontainers.Containers;

namespace RealGimm.FunctionalTests.TenantCtl;

public sealed class RabbitMqContainer : IAsyncDisposable, IDisposable
{
  public static readonly RabbitMqContainer Instance = new();

  private IContainer? _container;

  private RabbitMqContainer()
  {

  }

  public void EnsureInitialized()
  {
    //Return even if the container is not actually started - the Rebus code
    // will actually wait for a connection to succeed.
    if (_container is not null) return;

    //The same consideration applies here for the absence of a wait strategy.
    _container = new ContainerBuilder()
        .WithImage("rabbitmq:3-alpine")
        .WithName($"rabbitmq-{Guid.NewGuid()}")
        .WithPortBinding(5672, true)
        .Build();

    _container.StartAsync().GetAwaiter().GetResult();
  }

  public string? GetConnectionStringHostPort()
  {
    return $"{_container?.Hostname}:{_container?.GetMappedPublicPort(5672)}";
  }

  public ValueTask DisposeAsync()
  {
    DoDispose();
    GC.SuppressFinalize(this);

    return ValueTask.CompletedTask;
  }

  public void Dispose()
  {
    DoDispose();
    GC.SuppressFinalize(this);
  }

  private void DoDispose()
  {
    if (_container is not null)
    {
      _container.StopAsync().GetAwaiter().GetResult();

      if (_container is IDisposable disposable)
      {
        disposable.Dispose();
      }

      _container = null;
    }
  }

  ~RabbitMqContainer()
  {
    DoDispose();
  }
}
