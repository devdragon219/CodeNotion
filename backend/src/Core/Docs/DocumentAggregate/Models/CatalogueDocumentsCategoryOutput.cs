namespace RealGimm.Core.Docs.DocumentAggregate.Models;

public record CatalogueDocumentsCategoryOutput
{
  public Guid Guid { get; } = Guid.NewGuid();
  public string CategoryName { get; init; } = default!;
  public IEnumerable<CatalogueDocumentsSubCategoryOutput> SubRows { get; init; } = Enumerable.Empty<CatalogueDocumentsSubCategoryOutput>();
}
