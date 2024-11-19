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
using RealGimm.Core.Asst.EstateUsageTypeAggregate;
using RealGimm.Core.Asst.EstateMainUsageTypeAggregate;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.Asst.FloorTemplateAggregate;
using RealGimm.Core.Asst.CadastralCategoryAggregate;
using RealGimm.Core.Asst.CadastralLandCategoryAggregate;
using RealGimm.Core.Asst.FunctionAreaAggregate;

namespace RealGimm.Plugin.Import.Asst;

public partial class DefaultAsstDataImporter : IUpstreamDataImporter, IConfigurableModule
{
  public int ExecutionOrder => 20;

  public static readonly Guid IMPORT_ASST_PROVIDER = new("673f476a-8ef1-4c95-a8a0-4e0680080455");

  public ConfigFunction Function => ConfigFunction.DataImport;
  public string[] ConfigurationParameters
  {
    get
    {
      return [
        ConfigWellKnownNames.DATA_IMPORT_CONNECTION_STRING,
        ConfigWellKnownNames.DATA_IMPORT_DISABLE_VALIDATION
      ];
    }
  }

  private string? _connectionString;
  private bool _disableValidation;
  public required ILogger<DefaultAsstDataImporter> _logger { protected get; init; }
  public required IReadRepository<Config> _configRepository { protected get; init; }
  public required IReadRepository<City> _cities { protected get; init; }
  public required IReadRepository<Subject> _subjects { protected get; init; }
  public required IReadRepository<Estate> _estates { protected get; init; }
  public required IRepository<FloorTemplate> _floors { protected get; init; }
  public required IRepository<FunctionArea> _functionAreas { protected get; init; }
  public required IReadRepository<EstateUnit> _estateUnits { protected get; init; }
  public required IRepository<EstateUsageType> _estateUsageTypes { protected get; init; }
  public required IRepository<EstateMainUsageType> _estateMainUsageTypes { protected get; init; }
  public required IRepository<CustomCode> _codeRepository { protected get; init; }
  public required IReadRepository<CadastralCategory> _cadastralCategoryRepo {protected get; init;}
  public required IReadRepository<CadastralLandCategory> _cadastralLandCategoryRepo {protected get; init;}
  public required IServiceProvider _serviceProvider { protected get; init; }

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

    _logger.LogInformation("Begin syncing ASST data from upstream");
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

    await EstateUsageData(cancellationToken);

    var floors = await UpdateFloors(cancellationToken);

    var functionAreas = await UpdateFunctionAreas(cancellationToken);

    _logger.LogInformation("Estate usage data imported, updating import context");

    var workspace = new EstateImportWorkspace(
      _disableValidation,
      citiesCache,
      await EstateAddresses(cancellationToken),
      await _subjects
        .AsQueryable()
        .Where(s => s.PersonType == PersonType.ManagementSubject)
        .ToDictionaryAsync(
          s => s.InternalCode,
          s => s.Id,
          cancellationToken: cancellationToken),
      await _subjects
        .AsQueryable()
        .ToDictionaryAsync(
          s => s.InternalCode,
          s => s.Id,
          cancellationToken: cancellationToken),
      await _subjects
        .AsQueryable()
        .Where(s => s.RelationSubordinates
          .Any(sr => sr.RelationType == SubjectRelationType.CompanyGroup))
        .ToDictionaryAsync(
          s => s.InternalCode,
          s => s.Id,
          cancellationToken: cancellationToken),
      await EstateBuildingTypes(cancellationToken),
      await EstateOwnershipTypes(cancellationToken),
      await EstateSubUnitsByUnit(cancellationToken),
      await EstateUnitNotes(cancellationToken),
      await _estateMainUsageTypes.AsQueryable()
        .ToDictionaryAsync(
          u => u.InternalCode,
          u => u.Id,
          cancellationToken: cancellationToken),
      await _estateUsageTypes.AsQueryable()
        .ToDictionaryAsync(
          u => u.InternalCode,
          u => u.Id,
          cancellationToken: cancellationToken),
      await _estates
        .AsQueryable()
        .GroupBy(e => e.InternalCode)
        .Select(grp => new
        {
          grp.Key,
          Array = grp
            .OrderBy(e => e.DeletionDate.HasValue)
            .Select(eu => eu.Id)
            .ToArray()
        })
        .ToDictionaryAsync(
          grp => grp.Key,
          grp => grp.Array,
          cancellationToken),
      [],
      floors,
      functionAreas,
      await FloorsByEstate(cancellationToken),
      await StairsByEstate(cancellationToken),
      await EstateUnitOriginActs(cancellationToken),
      (await _cadastralCategoryRepo
        .AsQueryable()
        .Where(ccat => ccat.CountryISO == CountryISO3.ITA && !string.IsNullOrEmpty(ccat.ExternalCode))
        .ToListAsync(cancellationToken))
        .GroupBy(ccat => ccat.ExternalCode!)
        .ToDictionary(grp => grp.Key, grp => grp.First()),
      (await _cadastralLandCategoryRepo
        .AsQueryable()
        .Where(ccat => ccat.CountryISO == CountryISO3.ITA && !string.IsNullOrEmpty(ccat.Description))
        .ToListAsync(cancellationToken))
        .GroupBy(ccat => ccat.Description.ToLower())
        .ToDictionary(grp => grp.Key, grp => grp.First())
    );

    _logger.LogInformation("Import context ready, importing entities");

    await EstateMasterData(workspace, cancellationToken);

    workspace = workspace with
    {
      EstatesByInternalCode = await _estates
        .AsQueryable()
        .GroupBy(e => e.InternalCode)
        .Select(grp => new
        {
          grp.Key,
          Array = grp
            .OrderBy(e => e.DeletionDate.HasValue)
            .Select(eu => eu.Id)
            .ToArray()
        })
        .ToDictionaryAsync(
          grp => grp.Key,
          grp => grp.Array,
          cancellationToken),
      EstateUnitsByInternalCode = await _estateUnits
        .AsQueryable()
        .GroupBy(eu => eu.InternalCode)
        .Select(grp => new
        {
          grp.Key,
          Array = grp
            .OrderBy(e => e.DeletionDate.HasValue)
            .Select(eu => eu.Id)
            .ToArray()
        })
        .ToDictionaryAsync(
          grp => grp.Key,
          grp => grp.Array,
          cancellationToken),
    };

    await EstateUnitMasterData(workspace, cancellationToken);

    await CadastralUnitMasterData(workspace, cancellationToken);

    _logger.LogInformation("Done syncing ASST data from upstream (took {elapsed})", DateTime.UtcNow - dateStart);
  }
}
