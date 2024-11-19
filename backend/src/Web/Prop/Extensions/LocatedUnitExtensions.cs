using RealGimm.Core;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.Prop.ContractAggregate;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Core.Asst.EstateSubUnitAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate.Specifications;
using RealGimm.Core.Asst.EstateSubUnitAggregate.Specifications;
using RealGimm.Web.Asst.DataLoaders;

namespace RealGimm.Web.Prop.Extensions;

[ExtendObjectType(typeof(LocatedUnit))]
public class LocatedUnitExtensions
{
  public Task<EstateUnit> GetEstateUnit(
    [Parent] LocatedUnit locatedUnit,
    [Service] EstateUnitDataLoader dataLoader,
    CancellationToken cancellationToken = default)
    => dataLoader.LoadAsync(locatedUnit.EstateUnitId, cancellationToken);
  
  public async Task<EstateSubUnit?> GetEstateSubUnit(
    [Parent] LocatedUnit locatedUnit,
    [Service] EstateSubUnitDataLoader dataLoader,
    CancellationToken cancellationToken = default)
    => locatedUnit.EstateSubUnitId.HasValue
      ? await dataLoader.LoadAsync(locatedUnit.EstateSubUnitId.Value, cancellationToken)
      : null;
}
