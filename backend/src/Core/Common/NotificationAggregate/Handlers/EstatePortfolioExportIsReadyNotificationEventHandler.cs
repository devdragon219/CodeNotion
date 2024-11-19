using RealGimm.Core.Common.NotificationAggregate.Events;

namespace RealGimm.Core.Common.NotificationAggregate.Handlers;

public class EstatePortfolioExportIsReadyNotificationHandler : NotificationHandler<EstatePortfolioExportIsReadyNotificationEvent, EstatePortfolioExportIsReadyNotification, EstatePortfolioExportIsReadyNotificationHandler>
{
  protected override void MapNotification(EstatePortfolioExportIsReadyNotificationEvent from, EstatePortfolioExportIsReadyNotification into)
  {
    into.SetDownloadGuid(from.DownloadGuid);
  }
}
