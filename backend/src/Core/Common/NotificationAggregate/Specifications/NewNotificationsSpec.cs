using Ardalis.Specification;

namespace RealGimm.Core.Common.NotificationAggregate.Specifications;

public sealed class NewNotificationsSpec : Specification<Notification>
{
  public NewNotificationsSpec()
  {
    Query.Where(notification => notification.Status == NotificationStatus.New);
  }
}
