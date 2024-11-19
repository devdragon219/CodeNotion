using RealGimm.SharedKernel.Interfaces;
using RealGimm.Core.Common.ConfigAggregate;
using RealGimm.Core.Common.Interfaces;
using Microsoft.Extensions.Logging;
using RealGimm.Core;
using RealGimm.Core.Common.ConfigAggregate.Specifications;
using RealGimm.Core.Common.CityAggregate;
using RealGimm.Core.Common.CustomCodeAggregate;
using RealGimm.Core.Common.VATRateAggregate;
using RealGimm.Core.Prop.BillItemTypeAggregate;
using RealGimm.Core.Common.AccountingItemAggregate;

namespace RealGimm.Plugin.Import.Common;

public partial class DefaultCommonDataImporter : IUpstreamDataImporter, IConfigurableModule
{
  public int ExecutionOrder => 1;

  public static readonly Guid IMPORT_CITY_PROVIDER = new("e50a4609-f411-486c-befd-c76f081f997d");

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
  private static readonly Dictionary<string, string> _isoDictionary = ISO3166.Country.List
    .ToDictionary(c => c.TwoLetterCode, c => c.ThreeLetterCode);

  public required ILogger<DefaultCommonDataImporter> _logger { protected get; init; }
  public required IReadRepository<Core.Common.ConfigAggregate.Config> _configRepository { protected get; init; }
  public required IRepository<VATRate> _vatRates { protected get; init; }
  public required IRepository<AccountingItem> _accountingItems { protected get; init; }
  public required IRepository<BillItemType> _billItemTypes { protected get; init; }
  public required IRepository<City> _cities { protected get; init; }
  public required IRepository<CustomCode> _codeRepository { protected get; init; }

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

    _logger.LogInformation("Begin syncing COMMON data from upstream");
    var dateStart = DateTime.UtcNow;

    await UpdateCities(cancellationToken);

    await UpdateVATRates(cancellationToken);

    //Yes we import the bill item types here, even though they are from the PROP module
    await UpdateBillItemTypes(cancellationToken);

    _logger.LogInformation("Done syncing COMMON data from upstream (took {elapsed})", DateTime.UtcNow - dateStart);
  }
}
