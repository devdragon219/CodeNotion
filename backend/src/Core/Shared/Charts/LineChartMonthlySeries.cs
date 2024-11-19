namespace RealGimm.Core.Shared.Charts;

public record LineChartMonthlySeries<TDataPoint>
  where TDataPoint : ILineChartDataPoint<TDataPoint>
{
  public required int Year { get; init; }
  public required int Month { get; init; }
  public required TDataPoint DataPoint { get; init; }
}
