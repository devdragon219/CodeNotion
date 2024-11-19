using DotNet.Testcontainers.Builders;
using DotNet.Testcontainers.Containers;
using DotNet.Testcontainers.Images;

namespace RealGimm.FunctionalTests.Web;

public class SharedDockerCmisService
{
  private static SharedDockerCmisService? _service;

  private readonly SemaphoreSlim _respawnSemaphore = new(1);
  private readonly object _stopLocker = new();
  private IContainer? _container;

  const string IMAGE_NAME = "inmemory-cmis2";
  private static readonly IFutureDockerImage _futureImage;

  private bool _isStarted = false;
  private int _usersCount = 0;

  static SharedDockerCmisService()
  {
    string opencmisContext = Path.Combine(
          Environment.GetEnvironmentVariable("TOOLS_DIRECTORY") ?? string.Empty,
          "opencmis-inmemory");

    _futureImage = new ImageFromDockerfileBuilder()
      .WithDockerfile("Dockerfile")
      .WithDockerfileDirectory(opencmisContext)
      .WithName(IMAGE_NAME)
      .WithImageBuildPolicy(PullPolicy.Missing)
      .Build();
  }

  public static SharedDockerCmisService GetOrCreate()
  {
    return _service ??= new SharedDockerCmisService();
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

      await _futureImage.CreateAsync().ConfigureAwait(false);

      _container = new ContainerBuilder()
        .WithImage(_futureImage)
        .WithName("cmistest-web")
        .WithPortBinding(8081, true)
        .WithWaitStrategy(Wait
          .ForUnixContainer()
          .UntilHttpRequestIsSucceeded(s => s
            .ForPort(8081)
            .ForPath("/inmemory/")))
        .Build();

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

    if (_container is not null)
    {
      await _container.DisposeAsync();
    }
  }

  public string GetConnectionAtomURL()
  {
    var port = _container?.GetMappedPublicPort(8081) ?? 8081;
    var host = _container?.Hostname ?? "localhost";
    return $"http://{host}:{port}/inmemory/atom11";
  }
}
