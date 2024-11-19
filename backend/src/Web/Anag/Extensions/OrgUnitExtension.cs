using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Anag.OrgUnitAggregate;

namespace RealGimm.Web.Anag.Extensions;

[ExtendObjectType(typeof(OrgUnit))]
public class OrgUnitExtension
{
  public ISubject GetParentSubject([Parent] OrgUnit orgUnit) => orgUnit.ParentSubject;
}
