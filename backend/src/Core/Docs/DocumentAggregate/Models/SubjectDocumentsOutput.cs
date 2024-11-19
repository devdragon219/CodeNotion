namespace RealGimm.Core.Docs.DocumentAggregate.Models;

public record SubjectDocumentsOutput
{
  public Guid Guid { get; } = Guid.NewGuid();
  public string SubjectName { get; init; } = default!;
  public string SubjectInternalCode { get; init; } = default!;
  public IEnumerable<Document> SubRows { get; init; } = [];
}
