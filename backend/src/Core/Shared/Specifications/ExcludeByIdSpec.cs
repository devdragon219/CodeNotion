using Ardalis.Specification;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Shared.Specifications;

public sealed class ExcludeByIdSpec<T> : Specification<T>
  where T : IIdentifiable
{
  public ExcludeByIdSpec(int id)
  {
    Query.Where(x => x.Id != id);
  }
}
