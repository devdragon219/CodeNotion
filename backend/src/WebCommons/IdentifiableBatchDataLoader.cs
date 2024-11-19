using GreenDonut;
using RealGimm.Core.Shared.Specifications;
using RealGimm.SharedKernel.Interfaces;
using Ardalis.Specification;

namespace RealGimm.WebCommons;

public abstract class IdentifiableBatchDataLoader<TEntity> : RgBatchDataLoader<int, TEntity>
  where TEntity : class, IAggregateRoot, IIdentifiable
{
  protected sealed override Func<TEntity, int> KeySelector { get; } = entity => entity.Id;
  protected abstract Specification<TEntity>[] AdditionalSpecificationsSingle { get; }
  protected abstract Specification<TEntity>[] AdditionalSpecificationsMultiple { get; }

  public IdentifiableBatchDataLoader(
    IServiceProvider serviceProvider,
    IBatchScheduler batchScheduler,
    DataLoaderOptions? options = null)
    : base(serviceProvider, batchScheduler, options)
  {
  }

  protected sealed override Specification<TEntity>[] GetSpecificationsSingle(IReadOnlyList<int> keys)
    => AdditionalSpecificationsSingle.Prepend(new GetByIdsSpec<TEntity>(keys)).ToArray();

  protected sealed override Specification<TEntity>[] GetSpecificationsMultiple(IReadOnlyList<int> keys)
    => AdditionalSpecificationsMultiple.Prepend(new GetByIdsSpec<TEntity>(keys)).ToArray();
}
