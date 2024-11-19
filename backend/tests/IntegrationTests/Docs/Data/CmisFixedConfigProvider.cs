using RealGimm.Infrastructure.Docs;

namespace RealGimm.IntegrationTests.Docs.Data;

public class CmisFixedConfigProvider : ICmisConfigProvider
{
  public string? AtomUrl { get; private set; }

  public string? Username { get; private set; }

  public string? Password { get; private set; }
  public string? BaseDirectory { get; private set; }

  public CmisFixedConfigProvider(string atomUrl, string username, string password, string? baseDirectory)
  {
    AtomUrl = atomUrl;
    Username = username;
    Password = password;
    BaseDirectory = baseDirectory;
  }

  public Task InitializeAsync(CancellationToken cancellationToken) => Task.CompletedTask;
}