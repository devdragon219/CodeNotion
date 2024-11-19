using Microsoft.EntityFrameworkCore;
using RealGimm.Core;
using RealGimm.Core.Asst.CadastralUnitAggregate;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.WebCommons.Extensions;
using RealGimm.Web.Asst.Models;
using RealGimm.WebCommons.Mapping;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Core.Asst.EstateUsageTypeAggregate;

namespace RealGimm.Web.Asst.Mapping;

public class EstateUnitMapper : MapperBase, IMapper<EstateUnitInput, EstateUnit>
{
  private readonly IRepository<Estate> _estateRepository;
  private readonly IReadRepository<EstateUsageType> _usageTypeRepository;
  private readonly IMapper _mapper;

  public EstateUnitMapper(IMapper mapper,
    IRepository<Estate> estateRepository,
    IReadRepository<EstateUsageType> usageTypeRepository)
  {
    _estateRepository = estateRepository;
    _usageTypeRepository = usageTypeRepository;
    _mapper = mapper;
  }

  public async Task<EstateUnit?> MapAsync(
    EstateUnitInput? from,
    EstateUnit? into,
    CancellationToken cancellationToken = default)
  {
    if (from is null)
    {
      return null;
    }

    var estateUnit = into ?? new EstateUnit();

    estateUnit.SetName(from.Name);
    estateUnit.SetInternalCode(from.InternalCode);
    estateUnit.SetType(from.Type);
    estateUnit.SetStatus(from.Status);
    
    var usageType = await _usageTypeRepository
      .SingleOrDefaultAsync(new GetByIdSpec<EstateUsageType>(from.UsageTypeId), cancellationToken)
      ?? throw new MappingException(ErrorCode.EstateUnitNonExistingUsageType.ToValidationError());
    
    estateUnit.SetUsageType(usageType);

    estateUnit.SetOwnership(from.OwnershipType,
      from.OwnershipStartDate,
      from.OwnershipPercent,
      from.OwnershipEndDate);

    estateUnit.SetExternalCode(from.ExternalCode);
    estateUnit.SetNotes(from.Notes);
    estateUnit.SetSharedArea(from.SharedArea);
    estateUnit.SetDisusedDate(from.DisusedDate);

    var estate = await _estateRepository
      .AsQueryable(new GetByIdSpec<Estate>(from.EstateId))
      .Include(estate => estate.Stairs)
      .Include(estate => estate.Floors)
      .SingleAsync(cancellationToken);

    estateUnit.SetEstate(estate);

    var address = await _estateRepository
      .AsQueryable(new GetByIdSpec<Estate>(from.EstateId))
      .Select(estate => estate.Addresses.FirstOrDefault(address => address.Id == from.AddressId))
      .SingleAsync(cancellationToken);

    if (address is null)
    {
      throw new MappingException(ErrorCode.AddressIsNotProvided.ToValidationError());
    }

    address.SetNumbering(address.Numbering);
    estateUnit.SetAddress(address, from.SubNumbering);

    if (from.StairId is not null)
    {
      var stair = estate.Stairs.FirstOrDefault(stair => stair.Id == from.StairId);
      if (stair is null)
      {
        throw new MappingException(ErrorCode.StatusIsNull.ToValidationError());
      }
      estateUnit.SetStair(stair);
    }

    var floors = from.FloorIds.Distinct()
        .Select(fId => estate.Floors.FirstOrDefault(floor => floor.Id == fId))
        .ToArray();
    if (floors is null || floors.Any(f => f is null))
    {
      throw new MappingException(ErrorCode.FloorsAreNotProvided.ToValidationError());
    }
    estateUnit.SetFloors(floors!);

    //surfaces
    if (from.Surfaces is not null)
    {
      var newSurfaces = MapSurfaces(from.Surfaces);
      estateUnit.SetSurfaces(newSurfaces);
    }

    //repossession
    if (from.Repossession != null)
    {
      if (from.Repossession.EventId is not null
        && estateUnit.LastRepossession is not null
        && from.Repossession.EventId.Value != estateUnit.LastRepossession.Id)
      {
        throw new MappingException(
            ErrorCode.EstateUnitRepossessionNotLast.ToValidationError()
          );
      }

      var newRepossession = estateUnit.LastRepossession ?? new Repossession();

      newRepossession = await _mapper.MapAsync(
        from.Repossession,
        newRepossession,
        cancellationToken);

      if (newRepossession!.Id == default)
      {
        estateUnit.AddRepossession(newRepossession);
      }

      if (from.CadastralUnit is not null)
      {
        var cadastralUnit = await _mapper.MapAsync<CadastralUnitInput, CadastralUnit>(from.CadastralUnit, cancellationToken);
        
        cadastralUnit!.SetEstateUnit(estateUnit!);
        estateUnit!.SetCadastralUnit(cadastralUnit);
      }
    }

    if (from.CadastralUnit is not null)
    {
      var cadastralUnit = await _mapper.MapAsync<CadastralUnitInput, CadastralUnit>(from.CadastralUnit, cancellationToken);
      cadastralUnit!.SetEstateUnit(estateUnit!);

      estateUnit!.SetCadastralUnit(cadastralUnit);
    }

    return estateUnit;
  }

  internal static IEnumerable<EstateUnitSurface> MapSurfaces(IEnumerable<EstateUnitSurfaceSummary> src)
  {
    var result = new List<EstateUnitSurface>();

    foreach (var s in src)
    {
      if (!s.Floors.Any())
      {
        if (s.SurfaceSqMTotal.HasValue || s.SurfaceSqMCommonArea.HasValue || s.SurfaceSqMSideArea.HasValue)
        {
          var nsurf = new EstateUnitSurface();
          nsurf.SetMetric(s.Metric);
          if (s.SurfaceId is not null) nsurf.Id = s.SurfaceId.Value;
          nsurf.SetMeasurements(s.SurfaceSqMTotal, s.SurfaceSqMCommonArea, s.SurfaceSqMSideArea);
          result.Add(nsurf);
        }
      }
      else
      {
        foreach (var f in s.Floors)
        {
          if (!f.FunctionAreas.Any())
          {
            if (f.SurfaceSqMTotal.HasValue || f.SurfaceSqMCommonArea.HasValue || f.SurfaceSqMSideArea.HasValue)
            {
              var nsurf = new EstateUnitSurface();
              nsurf.SetMetric(s.Metric);
              if (f.SurfaceId is not null) nsurf.Id = f.SurfaceId.Value;
              nsurf.SetMeasurements(f.SurfaceSqMTotal, f.SurfaceSqMCommonArea, f.SurfaceSqMSideArea);
              nsurf.SetFloor(f.Floor.Id);
              result.Add(nsurf);
            }
          }
          else
          {
            foreach (var a in f.FunctionAreas)
            {
              if (a.SurfaceSqMTotal.HasValue || a.SurfaceSqMCommonArea.HasValue || a.SurfaceSqMSideArea.HasValue)
              {
                var nsurf = new EstateUnitSurface();
                nsurf.SetMetric(s.Metric);
                if (a.SurfaceId is not null) nsurf.Id = a.SurfaceId.Value;
                nsurf.SetMeasurements(a.SurfaceSqMTotal, a.SurfaceSqMCommonArea, a.SurfaceSqMSideArea);
                nsurf.SetFloor(f.Floor.Id);
                nsurf.SetFunctionAreaId(a.FunctionArea.Id);
                result.Add(nsurf);
              }
            }

          }
        }
      }
    }

    return result;
  }
}
