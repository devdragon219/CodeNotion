using Ardalis.Specification;

namespace RealGimm.Core.Anag.SubjectAggregate.Specifications;

public class SubjectsInCompanyGroupIdSpec : Specification<Subject>
{
  public SubjectsInCompanyGroupIdSpec(int[] managementSubjectId)
  {
    Query
      .Where(subject => subject.RelationSubordinates
        .Where(relation => relation.RelationType == SubjectRelationType.CompanyGroup)
        .Any(relation =>  managementSubjectId.Contains(relation.MainId)));
  }
}
