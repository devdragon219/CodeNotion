namespace RealGimm.Core.Docs.DocumentAggregate.Models;

public record EstateDocumentsOutput
{
  public Guid Guid { get; } = Guid.NewGuid();
  public string EstateInternalCode { get; init; } = default!;
  public IEnumerable<DocumentsPerContentCategoryGroupOutput> SubRows { get; init; } = Enumerable.Empty<DocumentsPerContentCategoryGroupOutput>();
}
