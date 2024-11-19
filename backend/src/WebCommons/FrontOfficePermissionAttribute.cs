using RealGimm.Core.IAM.UserAggregate;

namespace RealGimm.WebCommons;

public sealed class FrontOfficePermissionAttribute : PermissionAttribute
{
  public FrontOfficePermissionAttribute(string feature, Permission permission)
    : base(feature, permission, OfficeAccess.FrontOffice)
  {
  }
}
