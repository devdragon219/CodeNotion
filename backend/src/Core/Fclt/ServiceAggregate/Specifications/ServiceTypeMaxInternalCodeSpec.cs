using Ardalis.Specification;

namespace RealGimm.Core.Fclt.ServiceAggregate.Specifications;

public class ServiceMaxInternalCodeSpec : Specification<Service>, ISingleResultSpecification<Service>
{
  public ServiceMaxInternalCodeSpec()
  {
    Query
      .OrderByDescending(Service => Service.InternalCode)
      .Take(1);
  }
}
