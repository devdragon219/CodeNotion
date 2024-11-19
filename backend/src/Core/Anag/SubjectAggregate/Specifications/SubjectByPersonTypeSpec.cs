using Ardalis.Specification;

namespace RealGimm.Core.Anag.SubjectAggregate.Specifications;

public class SubjectByPersonTypeSpec : Specification<Subject>
{
  public SubjectByPersonTypeSpec(PersonType personType)
  {
    Query
        .Where(s => s.PersonType == personType);
  }
}
