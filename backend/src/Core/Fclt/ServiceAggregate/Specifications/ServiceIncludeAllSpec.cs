using Ardalis.Specification;

namespace RealGimm.Core.Fclt.ServiceAggregate.Specifications;

public class ServiceIncludeAllSpec : Specification<Service>
{
  public ServiceIncludeAllSpec()
  {
    Query
      .Include(item => item.Category)
        .ThenInclude(category => category.SubCategories.OrderBy(sc => sc.Id))
      .Include(item => item.SubCategory)
      .Include(item => item.Activities.OrderBy(a => a.Id));
  }
}

