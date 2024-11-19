using HotChocolate;
using RealGimm.Core.Docs.DocumentAggregate;

namespace RealGimm.Core.Docs.DocumentAggregate.Models;

public record ContractDocumentOutput
{
  [GraphQLIgnore]
  public Document Document { get; init; } = default!;

  public bool IsContractSublocated { get; init; } = default!;
  public bool IsContractActive { get; init; } = default!;
  public string CmisId { get; init; } = default!;
  public string? EntityId { get; init; }
  public int? EntityIntId { get; init; }
  public string Name { get; init; } = default!;
  public string? FileName { get; init; }
  public DateTime? Since { get; init; }
  public DateTime? Until { get; init; }
  public string? ProtocolNumber { get; init; }
  public DateOnly? IssueDate { get; init; }
  public string? Issuer { get; init; }
  public string? UploaderName { get; init; }
  public DateTime CreationDate { get; init; }
  public string? Notes { get; init; }
}
