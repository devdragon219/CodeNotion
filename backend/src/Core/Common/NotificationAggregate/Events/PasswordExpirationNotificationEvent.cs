namespace RealGimm.Core.Common.NotificationAggregate.Events;

public record PasswordExpirationNotificationEvent : NotificationEvent
{
  public required DateTime PasswordExpirationDate { get; init; }
}
