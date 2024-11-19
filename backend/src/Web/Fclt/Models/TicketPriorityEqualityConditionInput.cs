using RealGimm.Core.Fclt.TicketAggregate;
using RealGimm.Core.Shared;

namespace RealGimm.Web.Fclt.Models;

public record TicketPriorityEqualityConditionInput : TicketConditionInput
{
  public EqualityOperator Operator { get; set; }
  public Priority TargetPriority { get; set; }
}

