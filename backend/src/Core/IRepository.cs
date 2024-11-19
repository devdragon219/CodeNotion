using System.Linq.Expressions;
using Ardalis.Specification;
using RealGimm.Core.Fclt.SLAAggregate;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core;

// from Ardalis.Specification
public interface IRepository<T> : IRepositoryBase<T> where T : class, IAggregateRoot
{
  public IQueryable<T> AsQueryable(ISpecification<T> specification);
  
  public IQueryable<T> AsQueryable(IEnumerable<ISpecification<T>> specifications);

  public IQueryable<T> AsQueryable(params ISpecification<T>[] specifications);
  
  public void UpdateSuspend(T entity);
  
  public void AddSuspend(T entity);
  
  public void DeleteSuspend(T entity);

  public void DeleteRangeSuspend(T[] entities);

  public Task LoadCollectionAsync<TItem>(T entity, Expression<Func<T, IEnumerable<TItem>>> collectionSelector, CancellationToken cancellationToken = default)
    where TItem : class;

  public Task UpsertCollectionAsync<TEntity, TItem>(
    TEntity entity,
    Expression<Func<TEntity, IEnumerable<TItem>>> collectionExpression,
    CancellationToken cancellationToken = default)
    where TEntity : EntityBase, T
    where TItem : EntityBase;

  public Task ExecuteUpdateAsync(
    Expression<Func<T, bool>> filter,
    Expression<Func<Microsoft.EntityFrameworkCore.Query.SetPropertyCalls<T>, Microsoft.EntityFrameworkCore.Query.SetPropertyCalls<T>>> update);

  public Task LoadNavigationsAsync(TicketCondition condition, CancellationToken cancellationToken);
}
