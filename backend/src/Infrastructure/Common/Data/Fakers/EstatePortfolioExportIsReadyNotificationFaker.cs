using RealGimm.Core.Common.NotificationAggregate;

namespace RealGimm.Infrastructure.Common.Data.Fakers;

public sealed class EstatePortfolioExportIsReadyNotificationFaker : BaseNotificationFaker<EstatePortfolioExportIsReadyNotification>
{
  public EstatePortfolioExportIsReadyNotificationFaker(string userName) : base(userName)
  {
    CustomInstantiator(faker =>
    {
      var notification = new EstatePortfolioExportIsReadyNotification();
      GenerateBaseData(faker, notification);

      notification.SetDownloadGuid(faker.Random.Guid());

      return notification;
    });
  }
}
