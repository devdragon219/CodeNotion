using Ardalis.Specification;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Shared.Specifications;

public sealed class GetByInternalCodesSpec<T> : Specification<T>
  where T : IInternallyCoded
{
  public GetByInternalCodesSpec(IEnumerable<string> internalCodes)
  {
    Query.Where(entity => internalCodes.Contains(entity.InternalCode));
  }
}
