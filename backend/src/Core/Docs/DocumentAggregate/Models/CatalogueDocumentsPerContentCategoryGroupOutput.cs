namespace RealGimm.Core.Docs.DocumentAggregate.Models;

public record CatalogueDocumentsPerContentCategoryGroupOutput
{
  public Guid Guid { get; } = Guid.NewGuid();
  public string ContentCategoryGroup { get; init; } = default!;
  public IEnumerable<CatalogueDocumentsPerContentCategoryOutput> SubRows { get; init; } = Enumerable.Empty<CatalogueDocumentsPerContentCategoryOutput>();
}
