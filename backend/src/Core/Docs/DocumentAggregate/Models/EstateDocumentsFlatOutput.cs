using HotChocolate;
namespace RealGimm.Core.Docs.DocumentAggregate.Models;

public record EstateDocumentsFlatOutput
{
  [GraphQLIgnore]
  public int EstateItemId { get; init; }

  public string EstateInternalCode { get; init; } = default!;
  public string ContentCategoryGroup { get; init; } = default!;
  public Document Document { get; init; } = default!;
}
