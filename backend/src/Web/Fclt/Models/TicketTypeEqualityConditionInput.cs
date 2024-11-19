using RealGimm.Core.Shared;

namespace RealGimm.Web.Fclt.Models;

public record TicketTypeEqualityConditionInput : TicketConditionInput
{
  public EqualityOperator Operator { get; set; }
  public int TargetTicketTypeId { get; set; }
}
