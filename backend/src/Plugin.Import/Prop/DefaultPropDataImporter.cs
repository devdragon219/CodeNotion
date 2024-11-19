using RealGimm.SharedKernel.Interfaces;
using RealGimm.Core.Common.ConfigAggregate;
using RealGimm.Core.Common.Interfaces;
using Microsoft.Extensions.Logging;
using RealGimm.Core;
using RealGimm.Core.Common.ConfigAggregate.Specifications;
using RealGimm.SharedKernel;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Common.CityAggregate;
using RealGimm.Core.Common.CustomCodeAggregate;
using Microsoft.EntityFrameworkCore;
using RealGimm.Plugin.Import.Common;
using RealGimm.Core.Common.CustomCodeAggregate.Specification;
using RealGimm.Core.Prop.ContractTypeAggregate;
using RealGimm.Core.Asst.EstateUsageTypeAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Plugin.Import.Asst;
using RealGimm.Core.Asst.EstateSubUnitAggregate;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Core.Prop.BillItemTypeAggregate;
using RealGimm.Core.Common.VATRateAggregate;

namespace RealGimm.Plugin.Import.Prop;

public partial class DefaultPropDataImporter : IUpstreamDataImporter, IConfigurableModule
{
  public int ExecutionOrder => 30;

  public ConfigFunction Function => ConfigFunction.DataImport;
  public string[] ConfigurationParameters => [
    ConfigWellKnownNames.DATA_IMPORT_CONNECTION_STRING,
    ConfigWellKnownNames.DATA_IMPORT_DISABLE_VALIDATION
  ];

  private string? _connectionString;
  private bool _disableValidation;

  public required ILogger<DefaultPropDataImporter> _logger { protected get; init; }
  public required IReadRepository<Config> _configRepository { protected get; init; }
  public required IReadRepository<City> _cities { protected get; init; }
  public required IReadRepository<Subject> _subjects { protected get; init; }
  public required IRepository<CustomCode> _codeRepository { protected get; init; }
  public required IRepository<ContractType> _contractTypesRepository { protected get; init; }
  public required IRepository<EstateUsageType> _usageTypesRepository { protected get; init; }
  public required IReadRepository<BillItemType> _billItemTypes { protected get; init; }
  public required IReadRepository<EstateSubUnit> _subUnitRepository { protected get; init; }
  public required IReadRepository<Estate> _estateRepository { protected get; init; }
  public required IReadRepository<VATRate> _vatRateRepository { protected get; init; }
  public required IServiceProvider _serviceProvider { protected get; init; }

  private async Task EnsureInitializedAsync(CancellationToken cancellationToken)
  {
    if (!string.IsNullOrEmpty(_connectionString)) return;

    var connectionString = await _configRepository.FirstOrDefaultAsync(
      new ConfigByFunctionNameSpec(
        ConfigFunction.DataImport,
        ConfigWellKnownNames.DATA_IMPORT_CONNECTION_STRING
      ),
      cancellationToken);

    if (connectionString is null || string.IsNullOrEmpty(connectionString.Value))
    {
      throw new ArgumentNullException("Upstream Connection String is missing");
    }

    var disableValidation = await _configRepository.FirstOrDefaultAsync(
      new ConfigByFunctionNameSpec(
        ConfigFunction.DataImport,
        ConfigWellKnownNames.DATA_IMPORT_DISABLE_VALIDATION
      ),
      cancellationToken);

    _disableValidation = disableValidation?.Value.IsHumanTrue() ?? false;

    _connectionString = connectionString.Value;
  }

