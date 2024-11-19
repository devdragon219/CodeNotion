using HotChocolate;

namespace RealGimm.Core.Docs.DocumentAggregate.Models;

public record TicketDocumentsFlatOutput
{
  [GraphQLIgnore]
  public int TicketId { get; init; }

  public string TicketInternalCode { get; init; } = default!;
  public bool IsTicketExcludedFromMaintenanceContract { get; init; }
  public Document Document { get; init; } = default!;
}
