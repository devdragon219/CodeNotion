using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RealGimm.Core;
using RealGimm.Core.Asst.CadastralCategoryAggregate;
using RealGimm.Core.Asst.CadastralUnitAggregate;
using RealGimm.Core.Asst.EstateMainUsageTypeAggregate;
using RealGimm.Core.Asst.EstateSubUnitAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.Asst.EstateUsageTypeAggregate;
using RealGimm.Core.Asst.FloorTemplateAggregate;
using RealGimm.Core.Asst.FunctionAreaAggregate;
using RealGimm.Core.Common.CustomCodeAggregate;
using RealGimm.Core.Common.CustomCodeAggregate.Specification;
using RealGimm.Plugin.Import.Asst.Models;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Plugin.Import.Asst;

public partial class DefaultAsstDataImporter
{
  private async Task EstateUsageData(CancellationToken cancellationToken)
  {
    await UsageCollection(
      await UsageTypes(cancellationToken),
      _estateUsageTypes,
      dto =>
      {
        var ut = new EstateUsageType();
        ut.SetInternalCode(dto.Code!);
        ut.SetName(dto.Description ?? dto.Code!);
        ut.SetUsage(true, true, true, true);
        return ut;
      },
      (dto, ut) =>
      {
        ut.SetInternalCode(dto.Code!);
        ut.SetName(dto.Description ?? dto.Code!);
        ut.SetUsage(true, true, true, true);
        return ut;
      },
      cancellationToken
    );

    await UsageCollection(
      await UsageMacroTypes(cancellationToken),
      _estateMainUsageTypes,
      dto =>
      {
        var ut = new EstateMainUsageType();
        ut.SetInternalCode(dto.Code!);
        ut.SetName(dto.Description ?? dto.Code!);
        return ut;
      },
      (dto, ut) =>
      {
        ut.SetInternalCode(dto.Code!);
        ut.SetName(dto.Description ?? dto.Code!);
        return ut;
      },
      cancellationToken
    );
  }

  private async Task UsageCollection<T>(
    Dictionary<string, SimpleCodeDTO> source,
    IRepository<T> repository,
    Func<SimpleCodeDTO, T> newItem,
    Func<SimpleCodeDTO, T, T> updateItem,
    CancellationToken cancellationToken) where T : EntityBase, IAggregateRoot, IInternallyCoded
  {
    var sourceTypes = source.Values
      .GroupBy(sc => sc.Code ?? sc.Id)
      .ToDictionary(grp => grp.Key, grp => grp.First());
    var existingTypes = await repository
      .AsQueryable()
      .ToDictionaryAsync(u => u.InternalCode, cancellationToken: cancellationToken);

    //This synchronization will never delete existing types
    foreach (var toAdd in sourceTypes.Where(kvp => !existingTypes.ContainsKey(kvp.Key)))
    {
      var newType = newItem(toAdd.Value);
      await repository.AddAsync(newType, cancellationToken);
    }

    foreach (var toUpdate in existingTypes.Where(kvp => sourceTypes.ContainsKey(kvp.Key)))
    {
      var sourceData = sourceTypes[toUpdate.Key];

      var updated = updateItem(sourceData, toUpdate.Value);
      await repository.UpdateAsync(updated, cancellationToken);
    }
  }

  private async Task<Dictionary<string, FloorDTO>> UpdateFloors(CancellationToken cancellationToken)
  {
    var floors = await AllFloors(cancellationToken);

    _logger.LogInformation("Received {floorCloud} floors from upstream", floors.Count);

    var existingFloors = await _floors
      .AsQueryable()
      .ToDictionaryAsync(vr => vr.Position.ToString() + "$" + vr.Name,
        cancellationToken: cancellationToken);

    //Never delete, only add or update
    foreach (var toAdd in floors.Where(kvp => !existingFloors.ContainsKey(
      (kvp.Value.Ordering ?? 0).ToString() + "$" + kvp.Value.Name
    )))
    {
      var src = toAdd.Value;
      var newFloor = new FloorTemplate(src.Name ?? "-", src.Ordering ?? 0);

      await _floors.AddAsync(newFloor, cancellationToken);
    }

    //It makes no sense to update the list, because all fields are
    // in the logical key

    var allFloorTemplates = await _floors
      .AsQueryable()
      .ToDictionaryAsync(vr => vr.Position.ToString() + "$" + vr.Name,
        cancellationToken: cancellationToken);

    foreach (var kvp in floors)
    {
      var template =
        allFloorTemplates[(kvp.Value.Ordering ?? 0).ToString() + "$" + kvp.Value.Name];

      kvp.Value.TemplateId = template.Guid;
    }

    return floors;
  }