  public async Task PerformUpstreamUpdate(CancellationToken cancellationToken)
  {
    await EnsureInitializedAsync(cancellationToken);

    _logger.LogInformation("Begin syncing PROP data from upstream");
    var dateStart = DateTime.UtcNow;

    var cities = await _cities.AsQueryable()
      .ToListAsync(cancellationToken: cancellationToken);
    var cityCoding = await _codeRepository.AsQueryable(new CustomCodeTranscoding<City>(
        DefaultCommonDataImporter.IMPORT_CITY_PROVIDER
      ))
      .ToListAsync(cancellationToken: cancellationToken);

    var citiesCache = cityCoding
      .Where(cc => !string.IsNullOrEmpty(cc.ExternalCode))
      .Select(cc => new
      {
        Key = cc.ExternalCode!,
        City = cities.FirstOrDefault(c => c.Id.ToString() == cc.InternalCode)
      })
      .Where(c => c.City is not null)
      .ToDictionary(o => o.Key, o => o.City!);

    await UpdateContractTypes(cancellationToken);

    _logger.LogInformation("Preparing PROP import context");

    var workspace = await PrepareWorkspace(citiesCache, cancellationToken);

    _logger.LogInformation("Import context ready, importing contracts");

    await ContractMasterData(workspace, cancellationToken);

    _logger.LogInformation("Contracts imported, importing administrations");

    await AdministrationData(workspace, cancellationToken);

    _logger.LogInformation("Done syncing PROP data from upstream (took {elapsed})", DateTime.UtcNow - dateStart);
  }

  private async Task<DefaultPropImportWorkspace> PrepareWorkspace(
    Dictionary<string, City> citiesCache,
    CancellationToken cancellationToken)
  {
    return new DefaultPropImportWorkspace(
      _disableValidation,
      await _billItemTypes
        .AsQueryable()
        .ToDictionaryAsync(bit => bit.InternalCode, bit => bit.Id, cancellationToken),
      citiesCache,
      await _contractTypesRepository
        .AsQueryable()
        .ToDictionaryAsync(ct => ct.InternalCode, ct => ct.Id, cancellationToken),
      await _subjects
        .AsQueryable()
        .Where(s => s.PersonType == PersonType.ManagementSubject)
        .ToDictionaryAsync(s => s.InternalCode, s => s.Id, cancellationToken),
      await _subjects
        .AsQueryable()
        .ToDictionaryAsync(s => s.InternalCode, s => s.Id, cancellationToken),
      await _codeRepository.AsQueryable(
        new CustomCodeTranscoding<EstateUnit>(
          DefaultAsstDataImporter.IMPORT_ASST_PROVIDER
        ))
        .ToDictionaryAsync(
          code => code.ExternalCode!,
          code => Convert.ToInt32(code.InternalCode),
          cancellationToken),
      await _codeRepository.AsQueryable(
        new CustomCodeTranscoding<EstateSubUnit>(
          DefaultAsstDataImporter.IMPORT_ASST_PROVIDER
        ))
        .ToDictionaryAsync(
          code => code.ExternalCode!,
          code => Convert.ToInt32(code.InternalCode),
          cancellationToken),
      await _subjects
        .AsQueryable()
        .Include(s => s.Addresses)
        .ToDictionaryAsync(s => s.InternalCode, s => s.Addresses.ToArray(), cancellationToken),
      await CounterpartsByContract(cancellationToken),
      await LocatedUnitsByContract(cancellationToken),
      await TransactorsByContract(cancellationToken),
      await _subUnitRepository
        .AsQueryable()
        .Include(su => su.EstateUnit)
        .ToDictionaryAsync(
          s => s.Id,
          s => s.EstateUnit.Id,
          cancellationToken),
      (await _subjects
        .AsQueryable()
        .Include(s => s.BankAccounts)
        .SelectMany(s => s.BankAccounts.Select(ba => new
        {
          ba.SubjectId,
          ba.Id,
          ba.ReferenceCode
        }))
        .ToListAsync(cancellationToken))
        .Select(o => new
        {
          Key = o.SubjectId + ";" + o.ReferenceCode,
          Value = o.Id
        })
        .GroupBy(a => a.Key)
        .ToDictionary(grp => grp.Key, grp => grp.First().Value),
      await _estateRepository
        .AsQueryable()
        .Select(est => new {
          est.InternalCode,
          est.Id
        })
        .GroupBy(est => est.InternalCode)
        .Select(grp => grp.First())
        .ToDictionaryAsync(
          obj => obj.InternalCode,
          obj => obj.Id,
          cancellationToken),
      await RecurringCostsByContract(cancellationToken),
      await _vatRateRepository
        .AsQueryable()
        .ToDictionaryAsync(vr => vr.InternalCode, vr => vr.Id, cancellationToken),
      await OneshotCostsByContract(cancellationToken),
      await SecurityDepositsByContract(cancellationToken),
      await RatePlansByContract(cancellationToken),
      await GetSublocations(cancellationToken)
    );
  }

