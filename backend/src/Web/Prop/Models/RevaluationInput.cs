using RealGimm.Core.Prop.ContractAggregate;

namespace RealGimm.Web.Prop.Models;

public sealed record RevaluationInput
{
  public int RevaluationPeriodMonths { get; set; }
  public bool IsAbsoluteRevaluationApplied { get; set; }
  public bool IsRevaluationCalculated { get; set; }
  public DateOnly ReferencePeriodStart { get; set; }
  public DateOnly ReferencePeriodEnd { get; set; }
  public decimal RevaluationSharePercent { get; set; }
  public RevaluationRateType RateType { get; set; }
  public decimal? BaseRevaluationRate { get; set; }
  public DateOnly NextApplicationDate { get; set; }
  public bool IsBackHistoryEnabled { get; set; }
}
