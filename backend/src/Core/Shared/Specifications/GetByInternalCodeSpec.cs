using Ardalis.Specification;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Shared.Specifications;

public sealed class GetByInternalCodeSpec<T> : Specification<T>, ISingleResultSpecification<T>
  where T : IInternallyCoded
{
  public GetByInternalCodeSpec(string internalCode)
  {
    Query.Where(entity => entity.InternalCode == internalCode);
  }
}
