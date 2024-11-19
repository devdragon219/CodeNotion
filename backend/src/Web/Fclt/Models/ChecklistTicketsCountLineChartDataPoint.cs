using RealGimm.Core.Shared.Charts;

namespace RealGimm.Web.Fclt.Models;

public record ChecklistTicketsCountLineChartDataPoint : ILineChartDataPoint<ChecklistTicketsCountLineChartDataPoint>
{
  public required int PreventiveCount { get; init; }
  public required int OnTriggerConditionCount { get; init; }

  public static ChecklistTicketsCountLineChartDataPoint Zero { get; } = new()
  {
    PreventiveCount = 0,
    OnTriggerConditionCount = 0
  };

  public static ChecklistTicketsCountLineChartDataPoint operator +(
    ChecklistTicketsCountLineChartDataPoint left,
    ChecklistTicketsCountLineChartDataPoint right)
  {
    return new()
    {
      PreventiveCount = left.PreventiveCount + right.PreventiveCount,
      OnTriggerConditionCount = left.OnTriggerConditionCount + right.OnTriggerConditionCount
    };
  }
}
