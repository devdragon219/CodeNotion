using Ardalis.Specification;

namespace RealGimm.Core.Fclt.ServiceCategoryAggregate.Specifications;

public class ServiceCategoryIncludeAllSpec : Specification<ServiceCategory>
{
  public ServiceCategoryIncludeAllSpec()
  {
    Query
      .Include(category => category.SubCategories.OrderBy(sc => sc.Id))
      .AsSplitQuery();
  }
}
