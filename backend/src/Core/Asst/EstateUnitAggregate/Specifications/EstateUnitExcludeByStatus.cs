using Ardalis.Specification;

namespace RealGimm.Core.Asst.EstateUnitAggregate.Specifications;

public class EstateUnitExcludeByStatus : Specification<EstateUnit>
{
  public EstateUnitExcludeByStatus(EstateUnitStatus status)
  {
    Query.Where(estateUnit => estateUnit.Status != status);
  }
}
