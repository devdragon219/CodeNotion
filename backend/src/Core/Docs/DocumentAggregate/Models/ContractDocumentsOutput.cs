namespace RealGimm.Core.Docs.DocumentAggregate.Models;

public record ContractDocumentsOutput
{
  public Guid Guid { get; } = Guid.NewGuid();
  public string ContractInternalCode { get; init; } = default!;
  public IEnumerable<ContractDocumentsPerContentCategoryGroupOutput> SubRows { get; init; } = Enumerable.Empty<ContractDocumentsPerContentCategoryGroupOutput>();
}