  private async Task<Dictionary<string, int>> UpdateFunctionAreas(CancellationToken cancellationToken)
  {
    var functionAreas = await AllFunctionAreas(cancellationToken);

    _logger.LogInformation("Received {areaCount} function areas from upstream", functionAreas.Count);

    var existingFuncAreas = await _functionAreas
      .AsQueryable()
      .ToDictionaryAsync(vr => vr.InternalCode,
        cancellationToken: cancellationToken);

    //Never delete, only add or update
    foreach (var toAdd in functionAreas.Where(kvp => !existingFuncAreas
      .ContainsKey(kvp.Value.Code)))
    {
      var src = toAdd.Value;
      var newFuncArea = new FunctionArea(
        src.Name,
        Core.Asst.SurfaceType.MainArea,
        src.Code
      );

      await _functionAreas.AddAsync(newFuncArea, cancellationToken);
    }

    foreach (var toUpdate in functionAreas.Where(kvp => existingFuncAreas
      .ContainsKey(kvp.Value.Code)
      && existingFuncAreas[kvp.Value.Code].Name != kvp.Value.Name))
    {
      var src = toUpdate.Value;
      var funcArea = existingFuncAreas[src.Code];

      funcArea.SetName(src.Name);

      await _functionAreas.UpdateAsync(funcArea, cancellationToken);
    }

    return await _functionAreas
      .AsQueryable()
      .ToDictionaryAsync(vr => vr.InternalCode,
        vr => vr.Id,
        cancellationToken: cancellationToken);
  }

  private async Task EstateMasterData(
    EstateImportWorkspace workspace,
    CancellationToken cancellationToken)
  {
    var (estateList, equivalences) = await Estates(cancellationToken);

    if (_disableValidation)
    {
      _logger.LogInformation("Will insert estate data without validation.");
    }

    workspace.EstateSourceCodeEquivalences = equivalences;

    var estatePipeline = new EstateImportPipeline(
      workspace,
      estateList,
      _serviceProvider,
      _logger
    );

    var (successes, failures) = await estatePipeline.RunPipeline(cancellationToken);

    _logger.LogInformation("ASST Estate data copied from upstream ({ok} successes, {fail} failures)",
      successes, failures);
  }

