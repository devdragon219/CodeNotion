using Ardalis.Specification;

namespace RealGimm.Core.Anag.OrgUnitAggregate.Specifications;

public class OrgUnitByInternalCodeSpec : SingleResultSpecification<OrgUnit>
{
  public OrgUnitByInternalCodeSpec(string code)
  {
    Query.Where(orgUnit => orgUnit.InternalCode == code);
  }
}
