using RealGimm.Core.Fclt.TicketAggregate;

namespace RealGimm.Web.Fclt.Models;

public record TicketsPerEstateUnit
{
  public int LocationEstateUnitId { get; set; }
  public Ticket[] Tickets { get; set; } = [];
}
