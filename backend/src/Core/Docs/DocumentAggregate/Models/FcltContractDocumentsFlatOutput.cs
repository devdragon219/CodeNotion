using HotChocolate;

namespace RealGimm.Core.Docs.DocumentAggregate.Models;

public record FcltContractDocumentsFlatOutput
{
  [GraphQLIgnore]
  public int FcltContractId { get; init; }

  public string FcltContractInternalCode { get; init; } = default!;
  public string ContentCategoryGroup { get; init; } = default!;
  public Document Document { get; init; } = default!;
}
