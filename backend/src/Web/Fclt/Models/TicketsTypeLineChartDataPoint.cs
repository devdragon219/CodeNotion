using RealGimm.Core.Shared.Charts;

namespace RealGimm.Web.Fclt.Models;

public record TicketsTypeLineChartDataPoint : ILineChartDataPoint<TicketsTypeLineChartDataPoint>
{
  public required int IssuesCount { get; set; }
  public required int PreventiveCount { get; set; }
  public required int OnTriggerConditionCount { get; set; }

  public static TicketsTypeLineChartDataPoint Zero => new()
  {
    IssuesCount = 0,
    PreventiveCount = 0,
    OnTriggerConditionCount = 0
  };

  public static TicketsTypeLineChartDataPoint operator +(
    TicketsTypeLineChartDataPoint left,
    TicketsTypeLineChartDataPoint right)
  {
    return new()
    {
      IssuesCount = left.IssuesCount + right.IssuesCount,
      PreventiveCount = left.PreventiveCount + right.PreventiveCount,
      OnTriggerConditionCount = left.OnTriggerConditionCount + right.OnTriggerConditionCount
    };
  }
}
