using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Fclt.SLAAggregate;
using RealGimm.Core.Asst.CatalogueCategoryAggregate;
using RealGimm.Web.Asst.DataLoaders;

namespace RealGimm.Web.Fclt.Extensions;

[ExtendObjectType(typeof(TicketCatalogueSubCategoryEqualityCondition))]
public sealed class TicketCatalogueSubCategoryEqualityConditionExtension
{
  public Task<CatalogueSubCategory> GetTargetCatalogueSubCategory(
    [Parent] TicketCatalogueSubCategoryEqualityCondition condition,
    [Service] CatalogueSubCategoryDataLoader loader,
    CancellationToken cancellationToken = default)
    => loader.LoadAsync(condition.TargetCatalogueSubCategoryId, cancellationToken);
}