  private async Task UpdateContractTypes(CancellationToken cancellationToken)
  {
    var contractTypes = await ContractTypes(cancellationToken);

    _logger.LogInformation("Received {contractTypeCount} contract types from upstream", contractTypes.Count);

    var existingTypes = await _contractTypesRepository
      .AsQueryable()
      .ToDictionaryAsync(vr => vr.InternalCode,
        cancellationToken: cancellationToken);

    //Never delete, only add or update
    foreach (var toAdd in contractTypes.Where(kvp => !existingTypes.ContainsKey(kvp.Key)))
    {
      var src = toAdd.Value;
      var newCT = new ContractType();
      newCT.SetDescription(src.Description);
      newCT.SetInternalCode(src.InternalCode!);
      newCT.SetIsActive(src.IsActive);
      if (src.UsageTypeId.HasValue)
      {
        newCT.SetUsageType(src.UsageTypeId.Value);
      }
      newCT.SetIsRentChargeApplicable(src.IsRentChargeApplicable);

      await _contractTypesRepository.AddAsync(newCT, cancellationToken);
    }

    foreach (var toUpdate in existingTypes.Where(kvp => contractTypes.ContainsKey(kvp.Key)))
    {
      var source = contractTypes[toUpdate.Key];

      toUpdate.Value.SetDescription(source.Description);
      toUpdate.Value.SetInternalCode(source.InternalCode!);
      toUpdate.Value.SetIsActive(source.IsActive);
      if (source.UsageTypeId.HasValue)
      {
        toUpdate.Value.SetUsageType(source.UsageTypeId.Value);
      }
      toUpdate.Value.SetIsRentChargeApplicable(source.IsRentChargeApplicable);

      await _contractTypesRepository.UpdateAsync(toUpdate.Value, cancellationToken);
    }
  }

  private async Task ContractMasterData(
    DefaultPropImportWorkspace workspace,
    CancellationToken cancellationToken)
  {
    var contractList = await Contracts(cancellationToken);

    _logger.LogInformation("Received {numContracts} raw contracts from upstream",
      contractList.Count());

    _logger.LogInformation("After data consolidation, {numContracts} contracts remain",
      contractList.Count());

    if (_disableValidation)
    {
      _logger.LogInformation("Will insert contract data without validation.");
    }

    //Sort contracts so that sublocations are processed last
    contractList = [.. contractList
      .OrderBy(c => workspace.Sublocations.ContainsKey(c.InternalCode!))];

    var contractPipeline = new ContractImportPipeline(
      workspace,
      contractList,
      _serviceProvider,
      _logger
    );

    var (successes, failures) = await contractPipeline.RunPipeline(cancellationToken);

    _logger.LogInformation("Prop contract data copied from upstream ({ok} successes, {fail} failures)",
      successes, failures);
  }

  private async Task AdministrationData(
    DefaultPropImportWorkspace workspace,
    CancellationToken cancellationToken)
  {
    var administrations = await AdministrationsFull(cancellationToken);

    _logger.LogInformation("Received {numAdministrations} raw administrations from upstream",
      administrations.Count());

    if (_disableValidation)
    {
      _logger.LogInformation("Will insert administration data without validation.");
    }

    var adminPipeline = new AdministrationImportPipeline(
      workspace,
      administrations,
      _serviceProvider,
      _logger
    );

    var (successes, failures) = await adminPipeline.RunPipeline(cancellationToken);

    _logger.LogInformation("Prop administration data copied from upstream ({ok} successes, {fail} failures)",
      successes, failures);
  }
}