  private async Task EstateUnitMasterData(
    EstateImportWorkspace workspace,
    CancellationToken cancellationToken)
  {
    var (estateUnitList, externalIdEquivalences) = await EstateUnits(
      workspace.EstateSourceCodeEquivalences,
      cancellationToken);

    var surfaces = await EstateUnitSurfaces(cancellationToken);

    _logger.LogInformation("Received surface data for {SurfaceEUCount} estate units",
      surfaces.Count);

    if (_disableValidation)
    {
      _logger.LogInformation("Will insert estate unit data without validation.");
    }

    workspace.EstateUnitSourceCodeEquivalences = externalIdEquivalences;

    var estateUnitPipeline = new EstateUnitImportPipeline(
      workspace,
      estateUnitList,
      surfaces,
      _serviceProvider,
      _logger
    );

    var (successes, failures) = await estateUnitPipeline.RunPipeline(cancellationToken);

    _logger.LogInformation("ASST Estate unit data copied from upstream ({ok} successes, {fail} failures)",
      successes, failures);

    _logger.LogInformation("Updating Estate Unit / Estate SubUnit transcodings");

    //Update transcodings
    var euTxExisting = await _codeRepository.AsQueryable(
        new CustomCodeTranscoding<EstateUnit>(IMPORT_ASST_PROVIDER)
      )
      .GroupBy(etx => etx.ExternalCode ?? string.Empty)
      .Select(grp => new
      {
        grp.Key,
        First = grp.FirstOrDefault()
      })
      .ToDictionaryAsync(etx => etx.Key, etx => etx.First, cancellationToken);

    var esuTxExisting = await _codeRepository.AsQueryable(
        new CustomCodeTranscoding<EstateSubUnit>(IMPORT_ASST_PROVIDER)
      )
      .GroupBy(etx => etx.ExternalCode ?? string.Empty)
      .Select(grp => new
      {
        grp.Key,
        First = grp.FirstOrDefault()
      })
      .ToDictionaryAsync(etx => etx.Key, etx => etx.First, cancellationToken);

    var euToAdd = estateUnitPipeline.EUTranscodings
      .Where(kvp => !euTxExisting.ContainsKey(kvp.Key))
      .Select(toAddEU =>
      {
        var newCode = new CustomCode();
        newCode.SetData(toAddEU.Key,
            IMPORT_ASST_PROVIDER,
            nameof(EstateUnit),
            CustomCodeFunction.Transcoding);

        newCode.SetCodes(toAddEU.Value.ToString(), toAddEU.Key);
        return newCode;
      });

    await _codeRepository.AddRangeAsync(euToAdd, cancellationToken);

    var esuToAdd = estateUnitPipeline.ESUTranscodings
      .Where(kvp => !esuTxExisting.ContainsKey(kvp.Key))
      .Select(toAddESU =>
      {
        var newCode = new CustomCode();
        newCode.SetData(toAddESU.Key,
            IMPORT_ASST_PROVIDER,
            nameof(EstateSubUnit),
            CustomCodeFunction.Transcoding);

        newCode.SetCodes(toAddESU.Value.ToString(), toAddESU.Key);
        return newCode;
      });

    await _codeRepository.AddRangeAsync(esuToAdd, cancellationToken);

    var toEUUpdateKeys = euTxExisting.Keys.Intersect(estateUnitPipeline.EUTranscodings.Keys);
    var toESUUpdateKeys = esuTxExisting.Keys.Intersect(estateUnitPipeline.ESUTranscodings.Keys);

    int euUpdated = 0, esuUpdated = 0;

    foreach (var toEUUpdateK in toEUUpdateKeys
      .Where(k => estateUnitPipeline.EUTranscodings[k].ToString() != euTxExisting[k]!.InternalCode))
    {
      var toEUUpdate = euTxExisting[toEUUpdateK]!;

      toEUUpdate.SetCodes(
        estateUnitPipeline.EUTranscodings[toEUUpdate.ExternalCode!].ToString(),
        toEUUpdate.ExternalCode!);

      await _codeRepository.UpdateAsync(toEUUpdate, cancellationToken);
      euUpdated++;
    }

    foreach (var toESUUpdateK in toESUUpdateKeys
      .Where(k => estateUnitPipeline.ESUTranscodings[k].ToString() != esuTxExisting[k]!.InternalCode))
    {
      var toESUUpdate = esuTxExisting[toESUUpdateK]!;

      toESUUpdate.SetCodes(
        estateUnitPipeline.ESUTranscodings[toESUUpdate.ExternalCode!].ToString(),
        toESUUpdate.ExternalCode!);

      await _codeRepository.UpdateAsync(toESUUpdate, cancellationToken);

      esuUpdated++;
    }
  }

