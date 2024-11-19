using Ardalis.Result;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core;
using RealGimm.Core.Common.NotificationAggregate;
using RealGimm.Core.Common.NotificationAggregate.Specifications;
using RealGimm.Core.Shared.Specifications;
using RealGimm.WebCommons;

namespace RealGimm.Web.Common.Mutations;

public class NotificationMutations : MutationsBase
{
  public async Task<Result> MarkNewAsUnread(
    int[]? ids,
    [Service] IRepository<Notification> repository,
    CancellationToken cancellationToken)
  {
    var notifications = ids is null
      ? await repository.ListAsync(new NewNotificationsSpec(), cancellationToken)
      : await repository.AsQueryable(new NewNotificationsSpec(), new GetByIdsSpec<Notification>(ids)).ToListAsync(cancellationToken);

    foreach (var notification in notifications)
    {
      notification.SetStatus(NotificationStatus.Unread);
    }

    await repository.UpdateRangeAsync(notifications, cancellationToken);

    return Result.Success();
  }

  public async Task<Result> MarkAsRead(
    int[]? ids,
    [Service] IRepository<Notification> repository,
    CancellationToken cancellationToken)
  {
    var notifications = ids is null
      ? await repository.ListAsync(new NewOrUnreadNotificationsSpec(), cancellationToken)
      : await repository.AsQueryable(new GetByIdsSpec<Notification>(ids)).ToListAsync(cancellationToken);

    foreach (var notification in notifications)
    {
      notification.SetStatus(NotificationStatus.Read);
    }

    await repository.UpdateRangeAsync(notifications, cancellationToken);

    return Result.Success();
  }

  public Task<Result> Delete(
    int id,
    [Service] IRepository<Notification> repository,
    CancellationToken cancellationToken)
    => DeleteAsync(new GetByIdSpec<Notification>(id), repository, cancellationToken);

  public Task<Result> DeleteRange(
    int[] ids,
    [Service] IRepository<Notification> repository,
    CancellationToken cancellationToken)
    => DeleteRangeAsync(new GetByIdsSpec<Notification>(ids), repository, cancellationToken);
}
