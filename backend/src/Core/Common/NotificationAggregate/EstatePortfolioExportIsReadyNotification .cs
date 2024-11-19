namespace RealGimm.Core.Common.NotificationAggregate;

public class EstatePortfolioExportIsReadyNotification : Notification
{
  public Guid? DownloadGuid { get; private set; }
  public bool IsSuccess => DownloadGuid is not null;

  public void SetDownloadGuid(Guid? downloadGuid) => DownloadGuid = downloadGuid;
}
