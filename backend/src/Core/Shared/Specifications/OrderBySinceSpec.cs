using Ardalis.Specification;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Shared.Specifications;

public class OrderBySinceSpec<T> : Specification<T>
  where T : IDateOnlyRanged
{
  public OrderBySinceSpec()
  {
    Query
      .OrderByDescending(x => x.Since);
  }
}
