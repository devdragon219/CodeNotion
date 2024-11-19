namespace RealGimm.Core.Common.NotificationAggregate.Events;

public record ContractsExpirationNotificationEvent : NotificationEvent
{
  public required int[] ContractIds { get; init; }
  public required bool IsActiveContracts { get; init; }
  public required int DaysToExpiration { get; init; }
}
