using Ardalis.Specification;

namespace RealGimm.Core.Anag.SubjectAggregate.Specifications;

public class SubjectMaxInternalCodeSpec : Specification<Subject>, ISingleResultSpecification<Subject>
{
  public SubjectMaxInternalCodeSpec()
  {
    Query
        .OrderByDescending(s => s.InternalCode)
        .Take(1);
  }
}
