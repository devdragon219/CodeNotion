using System.Data.Common;
using Npgsql;
using Testcontainers.PostgreSql;
using Xunit;
using IContainer = DotNet.Testcontainers.Containers.IContainer;

namespace RealGimm.FunctionalTests.TenantCtl;

public sealed class TenantCtlFactory : IAsyncLifetime
{
  private readonly PostgreSqlContainer _postgreSqlContainer = new PostgreSqlBuilder()
    .WithImage("postgis/postgis:14-3.3-alpine")
    // .WithPortBinding(5432, 5432) // uncomment this to force a stable port and log into the db for debugging
    .WithDatabase("realgimm_5")
    .Build();

  public DbConnection DbConnection => new NpgsqlConnection(_postgreSqlContainer.GetConnectionString());

  public Task InitializeAsync()
  {
    RabbitMqContainer.Instance.EnsureInitialized();

    return _postgreSqlContainer.StartAsync();
  }

  public async Task DisposeAsync()
  {
    await _postgreSqlContainer.DisposeAsync();
  }
}
