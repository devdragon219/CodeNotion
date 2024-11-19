using RealGimm.SharedKernel.Interfaces;
using Ardalis.Result;
using Ardalis.Specification;
using RealGimm.Core.Shared.Specifications;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core;

namespace RealGimm.WebCommons;

public abstract class MutationsBase
{
  protected async Task<Result> SoftDeleteAsync<TEntity>(
    ISingleResultSpecification<TEntity> entityByIdSpec,
    IRepository<TEntity> repository,
    CancellationToken cancellationToken = default)
    where TEntity : EntityBase, IAggregateRoot, ISoftDeletable
  {
    var entityToDelete = await repository
      .AsQueryable(entityByIdSpec, new EntityNonDeletedSpec<TEntity>())
      .SingleOrDefaultAsync(cancellationToken);

    if (entityToDelete is null)
    {
      return Result.NotFound();
    }

    entityToDelete.MarkAsDeleted();
    await repository.SaveChangesAsync(cancellationToken);

    return Result.Success();
  }

  public async Task<Result> SoftDeleteRangeAsync<TEntity>(
    ISpecification<TEntity>[] specifications,
    IRepository<TEntity> repository,
    CancellationToken cancellationToken = default)
    where TEntity : EntityBase, IAggregateRoot, ISoftDeletable
  {
    var entitiesToDelete = await repository
      .AsQueryable(specifications.Append(new EntityNonDeletedSpec<TEntity>()).ToArray())
      .ToListAsync(cancellationToken);

    foreach (var entitiy in entitiesToDelete)
    {
      entitiy.MarkAsDeleted();
    }

    await repository.SaveChangesAsync(cancellationToken);

    return Result.Success();
  }

  public async Task<Result> SoftDeleteRangeAsync<TEntity>(
    ISpecification<TEntity> entityByIdsSpec,
    IRepository<TEntity> repository,
    CancellationToken cancellationToken = default)
    where TEntity : EntityBase, IAggregateRoot, ISoftDeletable
    => await SoftDeleteRangeAsync(new[] { entityByIdsSpec }, repository, cancellationToken);

  public async Task<Result> DeleteAsync<TEntity>(
    ISingleResultSpecification<TEntity> entityByIdSpec,
    IRepository<TEntity> repository,
    CancellationToken cancellationToken = default)
    where TEntity : class, IIdentifiable, IAggregateRoot
    => await DeleteAsync(entityByIdSpec, repository, (_, _) => Task.FromResult(false), cancellationToken);

  public async Task<Result> DeleteAsync<TEntity>(
    ISingleResultSpecification<TEntity> entityByIdSpec,
    IRepository<TEntity> repository,
    Func<int, CancellationToken, Task<bool>> hasDeleteRestrictions,
    CancellationToken cancellationToken = default)
    where TEntity : class, IIdentifiable, IAggregateRoot
  {
    var entityToDelete = await repository.SingleOrDefaultAsync(entityByIdSpec, cancellationToken);
    if (entityToDelete is null)
    {
      return Result.NotFound();
    }

    if (await hasDeleteRestrictions(entityToDelete.Id, cancellationToken))
    {
      return Result.Invalid(ErrorCode.ItemInUseCannotBeDeleted.ToValidationError());
    }

    try
    {
      await repository.DeleteAsync(entityToDelete, cancellationToken);
    }
    catch (DbUpdateException)
    {
      return Result.Invalid(ErrorCode.ItemInUseCannotBeDeleted.ToValidationError());
    }

    return Result.Success();
  }

  public async Task<Result> DeleteRangeAsync<TEntity>(
    ISpecification<TEntity> entityByIdsSpec,
    IRepository<TEntity> repository,
    CancellationToken cancellationToken = default)
    where TEntity : class, IIdentifiable, IAggregateRoot
    => await DeleteRangeAsync(entityByIdsSpec, repository, (_, _) => Task.FromResult(false), cancellationToken);
    
  public async Task<Result> DeleteRangeAsync<TEntity>(
    ISpecification<TEntity> entityByIdsSpec,
    IRepository<TEntity> repository,
    Func<int, CancellationToken, Task<bool>> hasDeleteRestrictions,
    CancellationToken cancellationToken = default)
    where TEntity : class, IIdentifiable, IAggregateRoot
  {
    var entitiesToDelete = await repository.ListAsync(entityByIdsSpec, cancellationToken);
    foreach (var entity in entitiesToDelete)
    {
      if (await hasDeleteRestrictions(entity.Id, cancellationToken))
      {
        return Result.Invalid(ErrorCode.ItemInUseCannotBeDeleted.ToValidationError());
      }

      repository.DeleteSuspend(entity);
    }

    try
    {
      await repository.SaveChangesAsync(cancellationToken);
    }
    catch (DbUpdateException)
    {
      return Result.Invalid(ErrorCode.ItemInUseCannotBeDeleted.ToValidationError());
    }

    return Result.Success();
  }
}
