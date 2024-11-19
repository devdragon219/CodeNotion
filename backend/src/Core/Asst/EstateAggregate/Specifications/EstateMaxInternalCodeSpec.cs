using Ardalis.Specification;

namespace RealGimm.Core.Asst.EstateAggregate.Specifications;

public class EstateMaxInternalCodeSpec : Specification<Estate>, ISingleResultSpecification<Estate>
{
  public EstateMaxInternalCodeSpec()
  {
    Query
      .OrderByDescending(estate => estate.InternalCode)
      .Take(1);
  }
}
