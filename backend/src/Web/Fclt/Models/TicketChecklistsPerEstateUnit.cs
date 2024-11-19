using RealGimm.Core.Fclt.TicketChecklistAggregate;

namespace RealGimm.Web.Fclt.Models;

public class TicketChecklistsPerEstateUnit
{
  public required int EstateUnitId { get; set; }
  public required TicketChecklist[] TicketChecklists { get; set; }
}
