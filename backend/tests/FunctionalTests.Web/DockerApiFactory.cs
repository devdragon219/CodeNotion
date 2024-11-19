using System.Reflection;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.Hosting;

namespace RealGimm.FunctionalTests.Web;

public record ApiFactoryDelegates(
  Func<IWebHostBuilder, TestServer> CreateServer,
  Func<IHostBuilder, IHost> CreateHost,
  Func<IWebHostBuilder?> CreateWebHostBuilder,
  Func<IHostBuilder?> CreateHostBuilder,
  Func<IEnumerable<Assembly>> GetTestAssemblies,
  Action<HttpClient> ConfigureClient,
  Action<IWebHostBuilder> ConfigureWebHost);

public class DelegatedApiFactoryOptions
{
  public WebApplicationFactoryClientOptions ClientOptions { get; }
  public ApiFactoryDelegates Delegates { get; }

  public DelegatedApiFactoryOptions(WebApplicationFactoryClientOptions clientOptions, ApiFactoryDelegates delegates)
  {
    ClientOptions = clientOptions ?? throw new ArgumentNullException(nameof(clientOptions));
    Delegates = delegates ?? throw new ArgumentNullException(nameof(delegates));
  }
}

public abstract class DockerApiFactory<TEntryPoint> : WebApplicationFactory<TEntryPoint>, IAsyncLifetime
  where TEntryPoint : class
{
  private static readonly ConstructorInfo _internalConstructor = typeof(WebApplicationFactoryClientOptions).GetConstructor(BindingFlags.Instance | BindingFlags.NonPublic, new[] { typeof(WebApplicationFactoryClientOptions) })!;
  private static readonly PropertyInfo _clientOptions = typeof(WebApplicationFactory<TEntryPoint>).GetProperty(nameof(ClientOptions))!;
  private static readonly FieldInfo _configuration = typeof(WebApplicationFactory<TEntryPoint>).GetField("_configuration", BindingFlags.Instance | BindingFlags.NonPublic)!;
  private static readonly FieldInfo _derivedFactories = typeof(WebApplicationFactory<TEntryPoint>).GetField("_derivedFactories", BindingFlags.Instance | BindingFlags.NonPublic)!;

  private readonly ApiFactoryDelegates? _delegates;
  private readonly SharedDockerDbService _dockerDbService;

  protected string ImageName { get; }
  protected string DatabaseName { get; }

  public HttpClient HttpClient { get; private set; } = default!;

  public DockerApiFactory(string imageName, string databaseName)
    : this(imageName, databaseName, null)
  {
  }

  protected DockerApiFactory(string imageName, string databaseName, DelegatedApiFactoryOptions? options)
  {
    ImageName = imageName ?? throw new ArgumentNullException(nameof(imageName));
    DatabaseName = databaseName ?? throw new ArgumentNullException(nameof(databaseName));

    _dockerDbService = SharedDockerDbService.GetOrCreate(ImageName, DatabaseName);

    if (options is not null)
    {
      _delegates = options.Delegates;

      _clientOptions.SetValue(this, _internalConstructor.Invoke(new[] { options.ClientOptions })!);
      _configuration.SetValue(this, _delegates.ConfigureWebHost);
    }
  }

  public async Task InitializeAsync()
  {
    await _dockerDbService.StartAsync();
    HttpClient = CreateClient();
  }

  public new async Task DisposeAsync() => await _dockerDbService.RequestDisposeAsync();

  public async Task InitializeDefaultTenantRespawnerAsync()
    => await _dockerDbService.InitializeDefaultTenantRespawnerAsync();
  
  public async Task ResetDefaultTenantDatabaseAsync() => await _dockerDbService.ResetTenantDatabaseAsync();

  public virtual DockerApiFactory<TEntryPoint> WithWebHost(Action<IWebHostBuilder> configureWebHost)
  {
    var _configureWebHost = (IWebHostBuilder builder) =>
    {
      InvokeConfiguration(builder);
      configureWebHost(builder);
    };

    var delegates = new ApiFactoryDelegates(CreateServer, CreateHost, CreateWebHostBuilder, CreateHostBuilder, GetTestAssemblies, ConfigureClient, _configureWebHost);
    var factory = CreateDelegatedApiFactory(new DelegatedApiFactoryOptions(ClientOptions, delegates));
    ((List<WebApplicationFactory<TEntryPoint>>)_derivedFactories.GetValue(this)!).Add(factory);

    return factory;
  }

  protected abstract DockerApiFactory<TEntryPoint> CreateDelegatedApiFactory(DelegatedApiFactoryOptions options);

  protected string? GetConnectionString() => _dockerDbService.GetConnectionString();

  protected override TestServer CreateServer(IWebHostBuilder builder)
    => _delegates?.CreateServer(builder) ?? base.CreateServer(builder);

  protected override IHost CreateHost(IHostBuilder builder)
    => _delegates?.CreateHost(builder) ?? base.CreateHost(builder);

  protected override IWebHostBuilder? CreateWebHostBuilder()
    => _delegates?.CreateWebHostBuilder() ?? base.CreateWebHostBuilder();

  protected override IHostBuilder? CreateHostBuilder()
    => _delegates?.CreateHostBuilder() ?? base.CreateHostBuilder();

  protected override IEnumerable<Assembly> GetTestAssemblies()
    => _delegates?.GetTestAssemblies() ?? base.GetTestAssemblies();

  protected override void ConfigureWebHost(IWebHostBuilder builder)
  {
    if (_delegates is not null)
    {
      InvokeConfiguration(builder);
      return;
    }

    base.ConfigureWebHost(builder);
  }

  protected override void ConfigureClient(HttpClient client)
  {
    if (_delegates is not null)
    {
      _delegates.ConfigureClient(client);
      return;
    }

    base.ConfigureClient(client);
  }

  private void InvokeConfiguration(IWebHostBuilder builder)
    => ((Action<IWebHostBuilder>)_configuration.GetValue(this)!).Invoke(builder);
}
