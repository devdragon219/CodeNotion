using Ardalis.Specification;

namespace RealGimm.Core.Asst.EstateSubUnitAggregate.Specifications;

public class EstateSubUnitByParentIdSpec : Specification<EstateSubUnit>, ISingleResultSpecification<EstateSubUnit>
{
  public EstateSubUnitByParentIdSpec(int parentId)
  {
    Query.Where(subUnit => subUnit.EstateUnit.Id == parentId);
  }
}
