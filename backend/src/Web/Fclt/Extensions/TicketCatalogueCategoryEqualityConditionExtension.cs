using RealGimm.Core.Fclt.SLAAggregate;
using RealGimm.Core.Asst.CatalogueCategoryAggregate;
using RealGimm.Web.Asst.DataLoaders;

namespace RealGimm.Web.Fclt.Extensions;

[ExtendObjectType(typeof(TicketCatalogueCategoryEqualityCondition))]
public sealed class TicketCatalogueCategoryEqualityConditionExtension
{
  public Task<CatalogueCategory> GetTargetCatalogueCategory(
    [Parent] TicketCatalogueCategoryEqualityCondition condition,
    [Service] CatalogueCategoryDataLoader loader,
    CancellationToken cancellationToken = default)
    => loader.LoadAsync(condition.TargetCatalogueCategoryId, cancellationToken);
}
