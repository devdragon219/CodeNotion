namespace RealGimm.Core.Shared.Charts;

public record LineChartDailySeries<TDataPoint>
  where TDataPoint : ILineChartDataPoint<TDataPoint>
{
  public required DateOnly Date { get; init; }
  public required TDataPoint DataPoint { get; init; }
}
