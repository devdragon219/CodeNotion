using RealGimm.Core.Asst.CatalogueItemAggregate;

namespace RealGimm.Core.Docs.DocumentAggregate.Models;

public record CatalogueDocumentsOutput
{
  public Guid Guid { get; } = Guid.NewGuid();
  public string EstateInternalCode { get; init; } = default!;
  public IEnumerable<CatalogueDocumentsCategoryOutput> SubRows { get; init; } = Enumerable.Empty<CatalogueDocumentsCategoryOutput>();
}
