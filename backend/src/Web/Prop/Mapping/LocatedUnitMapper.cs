using System.Diagnostics.Contracts;
using Microsoft.EntityFrameworkCore;
using PortCMIS.Client;
using RealGimm.Core;
using RealGimm.Core.Asst.EstateSubUnitAggregate;
using RealGimm.Core.Prop.ContractAggregate;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Web.Prop.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Prop.Mapping;

public sealed class LocatedUnitMapper : IMapper<LocatedUnitInput, LocatedUnit>
{
  private readonly IRepository<EstateSubUnit> _estateSubUnitRepository;

  public LocatedUnitMapper(IRepository<EstateSubUnit> estateSubUnitRepository)
  {
    _estateSubUnitRepository = estateSubUnitRepository;
  }

  public async Task<LocatedUnit?> MapAsync(LocatedUnitInput? from, LocatedUnit? into, CancellationToken cancellationToken)
  {
    if (from is null)
    {
      return null;
    }

    var locatedUnit = into ?? new LocatedUnit();
    locatedUnit.SetIsMainUnit(from.IsMainUnit);
    locatedUnit.SetIsRegistryUpdateEnabled(from.IsRegistryUpdateEnabled);
    locatedUnit.SetIsPartialLocation(from.IsPartialLocation);
    locatedUnit.SetSurfaceSqM(from.SurfaceSqM);

    var estateUnitId = from.EstateSubUnitId.HasValue
      ? await _estateSubUnitRepository
          .AsQueryable(new GetByIdSpec<EstateSubUnit>(from.EstateSubUnitId.Value))
          .Select(estateSubUnit => (int?)estateSubUnit.EstateUnit.Id)
          .SingleOrDefaultAsync(cancellationToken)
          ?? throw new MappingException(ErrorCode.LocatedUnitEstateSubUnitDoesntExist.ToValidationError())
      : from.EstateUnitId!.Value;

    locatedUnit.SetEstateUnit(estateUnitId, from.EstateSubUnitId);

    if (into is null && from.Id.GetValueOrDefault() != default)
    {
      locatedUnit.Id = from.Id!.Value;
    }

    return locatedUnit;
  }
}
