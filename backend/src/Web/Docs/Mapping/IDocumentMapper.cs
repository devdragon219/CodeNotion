using RealGimm.Web.Docs.Models;
using RealGimm.Core.Docs.DocumentAggregate;

namespace RealGimm.Web.Docs.Mapping;

public interface IDocumentMapper<TEntity>
{
  public Task MapAsync(int entityId, int? estateId, DocumentInput from, Document into, CancellationToken cancellationToken);

  public async Task<Document> MapAsync(int entityId, int? estateId, DocumentInput from, CancellationToken cancellationToken)
  {
    var document = new Document();
    await MapAsync(entityId, estateId, from, document, cancellationToken);

    return document;
  }
}
