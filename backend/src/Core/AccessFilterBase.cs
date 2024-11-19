using System.Diagnostics;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Primitives;
using RealGimm.SharedKernel;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core;

public abstract class AccessFilterBase<T> : IAccessFilter<T> where T : class, IIdentifiable, IAggregateRoot
{
  private static readonly TimeSpan _cacheDuration = new(0, 10, 0);
  private static readonly TimeSpan _shortCacheDuration = new(0, 0, 20);
  private static readonly ActivitySource _activitySource = new(typeof(AccessFilterBase<>).FullName!);

  private readonly string _cachePrefix;
  private readonly IMemoryCache _cache;

  public AccessFilterBase(IMemoryCache cache)
  {
    _cache = cache;
    _cachePrefix = "AF-" + typeof(T).Name + "-";
  }

  public async Task<int[]> ReachableEntitiesAsync(IUserDataProvider user, CancellationToken cancellationToken)
  {
    var cacheKey = _cachePrefix + user.TenantId.ToString() + user.Username;

    return await _cache.GetOrCreateAsync(cacheKey, async ce =>
    {
      using var activity = _activitySource.StartActivity("Retrieving accessible entities");

      ce.AddExpirationToken(new CancellationChangeToken(InvalidationSource.Token));
      var entities = await ActualEntities(user, cancellationToken);
      ce.AbsoluteExpirationRelativeToNow = entities.Length == 0
        ? _shortCacheDuration
        : _cacheDuration;

      return entities;
    }) ?? await ActualEntities(user, cancellationToken);
  }

  protected abstract Task<int[]> ActualEntities(IUserDataProvider user, CancellationToken cancellationToken);

  public abstract CancellationTokenSource InvalidationSource { get; }
}