using RealGimm.Core.Docs.DocumentAggregate;

namespace RealGimm.Core.Docs.DocumentAggregate.Models;

public record ContractDocumentsPerContentCategoryOutput
{
  public Guid Guid { get; } = Guid.NewGuid();
  public ContentCategory ContentCategory { get; init; } = default!;
  public IEnumerable<ContractDocumentOutput> SubRows { get; init; } = Enumerable.Empty<ContractDocumentOutput>();
}
