namespace RealGimm.Core.Docs.DocumentAggregate.Models;

public record DocumentsPerContentCategoryGroupOutput
{
  public Guid Guid { get; } = Guid.NewGuid();
  public string ContentCategoryGroup { get; init; } = default!;
  public IEnumerable<DocumentsPerContentCategoryOutput> SubRows { get; init; } = Enumerable.Empty<DocumentsPerContentCategoryOutput>();
}
