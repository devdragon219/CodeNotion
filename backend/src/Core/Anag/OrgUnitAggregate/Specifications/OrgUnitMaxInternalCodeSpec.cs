using Ardalis.Specification;

namespace RealGimm.Core.Anag.OrgUnitAggregate.Specifications;

public class OrgUnitMaxInternalCodeSpec : SingleResultSpecification<OrgUnit>
{
  public OrgUnitMaxInternalCodeSpec()
  {
    Query
      .OrderByDescending(orgUnit => orgUnit.InternalCode)
      .Take(1);
  }
}
