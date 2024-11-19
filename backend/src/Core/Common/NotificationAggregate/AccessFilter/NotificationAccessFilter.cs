using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using RealGimm.SharedKernel;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Common.NotificationAggregate.AccessFilter;

public class NotificationAccessFilter : AccessFilterBase<Notification>
{
  private static readonly CancellationTokenSource _invalidationSource = new();
  public override CancellationTokenSource InvalidationSource => _invalidationSource;
  private readonly IReadRepository<Notification> _repository;

  public NotificationAccessFilter(IReadRepository<Notification> repository,
    IMemoryCache cache) : base(cache)
  {
    _repository = repository;
  }

  protected override async Task<int[]> ActualEntities(
    IUserDataProvider user,
    CancellationToken cancellationToken = default)
  {
    //Include soft deleted entities, for now
    return await _repository
      .AsQueryable()
      .Where(s => s.Username == user.Username)
      .Select(s => s.Id)
      .TagWith(Constants.SKIP_ACCESS_FILTER)
      .TagWith(Constants.SKIP_DEFAULT_ORDERING)
      .ToArrayAsync(cancellationToken);
  }
}
