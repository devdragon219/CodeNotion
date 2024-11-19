using Ardalis.Specification;

namespace RealGimm.Core.Anag.SubjectAggregate.Specifications;

public class SubjectThatCanBeGroupLeaderForSubjectIdSpec : Specification<Subject>
{
  public SubjectThatCanBeGroupLeaderForSubjectIdSpec(int subjectId)
  {
    Query
      .Where(subject => subject.RelationMains
        .Where(relation => relation.RelationType == SubjectRelationType.CompanyGroup)
        .Where(relation => relation.SubordinateId != subjectId)
        .All(relation => relation.GroupRelationType != CompanyGroup.Leader));
  }
}
