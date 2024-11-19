using RealGimm.Core.Common.NotificationAggregate.Events;

namespace RealGimm.Core.Common.NotificationAggregate.Handlers;

public class PasswordExpirationNotificationHandler : NotificationHandler<PasswordExpirationNotificationEvent, PasswordExpirationNotification, PasswordExpirationNotificationHandler>
{
  protected override void MapNotification(PasswordExpirationNotificationEvent from, PasswordExpirationNotification into)
  {
    into.SetPasswordExpirationDate(from.PasswordExpirationDate);
  }
}
