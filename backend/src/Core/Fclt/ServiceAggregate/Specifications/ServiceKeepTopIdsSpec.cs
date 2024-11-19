using Ardalis.Specification;

namespace RealGimm.Core.Fclt.ServiceAggregate.Specifications;

public class ServiceKeepTopIdsSpec : Specification<Service>
{
  public ServiceKeepTopIdsSpec(int[]? keepTopIds)
  {
    if (keepTopIds is null)
    {
      return;
    }

    Query.OrderByDescending(Service => keepTopIds.Contains(Service.Id));
  }
}

