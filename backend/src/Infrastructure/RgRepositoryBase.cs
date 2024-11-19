using Ardalis.Specification.EntityFrameworkCore;
using Ardalis.Specification;
using Microsoft.EntityFrameworkCore;
using RealGimm.SharedKernel.Interfaces;
using System.Linq.Expressions;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core;
using RealGimm.Core.Fclt.SLAAggregate;

namespace RealGimm.Infrastructure;

public class RgRepositoryBase<T> : RepositoryBase<T>, IReadRepository<T>, IRepository<T> where T : class, IAggregateRoot
{
  private readonly DbContext _dbContext;

  public RgRepositoryBase(DbContext dbContext) : base(dbContext)
  {
    _dbContext = dbContext;
  }

  public IQueryable<T> AsQueryable(ISpecification<T> specification)
  {
    return ApplySpecification(specification);
  }

  public IQueryable<T> AsQueryable(IEnumerable<ISpecification<T>> specifications)
  {
    var query = _dbContext.Set<T>().AsQueryable();
    foreach (var specification in specifications)
    {
      query = SpecificationEvaluator.Default.GetQuery(query, specification, false);
    }

    return query;
  }

  public IQueryable<T> AsQueryable(params ISpecification<T>[] specifications)
    => AsQueryable((IEnumerable<ISpecification<T>>)specifications);

  public void UpdateSuspend(T entity) => _dbContext.Set<T>().Update(entity);

  public void AddSuspend(T entity) => _dbContext.Set<T>().Add(entity);

  public void DeleteSuspend(T entity) => _dbContext.Set<T>().Remove(entity);

  public void DeleteRangeSuspend(T[] entities) => _dbContext.Set<T>().RemoveRange(entities);

  public async Task LoadCollectionAsync<TItem>(T entity, Expression<Func<T, IEnumerable<TItem>>> collectionSelector, CancellationToken cancellationToken = default)
    where TItem : class
    => await _dbContext.Entry(entity).Collection(collectionSelector).LoadAsync(cancellationToken);

  public async Task UpsertCollectionAsync<TEntity, TItem>(
    TEntity entity,
    Expression<Func<TEntity, IEnumerable<TItem>>> collectionExpression,
    CancellationToken cancellationToken = default)
    where TEntity : EntityBase, T
    where TItem : EntityBase
  {
    // EstateUnitFloors collection needs special handling because EstateUnitFloor has composite primary key
    if (typeof(TItem) == typeof(EstateUnitFloor))
    {
      var estateUnitFloorsCollectionExpression = collectionExpression as Expression<Func<TEntity, IEnumerable<EstateUnitFloor>>>;
      await UpsertEstateUnitFloorsAsync(entity, estateUnitFloorsCollectionExpression!, cancellationToken);

      return;
    }

    var collectionSelector = collectionExpression.Compile();
    var newItemsIds = collectionSelector(entity).Select(item => item.Id).ToArray();

    // special handling for PhysicalSubject.BirthLocation
    if (entity is PhysicalSubject physicalSubject &&
       typeof(TItem) == typeof(Address) &&
       physicalSubject.BirthLocation is not null)
    {
      newItemsIds = newItemsIds.Concat(new[] { physicalSubject.BirthLocation.Id }).ToArray();
    }

    Expression<Func<TItem, bool>> itemsToDeleteExpression = (TItem item) => !newItemsIds.Contains(item.Id);

    var itemsToDelete = await _dbContext.Entry(entity)
      .Collection(collectionExpression)
      .Query()
      .Where(itemsToDeleteExpression)
      .ToArrayAsync(cancellationToken);

    foreach (var itemToDelete in itemsToDelete)
    {
      _dbContext.Remove(itemToDelete);
    }
  }

  private async Task UpsertEstateUnitFloorsAsync<TEntity>(
    TEntity entity,
    Expression<Func<TEntity, IEnumerable<EstateUnitFloor>>> collectionExpression,
    CancellationToken cancellationToken = default)
    where TEntity : EntityBase, IAggregateRoot
  {
    var collectionSelector = collectionExpression.Compile();

    var newRelations = collectionSelector(entity)
      .Select(relation => (Value: relation, Key: new { relation.EstateUnitId, relation.FloorId }))
      .ToArray();

    var oldRelationsKeys = await _dbContext
      .Entry(entity)
      .Collection(collectionExpression)
      .Query()
      .Select(relation => new { relation.EstateUnitId, relation.FloorId })
      .ToArrayAsync(cancellationToken);

    // marking new relations as updated/added
    foreach (var (newRelation, newRelationKey) in newRelations)
    {
      if (oldRelationsKeys.Contains(newRelationKey))
      {
        _dbContext.Update(newRelation);
      }
      else
      {
        _dbContext.Add(newRelation);
      }
    }

    var relationsToDeleteKeys = oldRelationsKeys.Except(newRelations.Select(relation => relation.Key));

    // marking old relations as deleted
    foreach (var relationToDeleteKey in relationsToDeleteKeys)
    {
      var oldItem = await _dbContext.Set<EstateUnitFloor>()
        .Where(relation =>
          relation.EstateUnitId == relationToDeleteKey.EstateUnitId &&
          relation.FloorId == relationToDeleteKey.FloorId)
        .SingleAsync(cancellationToken);

      _dbContext.Remove(oldItem);
    }
  }

  public async Task ExecuteUpdateAsync(Expression<Func<T, bool>> filter, Expression<Func<Microsoft.EntityFrameworkCore.Query.SetPropertyCalls<T>, Microsoft.EntityFrameworkCore.Query.SetPropertyCalls<T>>> update)
  {
    await _dbContext.Set<T>().Where(filter).ExecuteUpdateAsync(update);
  }

  public async Task LoadNavigationsAsync(TicketCondition condition, CancellationToken cancellationToken)
  {
    switch (condition)
    {
      case ComplexTicketCondition complexCondition:
      {
        await _dbContext
          .Entry(complexCondition)
          .Collection(condition => condition.InternalConditions)
          .LoadAsync();

        foreach (var internalCondition in complexCondition.InternalConditions)
        {
          await LoadNavigationsAsync(internalCondition, cancellationToken);
        }

        break;
      }

      case TicketTypeEqualityCondition equalityCondition:
      {
        await _dbContext
          .Entry(equalityCondition)
          .Reference(condition => condition.TargetTicketType)
          .LoadAsync(cancellationToken);

        break;
      }

      case TicketMasterStatusCondition statusCondition:
      {
        await _dbContext
          .Entry(statusCondition)
          .Reference(condition => condition.Calendar)
          .LoadAsync(cancellationToken);
        
        break;
      }

      case TicketCatalogueCategoryEqualityCondition:
      case TicketCatalogueSubCategoryEqualityCondition:
      case TicketCatalogueTypeEqualityCondition:
      case TicketPriorityEqualityCondition:
        break;

      default: throw new NotSupportedException($"Unsupported condition type: {condition.GetType().Name}");
    }
  }
}