  private async Task CadastralUnitMasterData(
    EstateImportWorkspace workspace,
    CancellationToken cancellationToken)
  {
    var cadastralUnitsByEstateUnitCode = await CadastralUnits(cancellationToken);
    var cadastralCoordinatesByCadastralUnit = await CadastralCoordinates(cancellationToken);

    _logger.LogInformation("Received {CadastralUnitCount} raw cadastral units and {CoordinateCount} raw coordinates from upstream",
      cadastralUnitsByEstateUnitCode.Count,
      cadastralCoordinatesByCadastralUnit.Sum(kvp => kvp.Value.Length));

    //Only keep cadastral units and coordinates for the estate units that survive
    // pruning in earlier steps
    if (workspace.EstateUnitSourceCodeEquivalences is not null)
    {
      cadastralUnitsByEstateUnitCode = cadastralUnitsByEstateUnitCode
        .Where(kvp => workspace.EstateUnitSourceCodeEquivalences.ContainsKey(kvp.Key))
        .ToDictionary(kvp => kvp.Key, kvp => kvp.Value);

      var cuKeys = cadastralUnitsByEstateUnitCode.Select(kvp => kvp.Value.Id).ToList();

      cadastralCoordinatesByCadastralUnit = cadastralCoordinatesByCadastralUnit
        .Where(kvp => cuKeys.Contains(kvp.Key))
        .ToDictionary(kvp => kvp.Key, kvp => kvp.Value);

      _logger.LogInformation("After pruning invalid data, {CadastralUnitCount} raw cadastral units and {CoordinateCount} raw coordinates remain",
        cadastralUnitsByEstateUnitCode.Count,
        cadastralCoordinatesByCadastralUnit.Sum(kvp => kvp.Value.Length));
    }

    if (_disableValidation)
    {
      _logger.LogInformation("Will insert cadastral unit data without validation.");
    }

    var eunitTx = await _codeRepository.AsQueryable(
        new CustomCodeTranscoding<EstateUnit>(IMPORT_ASST_PROVIDER)
      )
      .GroupBy(etx => etx.ExternalCode ?? string.Empty)
      .Select(grp => new
      {
        grp.Key,
        grp.First().InternalCode
      })
      .ToDictionaryAsync(etx => etx.Key, etx => etx.InternalCode, cancellationToken);

    var cadastralUnitsByEUId = cadastralUnitsByEstateUnitCode
      .Where(kvp => eunitTx.ContainsKey(kvp.Key))
      .ToDictionary(
        kvp => Convert.ToInt32(eunitTx[kvp.Key]),
        kvp => kvp.Value);

    var cadastralUnitPipeline = new CadastralUnitImportPipeline(
      workspace,
      cadastralUnitsByEUId,
      cadastralCoordinatesByCadastralUnit,
      _serviceProvider,
      _logger
    );

    var (successes, failures, coordCount) = await cadastralUnitPipeline.RunPipeline(cancellationToken);

    _logger.LogInformation("ASST Cadastral Unit data copied from upstream ({ok} successes, {fail} failures, {coord} coordinates)",
      successes, failures, coordCount);

    _logger.LogInformation("Updating Cadastral Unit transcodings");
    var cuTxExisting = await _codeRepository.AsQueryable(
     new CustomCodeTranscoding<CadastralUnit>(IMPORT_ASST_PROVIDER)
    )
    .GroupBy(etx => etx.ExternalCode ?? string.Empty)
    .Select(grp => new
    {
      grp.Key,
      First = grp.FirstOrDefault()
    })
    .ToDictionaryAsync(ctx => ctx.Key, ctx => ctx.First, cancellationToken);

    var cuToAdd = cadastralUnitPipeline.CUTranscodings
      .Where(kvp => !cuTxExisting.ContainsKey(kvp.Key))
      .Select(toAddCU =>
      {
        var newCode = new CustomCode();
        newCode.SetData(toAddCU.Key,
            IMPORT_ASST_PROVIDER,
            nameof(CadastralUnit),
            CustomCodeFunction.Transcoding);

        newCode.SetCodes(toAddCU.Value.ToString(), toAddCU.Key);
        return newCode;
      });

    await _codeRepository.AddRangeAsync(cuToAdd, cancellationToken);

    var toCUUpdateKeys = cuTxExisting.Keys.Intersect(cadastralUnitPipeline.CUTranscodings.Keys);

    int cuUpdated = 0;

    foreach (var toCUUpdateK in toCUUpdateKeys
      .Where(k => cadastralUnitPipeline.CUTranscodings[k].ToString() != cuTxExisting[k]!.InternalCode))
    {
      var toCUUpdate = cuTxExisting[toCUUpdateK]!;

      toCUUpdate.SetCodes(
        cadastralUnitPipeline.CUTranscodings[toCUUpdate.ExternalCode!].ToString(),
        toCUUpdate.ExternalCode!);

      await _codeRepository.UpdateAsync(toCUUpdate, cancellationToken);
      cuUpdated++;
    }
  }
}
