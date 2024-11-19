using System.Globalization;

namespace RealGimm.Core.Shared.Charts;

public record LineChartWeeklySeries<TDataPoint>
  where TDataPoint : ILineChartDataPoint<TDataPoint>
{
  public required int Year { get; init; }
  public required int Week { get; init; }
  public DateOnly WeekStartDate => ISOWeek.ToDateTime(Year, Week, DayOfWeek.Monday).ToDateOnly();
  public DateOnly WeekEndDate => ISOWeek.ToDateTime(Year, Week, DayOfWeek.Saturday).ToDateOnly();
  public required TDataPoint DataPoint { get; init; }
 }
