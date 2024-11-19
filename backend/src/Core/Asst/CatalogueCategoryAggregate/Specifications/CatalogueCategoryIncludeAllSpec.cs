using Ardalis.Specification;

namespace RealGimm.Core.Asst.CatalogueCategoryAggregate.Specifications;

public class CatalogueCategoryIncludeAllSpec : Specification<CatalogueCategory>
{
  public CatalogueCategoryIncludeAllSpec()
  {
    Query
      .Include(category => category.SubCategories.OrderBy(sc => sc.Id))
      .Include(category => category.CatalogueTypes.OrderBy(sc => sc.Id))
        .ThenInclude(ct => ct.Activities.OrderBy(a => a.Id))
      .AsSplitQuery();
  }
}
