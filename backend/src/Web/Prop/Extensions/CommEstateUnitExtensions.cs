using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.Prop.RegistryCommunicationAggregate;
using RealGimm.Web.Asst.DataLoaders;

namespace RealGimm.Web.Prop.Extensions;

[ExtendObjectType(typeof(CommEstateUnit))]
public class CommEstateUnitExtensions
{
  public Task<EstateUnit> GetEstateUnit(
    [Parent] CommEstateUnit commEstateUnit,
    [Service] EstateUnitDataLoader dataLoader,
    CancellationToken cancellationToken = default)
    => dataLoader.LoadAsync(commEstateUnit.EstateUnitId, cancellationToken);
}
