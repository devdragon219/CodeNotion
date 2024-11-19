namespace RealGimm.Core.Common.NotificationAggregate.Events;

public record CostChargesExpirationNotificationEvent : NotificationEvent
{
  public required int[] CostChargeIds { get; init; }
  public required int DaysToExpiration { get; init; }
}
