using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Web.Fclt.Models;

public abstract record TicketConditionInput : IMaybeIdentifiable
{
  public int? Id { get; set; }
}
