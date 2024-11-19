namespace RealGimm.Core.Common.NotificationAggregate;

public class PasswordExpirationNotification : Notification
{
  public DateTime PasswordExpirationDate { get; private set; }

  public void SetPasswordExpirationDate(DateTime passwordExpirationDate)
    => PasswordExpirationDate = passwordExpirationDate;
}
