using RealGimm.SharedKernel.Interfaces;
using RealGimm.Core.Common.ConfigAggregate;
using RealGimm.Core.Common.Interfaces;
using Microsoft.Extensions.Logging;
using RealGimm.Core;
using RealGimm.Core.Common.ConfigAggregate.Specifications;
using RealGimm.Core.Common.CustomCodeAggregate;
using RealGimm.Core.Common.OfficialActAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate;

namespace RealGimm.Plugin.Import.Common;

public partial class DefaultLateCommonDataImporter : IUpstreamDataImporter, IConfigurableModule
{
  public int ExecutionOrder => 100;

  public ConfigFunction Function => ConfigFunction.DataImport;
  public string[] ConfigurationParameters
  {
    get
    {
      return [
        ConfigWellKnownNames.DATA_IMPORT_CONNECTION_STRING
      ];
    }
  }

  private string? _connectionString;

  public required ILogger<DefaultCommonDataImporter> _logger { protected get; init; }
  public required IReadRepository<Config> _configRepository { protected get; init; }
  public required IRepository<OfficialAct> _officialActs { protected get; init; }
  public required IRepository<CustomCode> _codeRepository { protected get; init; }
  public required IRepository<EstateUnit> _estateUnits { protected get; init; }

  private async Task EnsureInitializedAsync(CancellationToken cancellationToken)
  {
    if (!string.IsNullOrEmpty(_connectionString)) return;

    var connectionString = await _configRepository.FirstOrDefaultAsync(
      new ConfigByFunctionNameSpec(
        ConfigFunction.DataImport,
        ConfigWellKnownNames.DATA_IMPORT_CONNECTION_STRING),
      cancellationToken);

    if (connectionString is null || string.IsNullOrEmpty(connectionString.Value))
    {
      throw new ArgumentNullException("Upstream Connection String is missing");
    }

    _connectionString = connectionString.Value;
  }

  public async Task PerformUpstreamUpdate(CancellationToken cancellationToken)
  {
    await EnsureInitializedAsync(cancellationToken);

    _logger.LogInformation("Begin syncing LATE-COMMON data from upstream");
    var dateStart = DateTime.UtcNow;

    await UpdateOfficialActs(cancellationToken);

    _logger.LogInformation("Done syncing LATE-COMMON data from upstream (took {Elapsed})", DateTime.UtcNow - dateStart);
  }
}
