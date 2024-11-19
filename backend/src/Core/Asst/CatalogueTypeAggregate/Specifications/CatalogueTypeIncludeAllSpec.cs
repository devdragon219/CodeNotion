using Ardalis.Specification;

namespace RealGimm.Core.Asst.CatalogueTypeAggregate.Specifications;

public class CatalogueTypeIncludeAllSpec : Specification<CatalogueType>
{
  public CatalogueTypeIncludeAllSpec()
  {
    Query
      .Include(item => item.Category)
        .ThenInclude(category => category.SubCategories.OrderBy(sc => sc.Id))
      .Include(item => item.SubCategory)
      .Include(item => item.UsageTypes)
      .Include(item => item.Activities.OrderBy(a => a.Id));
  }
}

