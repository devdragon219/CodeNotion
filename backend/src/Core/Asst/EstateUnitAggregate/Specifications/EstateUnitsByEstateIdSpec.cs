using Ardalis.Specification;

namespace RealGimm.Core.Asst.EstateUnitAggregate.Specifications;

public class EstateUnitsByEstateIdSpec : Specification<EstateUnit>
{
  public EstateUnitsByEstateIdSpec(int estateId)
  {
    Query.Where(estateUnit => estateUnit.Estate.Id == estateId);
  }
}
