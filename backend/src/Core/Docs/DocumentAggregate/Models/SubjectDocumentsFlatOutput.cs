using HotChocolate;
using RealGimm.Core.Docs.DocumentAggregate;

namespace RealGimm.Core.Docs.DocumentAggregate.Models;

public record SubjectDocumentsFlatOutput
{
  [GraphQLIgnore]
  public int SubjectId { get; init; }

  public string SubjectName { get; init; } = default!;
  public string SubjectInternalCode { get; init; } = default!;
  public Document Document { get; init; } = default!;
}
