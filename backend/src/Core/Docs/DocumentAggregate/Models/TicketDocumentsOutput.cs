namespace RealGimm.Core.Docs.DocumentAggregate.Models;

public record TicketDocumentsOutput
{
  public Guid Guid { get; } = Guid.NewGuid();
  public string TicketInternalCode { get; init; } = default!;
  public bool IsTicketExcludedFromMaintenanceContract { get; init; }
  public IEnumerable<Document> SubRows { get; init; } = [];
}
