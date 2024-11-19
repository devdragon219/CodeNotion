namespace RealGimm.Core.Docs.DocumentAggregate.Models;

public record CatalogueDocumentsTypeOutput
{
  public Guid Guid { get; } = Guid.NewGuid();
  public string CatalogueTypeName { get; init; } = default!;
  public IEnumerable<CatalogueDocumentsPerContentCategoryGroupOutput> SubRows { get; init; } = Enumerable.Empty<CatalogueDocumentsPerContentCategoryGroupOutput>();
}
