using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Logging;
using RealGimm.Core.Common.NotificationAggregate.Events;
using RealGimm.Core.Docs.Events;
using RealGimm.Core.Docs.Interfaces;
using RealGimm.Core.EventSystem;
using RealGimm.Core.Resources;
using RealGimm.SharedKernel.Attributes;
using Rebus.Bus;

namespace RealGimm.Core.Docs.Handlers;

[BackgroundEventHandler]
public class EstatePortfolioExportHandler : TenantMessageHandler<EstatePortfolioExportEvent>
{
  public required IEstatePortfolioService ExportService { protected get; init; }
  public required ILogger<EstatePortfolioExportHandler> Logger { protected get; init; }
  public required IBus Bus { protected get; init; }
  public required IStringLocalizer<EstatePortfolioExportHandler> Localizer { protected get; init; }

  protected override async Task HandlePerTenant(EstatePortfolioExportEvent message)
  {
    if (Localizer is JsonStringLocalizer lcidLocalizer)
    {
      lcidLocalizer.OverrideLCID = message.CultureId;
    }

    var fileCacheId = await ExportService.ExportToFile(message.CultureId, message.EstateId, message.CmisIds);

    var notification = new EstatePortfolioExportIsReadyNotificationEvent
    {
      UserName = message.CreatedByUserName,
      Timestamp = DateTime.UtcNow,
      DownloadGuid = fileCacheId
    };

    await Bus.Publish(notification);
  }
}
