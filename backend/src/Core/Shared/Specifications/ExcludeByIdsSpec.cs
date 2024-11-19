using Ardalis.Specification;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Shared.Specifications;

public sealed class ExcludeByIdsSpec<T> : Specification<T>
  where T : IIdentifiable
{
  public ExcludeByIdsSpec(IEnumerable<int> ids)
  {
    Query.Where(x => !ids.Contains(x.Id));
  }
}
