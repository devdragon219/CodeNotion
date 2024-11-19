namespace RealGimm.Core.Docs.DocumentAggregate.Models;

public record CatalogueDocumentsSubCategoryOutput
{
  public Guid Guid { get; } = Guid.NewGuid();
  public string? SubCategoryName { get; init; }
  public IEnumerable<CatalogueDocumentsTypeOutput> SubRows { get; init; } = Enumerable.Empty<CatalogueDocumentsTypeOutput>();
}
