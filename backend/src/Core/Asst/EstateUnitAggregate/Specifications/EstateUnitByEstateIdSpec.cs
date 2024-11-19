using Ardalis.Specification;

namespace RealGimm.Core.Asst.EstateUnitAggregate.Specifications;

public class EstateUnitByEstateIdSpec : Specification<EstateUnit>
{
  public EstateUnitByEstateIdSpec(int estateId)
  {
    Query.Where(eu => eu.Estate.Id == estateId);
  }
}
