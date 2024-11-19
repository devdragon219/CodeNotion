using Microsoft.EntityFrameworkCore;
using RealGimm.Core;
using RealGimm.Core.Common.NotificationAggregate;
using RealGimm.Core.Common.NotificationAggregate.Specifications;
using RealGimm.SharedKernel;

namespace RealGimm.Web.Common.Queries;

public class NotificationQueries
{
  [UsePaging(IncludeTotalCount = true, MaxPageSize = 100)]
  [UseFiltering]
  [UseSorting]
  public IQueryable<Notification> ListNotifications([Service] IReadRepository<Notification> repository)
    => repository.AsQueryable();

  [UseFiltering]
  [UseSorting]
  public IQueryable<Notification> ListNotificationsFull([Service] IReadRepository<Notification> repository)
    => repository.AsQueryable();

  public async Task<IEnumerable<Notification>> GetLastNotifications(
    [Service] IReadRepository<Notification> repository,
    CancellationToken cancellationToken)
  {
    var notificationsToShowCount = int.Max(
      await repository.CountAsync(new NewNotificationsSpec(), cancellationToken),
      Constants.COUNT_OF_LAST_NOTIFICATIONS_TO_SHOW);

    var lastNotifications = await repository
      .AsQueryable()
      .OrderByDescending(notification => notification.Timestamp)
      .Take(notificationsToShowCount)
      .ToListAsync(cancellationToken);

    return lastNotifications;
  }
}
