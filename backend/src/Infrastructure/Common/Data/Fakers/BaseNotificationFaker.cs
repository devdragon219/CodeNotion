using Bogus;
using RealGimm.Core.Common.NotificationAggregate;

namespace RealGimm.Infrastructure.Common.Data.Fakers;

public abstract class BaseNotificationFaker<TNotification> : BaseSeededFaker<TNotification>
  where TNotification : Notification, new()
{
  private readonly string _userName;

  public BaseNotificationFaker(string userName)
  {
    _userName = userName;
  }

  protected virtual void GenerateBaseData(Faker faker, Notification notification)
  {
    notification.SetData(
      _userName,
      timestamp: DateTime.SpecifyKind(faker.Date.Recent(days: 10, refDate: new DateTime(2024, 01, 01)), DateTimeKind.Utc));
  }
}
