using HotChocolate;
using RealGimm.Core.Docs.DocumentAggregate;

namespace RealGimm.Core.Docs.DocumentAggregate.Models;

public record EstateUnitDocumentsFlatOutput
{
  [GraphQLIgnore]
  public int EstateUnitId { get; init; }

  public string EstateUnitInternalCode { get; init; } = default!;
  public string ContentCategoryGroup { get; init; } = default!;
  public Document Document { get; init; } = default!;
}
