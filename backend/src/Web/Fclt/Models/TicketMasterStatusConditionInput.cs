using RealGimm.Core.Fclt.TicketAggregate;
using RealGimm.Core.Shared;

namespace RealGimm.Web.Fclt.Models;

public record TicketMasterStatusConditionInput : TicketConditionInput
{
  public TicketMasterStatus TargetMasterStatus { get; set; }
  public int CalendarId { get; set; }
  public ComparisonOperator TimeComparisonOperator { get; set; }
  public int? MinTimePeriodInMinutes { get; set; }
  public int? MaxTimePeriodInMinutes { get; set; }
}
