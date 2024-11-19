using RealGimm.Core;
using RealGimm.Core.Common.ConfigAggregate;
using RealGimm.Core.Common.ConfigAggregate.Specifications;

namespace RealGimm.Infrastructure.Docs.Data;

public class CmisConfigProvider : ICmisConfigProvider
{
  private string? _atomUrl, _username, _password, _baseDirectory;

  private readonly IReadRepository<Config> _configRepository;

  public string? AtomUrl => _atomUrl;

  public string? Username => _username;

  public string? Password => _password;

  public string? BaseDirectory => _baseDirectory;

  public CmisConfigProvider(IReadRepository<Config> configRepository)
  {
    _configRepository = configRepository;
  }

  public async Task InitializeAsync(CancellationToken cancellationToken)
  {
    var configs = await _configRepository
      .ListAsync(new ConfigByFunctionSpec(ConfigFunction.CMISEndpoint), cancellationToken);

    _atomUrl = configs.FirstOrDefault(c => c.Name == CmisSession.CMIS_ATOMURL)?.Value;
    _username = configs.FirstOrDefault(c => c.Name == CmisSession.CMIS_USERNAME)?.Value;
    _password = configs.FirstOrDefault(c => c.Name == CmisSession.CMIS_PASSWORD)?.Value;
    _baseDirectory = configs.FirstOrDefault(c => c.Name == CmisSession.CMIS_BASE_DIRECTORY)?.Value;
  }
}