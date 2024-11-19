namespace RealGimm.Core.Shared.Charts;

public record LineChart<TDataPoint>
  where TDataPoint : ILineChartDataPoint<TDataPoint>
{
  public LineChartDailySeries<TDataPoint>[]? Daily { get; }
  public LineChartWeeklySeries<TDataPoint>[]? Weekly { get; }
  public LineChartMonthlySeries<TDataPoint>[]? Monthly { get; }

  public LineChart(IEnumerable<LineChartDailySeries<TDataPoint>> daily)
  {
    Daily = daily?.ToArray() ?? throw new ArgumentNullException(nameof(daily));
  }

  public LineChart(IEnumerable<LineChartWeeklySeries<TDataPoint>> weekly)
  {
    Weekly = weekly?.ToArray() ?? throw new ArgumentNullException(nameof(weekly));
  }

  public LineChart(IEnumerable<LineChartMonthlySeries<TDataPoint>> monthly)
  {
    Monthly = monthly?.ToArray() ?? throw new ArgumentNullException(nameof(monthly));
  }
}
