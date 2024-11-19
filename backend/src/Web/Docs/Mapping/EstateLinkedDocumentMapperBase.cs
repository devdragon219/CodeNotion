using RealGimm.Web.Docs.Models;
using RealGimm.Core.Docs.DocumentAggregate;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Web.Docs.Mapping;

public abstract class EstateLinkedDocumentMapperBase<TEntity> : DocumentMapperBase<TEntity>
{
  public abstract Task MapAsync(int entityId, DocumentInput from, Document into, CancellationToken cancellationToken);

  public override Task MapAsync(int entityId, int? estateId, DocumentInput from, Document into, CancellationToken cancellationToken)
    => MapAsync(entityId, from, into, cancellationToken); // ignore estateId since it should be retrieved from the entity
}
