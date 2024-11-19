using Ardalis.Specification;

namespace RealGimm.Core.Fclt.ServiceCategoryAggregate.Specifications;

public class ServiceCategoryMaxInternalCodeSpec : Specification<ServiceCategory>, ISingleResultSpecification<ServiceCategory>
{
  public ServiceCategoryMaxInternalCodeSpec()
  {
    Query
      .OrderByDescending(category => category.InternalCode)
      .Take(1);
  }
}
