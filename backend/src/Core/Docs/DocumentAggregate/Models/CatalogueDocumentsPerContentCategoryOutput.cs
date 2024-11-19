using RealGimm.Core.Docs.DocumentAggregate;

namespace RealGimm.Core.Docs.DocumentAggregate.Models;

public record CatalogueDocumentsPerContentCategoryOutput
{
  public Guid Guid { get; } = Guid.NewGuid();
  public ContentCategory ContentCategory { get; init; } = default!;
  public IEnumerable<CatalogueDocumentOutput> SubRows { get; init; } = Enumerable.Empty<CatalogueDocumentOutput>();
}
