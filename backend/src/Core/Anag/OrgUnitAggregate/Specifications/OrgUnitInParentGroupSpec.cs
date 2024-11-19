using Ardalis.Specification;

namespace RealGimm.Core.Anag.OrgUnitAggregate.Specifications;

public class OrgUnitInParentGroupSpec : Specification<OrgUnit>
{
  public OrgUnitInParentGroupSpec(IEnumerable<int> parentsIds)
  {
    Query.Where(orgUnit => parentsIds.Contains(orgUnit.ParentSubjectId));
  }
}
