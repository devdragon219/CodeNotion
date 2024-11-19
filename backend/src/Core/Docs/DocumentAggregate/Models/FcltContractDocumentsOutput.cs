namespace RealGimm.Core.Docs.DocumentAggregate.Models;

public record FcltContractDocumentsOutput
{
  public Guid Guid { get; } = Guid.NewGuid();
  public string FcltContractInternalCode { get; init; } = default!;
  public IEnumerable<DocumentsPerContentCategoryGroupOutput> SubRows { get; init; } = [];
}
