using RealGimm.Core.IAM.UserAggregate;

namespace RealGimm.WebCommons;

public sealed class BackOfficePermissionAttribute : PermissionAttribute
{
  public BackOfficePermissionAttribute(string feature, Permission permission)
    : base(feature, permission, OfficeAccess.BackOffice)
  {
  }
}
