using RealGimm.Core.Shared.Charts;

namespace RealGimm.Web.Fclt.Models;

public record TicketsCountLineChartDataPoint : ILineChartDataPoint<TicketsCountLineChartDataPoint>
{
  public required int TicketsCount { get; set; }

  public static TicketsCountLineChartDataPoint Zero => new() { TicketsCount = 0 };

  public static TicketsCountLineChartDataPoint operator +(
    TicketsCountLineChartDataPoint left,
    TicketsCountLineChartDataPoint right)
  {
    return new() { TicketsCount = left.TicketsCount + right.TicketsCount };
  }
}
