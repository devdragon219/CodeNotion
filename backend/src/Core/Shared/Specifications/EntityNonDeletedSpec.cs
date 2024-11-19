using Ardalis.Specification;
using RealGimm.SharedKernel;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Shared.Specifications;

public class EntityNonDeletedSpec<TEntity> : Specification<TEntity>
  where TEntity : ISoftDeletable
{
  public EntityNonDeletedSpec()
  {
    Query.Where(x => !x.DeletionDate.HasValue);
  }
}
