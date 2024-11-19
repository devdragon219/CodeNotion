namespace RealGimm.SharedKernel.Attributes;

[AttributeUsage(AttributeTargets.Class)]
public class DefaultCronScheduleAttribute : Attribute
{
  public readonly string DefaultSchedule;

  public DefaultCronScheduleAttribute(string defaultSchedule)
    => DefaultSchedule = defaultSchedule;
}
