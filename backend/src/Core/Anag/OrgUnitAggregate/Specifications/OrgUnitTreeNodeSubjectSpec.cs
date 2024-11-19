using Ardalis.Specification;
using RealGimm.Core.Anag.SubjectAggregate;

namespace RealGimm.Core.Anag.OrgUnitAggregate.Specifications;

public class OrgUnitTreeNodeSubjectSpec : Specification<Subject>
{
  public OrgUnitTreeNodeSubjectSpec()
  {
    Query
      .Include(subject => subject.RelationMains)
        .ThenInclude(relation => relation.Subordinate)
          .ThenInclude(subordinate => subordinate.OrgUnits)
            .ThenInclude(orgUnit => orgUnit.Children)

      .Include(subject => subject.OrgUnits)
        .ThenInclude(orgUnit => orgUnit.Children)

      .Where(subject => subject is ManagementSubject)

      .Where(subject =>
        subject.RelationMains.Any(relation =>
          relation.RelationType == SubjectRelationType.CompanyGroup &&
          !relation.Subordinate.DeletionDate.HasValue) ||
        subject.OrgUnits.Any(orgUnit => !orgUnit.DeletionDate.HasValue))

      .Where(subject => !subject.DeletionDate.HasValue);
  }
}
