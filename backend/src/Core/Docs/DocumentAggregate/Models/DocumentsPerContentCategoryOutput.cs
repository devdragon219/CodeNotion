using RealGimm.Core.Docs.DocumentAggregate;

namespace RealGimm.Core.Docs.DocumentAggregate.Models;

public record DocumentsPerContentCategoryOutput
{
  public Guid Guid { get; } = Guid.NewGuid();
  public ContentCategory ContentCategory { get; init; } = default!;
  public IEnumerable<Document> SubRows { get; init; } = Enumerable.Empty<Document>();
}
