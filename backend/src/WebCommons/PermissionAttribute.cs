using System.Reflection;
using HotChocolate.Authorization;
using HotChocolate.Types.Descriptors;
using RealGimm.Core.IAM.UserAggregate;

namespace RealGimm.WebCommons;

[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method | AttributeTargets.Property)]
public abstract class PermissionAttribute : DescriptorAttribute
{
  private readonly string _feature;
  private readonly Permission _permission;
  private readonly OfficeAccess _officeAccess;

  public PermissionAttribute(string feature, Permission permission, OfficeAccess officeAccess)
  {
    _feature = feature;
    _permission = permission;
    _officeAccess = officeAccess;
  }

  private static string CreateFeaturePermissionRole(string feature, Permission permission)
  {
    var permissionLetter = permission switch
    {
      Permission.Create => "C",
      Permission.Read => "R",
      Permission.Update => "U",
      Permission.Delete => "D",
      _ => throw new ArgumentException("Invalid permission")
    };

    return $"{feature}_{permissionLetter}";
  }

  private static string CreateOfficeAccessRole(OfficeAccess officeAccess)
  {
    var officeAccessSuffix = officeAccess switch
    {
      OfficeAccess.Both => "BF",
      OfficeAccess.BackOffice => "B",
      OfficeAccess.FrontOffice => "F",
      _ => throw new ArgumentException("Invalid office access")
    };

    return $"OFFICE_{officeAccessSuffix}";
  }

  protected override void TryConfigure(
    IDescriptorContext context,
    IDescriptor descriptor,
    ICustomAttributeProvider element)
  {
    var featurePermissionDirective = new AuthorizeDirective([CreateFeaturePermissionRole(_feature, _permission)]);
    var officeAccessDirective = new AuthorizeDirective([CreateOfficeAccessRole(_officeAccess)]);

    if (descriptor is IObjectTypeDescriptor type)
    {
      type.Directive(featurePermissionDirective);
      type.Directive(officeAccessDirective);
    }
    else if (descriptor is IObjectFieldDescriptor field)
    {
      field.Directive(featurePermissionDirective);
      field.Directive(officeAccessDirective);
    }
  }
}
