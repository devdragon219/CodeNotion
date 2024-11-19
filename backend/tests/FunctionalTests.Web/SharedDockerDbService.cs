using System.Collections.Concurrent;
using System.Data.Common;
using DotNet.Testcontainers.Builders;
using DotNet.Testcontainers.Configurations;
using DotNet.Testcontainers.Containers;
using Npgsql;
using RealGimm.Infrastructure;
using Respawn;
using Testcontainers.PostgreSql;

namespace RealGimm.FunctionalTests.Web;

public class SharedDockerDbService
{
  private static readonly ConcurrentDictionary<(string ImageName, string DatabaseName), SharedDockerDbService> _services = new();

  private readonly SemaphoreSlim _respawnSemaphore = new(1);
  private readonly object _stopLocker = new();
  private readonly PostgreSqlContainer _container;
  private readonly string _databaseName;

  private DbConnection _dbConnection = null!;
  private Respawner? _defaultTenantRespawner;
  private bool _isStarted = false;
  private int _usersCount = 0;

  private SharedDockerDbService(string imageName, string databaseName)
  {
    _container = new PostgreSqlBuilder()
      .WithCleanUp(true)
      .WithImage(imageName)
      .WithCommand("-c", "max_connections=500")
      .WithPortBinding(5432, assignRandomHostPort: true)
      .WithWaitStrategy(Wait.ForUnixContainer().AddCustomWaitStrategy(new WaitStrategy()))
      .Build();

    _databaseName = databaseName;
  }

  public static SharedDockerDbService GetOrCreate(string imageName, string databaseName)
  {
    ArgumentNullException.ThrowIfNull(imageName);
    ArgumentNullException.ThrowIfNull(databaseName);

    return _services.GetOrAdd((imageName, databaseName), new SharedDockerDbService(imageName, databaseName));
  }

  // only first "user" actually calls starting
  public async Task StartAsync()
  {
    await _respawnSemaphore.WaitAsync();

    try
    {
      _usersCount++;

      if (_isStarted)
      {
        return;
      }

      _isStarted = true;

      await _container.StartAsync();
    }
    finally
    {
      _respawnSemaphore.Release();
    }
  }

  // only last "user" calls dispose
  public async Task RequestDisposeAsync()
  {
    if (!_isStarted)
    {
      return;
    }

    lock (_stopLocker)
    {
      _usersCount--;

      if (_usersCount > 0)
      {
        return;
      }
    }

    if (_dbConnection is not null)
    {
      await _dbConnection.DisposeAsync();
    }

    await _container.DisposeAsync();
  }

  public string GetConnectionString()
    => _container
      .GetConnectionString()
      .Replace("Database=postgres;", $"Database={_databaseName};")
      + ";MaxPoolSize=270";

  public string GetTenantConnectionString()
    => _container
      .GetConnectionString()
      .Replace("Database=postgres;", $"Database={_databaseName}_{TrackableDbContext.TENANT_PLCHLDR};")
      + ";MaxPoolSize=270";

  public string GetDefaultTenantConnectionString()
    => GetTenantConnectionString()
      .Replace(TrackableDbContext.TENANT_PLCHLDR, $"{UserIdentity.DefaultTenantGuid:N}");

  public async Task ResetTenantDatabaseAsync()
  {
    if (_defaultTenantRespawner == null)
    {
      return;
    }

    await _defaultTenantRespawner.ResetAsync(_dbConnection);
  }

  public async Task InitializeDefaultTenantRespawnerAsync()
  {
    _dbConnection = new NpgsqlConnection(GetDefaultTenantConnectionString());
    await _dbConnection.OpenAsync();

    _defaultTenantRespawner = await Respawner.CreateAsync(_dbConnection, new RespawnerOptions
    {
      DbAdapter = DbAdapter.Postgres,
      WithReseed = true,
      SchemasToExclude = new[] { "iam" }
    });
  }
}

internal class WaitStrategy : IWaitUntil
{
  public Task<bool> UntilAsync(IContainer container)
  {
    var postgresContainer = (PostgreSqlContainer)container;

    try
    {
      using var connection = new NpgsqlConnection(postgresContainer.GetConnectionString());
      connection.Open();

      using var command = new NpgsqlCommand("SELECT PostGIS_Full_Version();", connection);
      using var reader = command.ExecuteReader();

      while (reader.Read())
      {
        var result = reader.GetString(0);
        if (!string.IsNullOrEmpty(result))
        {
          return Task.FromResult(true);
        }
      }

      return Task.FromResult(false);
    }
    catch
    {
      return Task.FromResult(false);
    }
  }
}
