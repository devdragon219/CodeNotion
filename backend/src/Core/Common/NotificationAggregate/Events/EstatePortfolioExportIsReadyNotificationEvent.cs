namespace RealGimm.Core.Common.NotificationAggregate.Events;

public record EstatePortfolioExportIsReadyNotificationEvent : NotificationEvent
{
  public required Guid? DownloadGuid { get; init; }
}
