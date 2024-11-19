using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RealGimm.Core;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Core.Asst.EstateAggregate.Specifications;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate.Specifications;
using RealGimm.Core.Asst.EstateUsageTypeAggregate;
using RealGimm.Core.Asst.FunctionAreaAggregate;
using RealGimm.Core.Shared;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Plugin.Import.Asst.Models;

namespace RealGimm.Plugin.Import.Asst;

public partial class EstateUnitMapper
{
  public required ILogger<EstateUnitMapper> _logger { protected get; init; }
  public required IReadRepository<Estate> _estateRepository { protected get; init; }
  public required IRepository<EstateUnit> _estateUnitRepository { protected get; init; }
  public required IRepository<EstateUsageType> _usageTypeRepository { protected get; init; }
  public required IReadRepository<FunctionArea> _functionAreaRepository { protected get; init; }
  public required ICustomEstateEnumMapper _customEstateEnumMapper { protected get; init; }

  public async Task<EstateUnit> MapEstateUnit(EstateUnitDTO source,
    EstateImportWorkspace workspace,
    EstateUnitSurfaceDTO[] surfaces,
    CancellationToken cancellationToken)
  {
    var internalCode = source.EstateCode + "U"
      + source.SubCode?.PadLeft(3, '0');

    var localEUCandidates = workspace.EstateUnitsByInternalCode
        .TryGetValue(internalCode, out var euIdList)
      ? await _estateUnitRepository
        .AsQueryable(
          new EstateUnitIncludeForImportSpec(),
          new GetByIdsSpec<EstateUnit>(euIdList)
        )
        .ToListAsync(cancellationToken)
      : [new EstateUnit()];

    var parentEstate =
      ((source.EstateCode is not null && workspace.EstatesByInternalCode.TryGetValue(source.EstateCode, out var estateId))
      ? await _estateRepository
        .AsQueryable(
          new EstateIncludeForLightDtoSpec(),
          new GetByIdSpec<Estate>(estateId[0])
        )
        .FirstOrDefaultAsync(cancellationToken)
      : null)
      ?? throw new InvalidOperationException(
        $"Unable to find parent estate for unit {source.Id}");

    var sourceEndDates = $"{source.EndDate.ToDateOnly()}-{source.IsClosed}";

    var localEU = localEUCandidates
      .OrderBy(e => e.Id)
      .FirstOrDefault(e => $"{e.OwnershipEndDate}-{e.DeletionDate.HasValue}" == sourceEndDates)
      ?? new EstateUnit();

    //Updates
    localEU.SetName(source.Name);

    localEU.SetType(
      await _customEstateEnumMapper.MapEstateUnitType(
        source.EstateTypeId));

    if (localEU.Id == 0)
    {
      //Do not update the estate if the unit is already in the database
      localEU.SetEstate(parentEstate);
    }

    var ut = (source.UsageTypeId is not null
      && workspace.UsageTypes.TryGetValue(source.UsageTypeId, out var usageTypeId))
      ? await _usageTypeRepository
        .GetByIdAsync(usageTypeId, cancellationToken)
      : await _usageTypeRepository
        .GetByIdAsync(workspace.UsageTypes.Values.Min(), cancellationToken);

    if (ut is not null)
    {
      localEU.SetUsageType(ut);
    }
    else
    {
      localEU.SetUsageType(parentEstate.UsageType);
    }

    localEU.SetOwnership(
      await _customEstateEnumMapper.MapUnitOwnership(source.OwnershipTypeId),
      DateOnly.FromDateTime(source.StartDate ?? source.LastUpdated ?? DateTime.UtcNow),
      100,
      source.EndDate.HasValue ? DateOnly.FromDateTime(source.EndDate.Value) : null
    );

    if (workspace.EstateUnitNotes.ContainsKey(source.Id))
    {
      localEU.SetNotes(workspace.EstateUnitNotes[source.Id]);
    }

    var (toponymy, numbering) = AddressMiner.MineData(source.Address);

    localEU.SetAddress(
      parentEstate.Addresses.FirstOrDefault(ad => ad.Toponymy == toponymy
        && ad.Numbering == numbering) ?? parentEstate.Addresses[0],
      null
    );

    if (!string.IsNullOrEmpty(source.StairId)
      && workspace.StairsByEstate[parentEstate.InternalCode].FirstOrDefault(s => s.Id == source.StairId)
        is var sourceStair
      && sourceStair is not null
      && parentEstate.Stairs.FirstOrDefault(s => s.Description == sourceStair.Name)
        is var parentStair
      && parentStair is not null)
    {
      localEU.SetStair(parentStair);
    }

    localEU.SetFloors(
      (source.FloorIds ?? [])
        //Only floors that both a) exist and b) are bound to the parent estate
        .Select(fid => workspace.Floors.TryGetValue(fid, out var floorTemplate)
            && parentEstate.Floors.FirstOrDefault(f => f.TemplateReference == floorTemplate.TemplateId)
                is var parentFloor
              ? parentFloor
              : null
        )
        .Where(f => f is not null)
        .Select(f => f!)
        .ToArray()
    );

    localEU.SetSurfaces(
      surfaces
        .Where(s => s.MeasurementUnitCode.ParseAsRG2SurfaceMeasurement() is not null)
        .Select(s =>
        {
          var newS = new EstateUnitSurface();

          newS.SetMeasurements((int)s.Value, null, null);

          newS.SetMetric(s.MeasurementUnitCode.ParseAsRG2SurfaceMeasurement()!.Value);
          if (s.FloorId is not null)
          {
            var templId = workspace.Floors[s.FloorId].TemplateId;
            var euFloor = localEU.Floors.FirstOrDefault(f => f.TemplateReference == templId);
            if (euFloor is not null)
            {
              newS.SetFloor(euFloor);
            }
          }

          if (s.FunctionAreaCode is not null)
          {
            var funcArea = workspace.FunctionAreas[s.FunctionAreaCode];
            newS.SetFunctionArea(_functionAreaRepository
              .AsQueryable(new GetByIdSpec<FunctionArea>(funcArea))
              .FirstOrDefault());
          }

          return newS;
        })
    );

    localEU.SetInternalCode(internalCode);

    if (source.IsClosed)
    {
      localEU.MarkAsDeleted();
    }

    localEU.SetStatus(
      source.IsClosed
        ? EstateUnitStatus.Cancelled
        : EstateUnitStatus.Existing);

    ImportDataConverter.FixStringLengths(localEU);

    return localEU;
  }
}
