namespace RealGimm.Core.Docs.DocumentAggregate.Models;

public record ContractDocumentsPerContentCategoryGroupOutput
{
  public Guid Guid { get; } = Guid.NewGuid();
  public string ContentCategoryGroup { get; init; } = default!;
  public IEnumerable<ContractDocumentsPerContentCategoryOutput> SubRows { get; init; } = Enumerable.Empty<ContractDocumentsPerContentCategoryOutput>();
}
