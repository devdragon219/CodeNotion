using RealGimm.Core.Asst.CatalogueTypeAggregate;
using RealGimm.Web.Asst.DataLoaders;
using RealGimm.Core.Fclt.SLAAggregate;

namespace RealGimm.Web.Fclt.Extensions;

[ExtendObjectType(typeof(TicketCatalogueTypeEqualityCondition))]
public sealed class TicketCatalogueTypeEqualityConditionExtension
{
  public Task<CatalogueType> GetTargetCatalogueType(
    [Parent] TicketCatalogueTypeEqualityCondition condition,
    [Service] CatalogueTypeDataLoader loader,
    CancellationToken cancellationToken = default)
    => loader.LoadAsync(condition.TargetCatalogueTypeId, cancellationToken);
}
