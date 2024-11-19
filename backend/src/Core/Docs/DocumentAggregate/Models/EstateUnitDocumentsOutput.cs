namespace RealGimm.Core.Docs.DocumentAggregate.Models;

public record EstateUnitDocumentsOutput
{
  public Guid Guid { get; } = Guid.NewGuid();
  public string EstateUnitInternalCode { get; init; } = default!;
  public IEnumerable<DocumentsPerContentCategoryGroupOutput> SubRows { get; init; } = Enumerable.Empty<DocumentsPerContentCategoryGroupOutput>();
}
