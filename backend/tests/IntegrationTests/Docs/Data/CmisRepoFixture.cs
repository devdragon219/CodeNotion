using DotNet.Testcontainers.Builders;
using DotNet.Testcontainers.Containers;
using DotNet.Testcontainers.Images;
using Microsoft.Extensions.Logging;
using RealGimm.Infrastructure.Docs.Data;
using Xunit;

namespace RealGimm.IntegrationTests.Docs.Data;

public class CmisRepoFixture : IAsyncLifetime
{
  private int _containerUsers = 0;
  private readonly ILoggerFactory _loggerFactory;
  private DocsCmisRepository? _docsCmisRepository;
  private static IContainer? _container;
  private static readonly IFutureDockerImage _futureImage;

  const string IMAGE_NAME = "inmemory-cmis2";

  static CmisRepoFixture()
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

  public CmisRepoFixture()
  {
    _loggerFactory = LoggerFactory.Create(b =>
    {
      b.AddConsole();
    });
  }

  private static async Task<bool> IsInmemoryServiceReady(int port)
  {
    using var httpClient = new HttpClient();
    var uri = new Uri($"http://inmemorydocs:{port}/inmemory/");

    try
    {
      var response = await httpClient.GetAsync(uri);

      if (response.IsSuccessStatusCode)
      {
        return true;
      }
    }
    catch (HttpRequestException)
    {
      // Exception occurs if the request failed. This could be because no service is listening, or it's not responding correctly.
      return false;
    }

    return false;
  }

  public DocsCmisRepository GetRepositoryAsync()
  {
    return _docsCmisRepository!;
  }

  public async Task InitializeAsync()
  {
    if (_docsCmisRepository == null)
    {
      if (await IsInmemoryServiceReady(8081))
      {
        var config = new CmisFixedConfigProvider(
          "http://inmemorydocs:8081/inmemory/atom11",
          "test",
          "test",
          null);

        //We are on a devcontainer setup
        _docsCmisRepository = new DocsCmisRepository(
          _loggerFactory.CreateLogger<DocsCmisRepository>(),
          new CmisSession(_loggerFactory.CreateLogger<CmisSession>(), config),
          new UserDataProvider());
      }
      else
      {
        if (_container is null)
        {
          await _futureImage.CreateAsync().ConfigureAwait(false);

          _container = new ContainerBuilder()
            .WithImage(IMAGE_NAME)
            .WithName("cmistest")
            .WithPortBinding(8081, true)
            .WithWaitStrategy(Wait
              .ForUnixContainer()
              .UntilHttpRequestIsSucceeded(s => s
                .ForPort(8081)
                .ForPath("/inmemory/")))
            .Build();
        }

        if (Interlocked.Increment(ref _containerUsers) == 1)
        {
          await _container.StartAsync().ConfigureAwait(false);
        }

        var port = _container.GetMappedPublicPort(8081);
        var host = _container.Hostname ?? "localhost";

        var config = new CmisFixedConfigProvider(
          $"http://{host}:{port}/inmemory/atom11",
          "test",
          "test",
          null);

        _docsCmisRepository = new DocsCmisRepository(
          _loggerFactory.CreateLogger<DocsCmisRepository>(),
          new CmisSession(_loggerFactory.CreateLogger<CmisSession>(), config),
          new UserDataProvider());
      }
    }
  }

  async Task IAsyncLifetime.DisposeAsync()
  {
    if (_container is not null)
    {
      if (Interlocked.Decrement(ref _containerUsers) == 0)
      {
        await _container.StopAsync();
      }
    }
    else if (_docsCmisRepository is not null)
    {
      //Clean all documents inside the repo if using local container
      await _docsCmisRepository.DeleteRangeAsync(
        await _docsCmisRepository.ListAsync()
      );
    }
  }
}
