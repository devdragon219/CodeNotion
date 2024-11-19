using Ardalis.Specification;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Shared.Specifications;

public class GetByIdsSpec<T> : Specification<T> where T : IIdentifiable
{
  public GetByIdsSpec(IEnumerable<int> ids)
  {
    Query.Where(s => ids.Contains(s.Id));
  }
}
