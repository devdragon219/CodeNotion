using RealGimm.Core.Fclt.TicketAggregate;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Web.Fclt.Models;

public record PerformedActivityInput : IMaybeIdentifiable
{
  public int? Id { get; set; }
  public PerformedActivityStatus Status { get; set; }
}
