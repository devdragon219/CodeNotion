using Ardalis.Specification;

namespace RealGimm.Core.Anag.SubjectAggregate.Specifications;
public class SubjectOrgUnitSpec : Specification<Subject>
{
  public SubjectOrgUnitSpec()
  {
    Query
      .Include(x => x.OrgUnits);
  }
}
