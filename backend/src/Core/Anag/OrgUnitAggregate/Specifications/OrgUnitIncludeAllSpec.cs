using Ardalis.Specification;

namespace RealGimm.Core.Anag.OrgUnitAggregate.Specifications;

public class OrgUnitIncludeAllSpec : Specification<OrgUnit>
{
  public OrgUnitIncludeAllSpec()
  {
    Query
      .Include(orgUnit => orgUnit.Contacts)
      .Include(orgUnit => orgUnit.Children.OrderBy(sc => sc.Id))
      .Include(orgUnit => orgUnit.ParentSubject)
        .ThenInclude(parent => parent.RelationSubordinates)
          .ThenInclude(relation => relation.Main)
      .Include(orgUnit => orgUnit.ParentOrgUnit)
      .AsSplitQuery();
  }
}
