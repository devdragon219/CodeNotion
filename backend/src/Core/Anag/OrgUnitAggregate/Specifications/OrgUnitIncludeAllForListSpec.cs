using Ardalis.Specification;

namespace RealGimm.Core.Anag.OrgUnitAggregate.Specifications;

public class OrgUnitIncludeAllForListSpec : Specification<OrgUnit>
{
  public OrgUnitIncludeAllForListSpec()
  {
    Query
      .Include(orgUnit => orgUnit.ParentSubject)
        .ThenInclude(parent => parent.RelationSubordinates)
          .ThenInclude(relation => relation.Main)
      .Include(orgUnit => orgUnit.ParentOrgUnit);
  }
}
