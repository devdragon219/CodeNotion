using Ardalis.Specification;

namespace RealGimm.Core.Anag.SubjectAggregate.Specifications;

public class SubjectRelationsSpec : Specification<Subject>
{
  public SubjectRelationsSpec()
  {
    Query
      .Include(subject => subject.RelationMains)
        .ThenInclude(relation => relation.Subordinate)
      .Include(subject => subject.RelationSubordinates)
        .ThenInclude(relation => relation.Main)
      .AsSplitQuery();
  }
}

