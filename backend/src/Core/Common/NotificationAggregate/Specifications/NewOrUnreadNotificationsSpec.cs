using Ardalis.Specification;

namespace RealGimm.Core.Common.NotificationAggregate.Specifications;

public sealed class NewOrUnreadNotificationsSpec : Specification<Notification>
{
  public NewOrUnreadNotificationsSpec()
  {
    Query.Where(notification =>
      notification.Status == NotificationStatus.Unread ||
      notification.Status == NotificationStatus.New);
  }
}
