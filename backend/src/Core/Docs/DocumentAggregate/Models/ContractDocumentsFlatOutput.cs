using HotChocolate;
using RealGimm.Core.Docs.DocumentAggregate;

namespace RealGimm.Core.Docs.DocumentAggregate.Models;

public record ContractDocumentsFlatOutput
{
  [GraphQLIgnore]
  public int ContractId { get; init; }

  [GraphQLIgnore]
  public bool IsContractActive { get; init; }

  [GraphQLIgnore]
  public bool IsContractSublocated { get; init; }

  public string ContractInternalCode { get; init; } = default!;
  public string ContentCategoryGroup { get; init; } = default!;
  public Document Document { get; init; } = default!;
}
