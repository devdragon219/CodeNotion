namespace RealGimm.SharedKernel.Attributes;

[AttributeUsage(AttributeTargets.Class)]
public class HasEntityIdAttribute : Attribute
{
  public readonly string PropertyName;

  public HasEntityIdAttribute(string propertyName)
    => PropertyName = propertyName;
}
