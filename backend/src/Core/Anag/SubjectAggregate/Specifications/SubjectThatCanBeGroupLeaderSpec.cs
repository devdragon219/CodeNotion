using Ardalis.Specification;

namespace RealGimm.Core.Anag.SubjectAggregate.Specifications;

public class SubjectThatCanBeGroupLeaderSpec : Specification<Subject>
{
  public SubjectThatCanBeGroupLeaderSpec()
  {
    Query
      .Where(subject => subject.RelationMains
        .Where(relation => relation.RelationType == SubjectRelationType.CompanyGroup)
        .All(relation => relation.GroupRelationType != CompanyGroup.Leader));
  }
}
