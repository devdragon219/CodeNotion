using Microsoft.EntityFrameworkCore;
using RealGimm.Core;
using RealGimm.SharedKernel.Interfaces;
using Ardalis.Specification;
using GreenDonut;
using Microsoft.Extensions.DependencyInjection;

namespace RealGimm.WebCommons;

public abstract class RgBatchDataLoader<TKey, TEntity> : BatchDataLoader<TKey, TEntity>
  where TKey : notnull
  where TEntity : class, IAggregateRoot, IIdentifiable
{
  private readonly IServiceProvider _serviceProvider;

  protected abstract Func<TEntity, TKey> KeySelector { get; }

  public RgBatchDataLoader(
    IServiceProvider serviceProvider,
    IBatchScheduler batchScheduler,
    DataLoaderOptions? options = null)
    : base(batchScheduler, options)
  {
    _serviceProvider = serviceProvider;
  }

  protected abstract Specification<TEntity>[] GetSpecificationsSingle(IReadOnlyList<TKey> keys);

  protected abstract Specification<TEntity>[] GetSpecificationsMultiple(IReadOnlyList<TKey> keys);

  protected override async Task<IReadOnlyDictionary<TKey, TEntity>> LoadBatchAsync(
    IReadOnlyList<TKey> keys,
    CancellationToken cancellationToken)
  {
      await using var scope = _serviceProvider.CreateAsyncScope();
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<TEntity>>();
      
      return await repository
        .AsQueryable(keys.Count > 1
          ? GetSpecificationsMultiple(keys)
          : GetSpecificationsSingle(keys))
        .ToDictionaryAsync(KeySelector, cancellationToken);
  }
}
