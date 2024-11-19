using Ardalis.Specification;
using RealGimm.SharedKernel;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Shared.Specifications;
public class GetByIdSpec<T> : SingleResultSpecification<T> where T : IIdentifiable
{
  public GetByIdSpec(int Id)
  {
    Query
      .Where(x => x.Id == Id);
  }
}
