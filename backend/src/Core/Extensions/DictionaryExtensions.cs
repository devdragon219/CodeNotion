using System.Globalization;
using RealGimm.Core.Shared;
using RealGimm.Core.Shared.Charts;

namespace RealGimm.Core.Extensions;

public static class DictionaryExtensions
{
  public static Dictionary<TKey, double>? ToPercentageDistribution<TKey>(
    this IDictionary<TKey, int> source)
    where TKey : notnull
    => source.ToPercentageDistribution(pair => pair.Value);

  public static Dictionary<TKey, double>? ToPercentageDistribution<TKey, TValue>(
    this IDictionary<TKey, TValue> source,
    Func<KeyValuePair<TKey, TValue>, double> valueSelector)
    where TKey : notnull
  {
    var transformed = source
      .Select(pair => new KeyValuePair<TKey, double>(pair.Key, valueSelector(pair)))
      .ToDictionary(pair => pair.Key, pair => pair.Value);

    if (transformed.Values.Any(value => value < 0))
    {
      throw new InvalidOperationException("Values must be non-negative.");
    }

    if (!source.Any())
    {
      return null;
    }

    var totalSum = transformed.Values.Sum();
    if (totalSum == 0)
    {
      return null;
    }

    return source.ToDictionary(pair => pair.Key, pair => (valueSelector(pair) / totalSum * 100).Round2());
  }

  public static Dictionary<TKey, TValue> FillMissingKeys<TKey, TValue>(
    this IDictionary<TKey, TValue> source,
    IEnumerable<TKey> allKeys,
    TValue defaultValue)
    where TKey : notnull
  {
    var result = allKeys.ToDictionary(
      key => key,
      key => source.TryGetValue(key, out TValue? value) ? value : defaultValue);

    return result;
  }

  public static LineChart<TDataPoint> ToLineChart<TDataPoint>(
    this IDictionary<DateOnly, TDataPoint> source,
    DateOnly startDate,
    DateOnly endDate,
    LineChartType chartType)
    where TDataPoint : ILineChartDataPoint<TDataPoint>
  {
    switch (chartType)
    {
      case LineChartType.Daily:
      {
        var allDates = Enumerable
          .Range(0, endDate.DayNumber - startDate.DayNumber + 1)
          .Select(startDate.AddDays);

        var dailySeries = source
          .FillMissingKeys(allDates, TDataPoint.Zero)
          .Select(pair => new LineChartDailySeries<TDataPoint>
          {
            Date = pair.Key,
            DataPoint = pair.Value
          });

        return new LineChart<TDataPoint>(dailySeries);
      }
      
      case LineChartType.Weekly:
      {
        var allWeeks = Enumerable
          .Range(0, (endDate.DayNumber - startDate.DayNumber) / 7 + 1)
          .Select(offset => startDate.AddDays(offset * 7))
          .Select(date =>
            (Year: ISOWeek.GetYear(date.ToDateTime(TimeOnly.MinValue)),
            Week: ISOWeek.GetWeekOfYear(date.ToDateTime(TimeOnly.MinValue))));

        var weeklySeries = source
          .GroupByWeek(pair => pair.Key)
          .ToDictionary(
            group => group.Key,
            group => group.Sum(group => group.Value))
          .FillMissingKeys(allWeeks, TDataPoint.Zero)
          .Select(group => new LineChartWeeklySeries<TDataPoint>
          {
            Year = group.Key.Year,
            Week = group.Key.Week,
            DataPoint = group.Value
          });

        return new LineChart<TDataPoint>(weeklySeries);
      }
      
      case LineChartType.Monthly:
      {
        var allMonths = Enumerable
          .Range(0, (endDate.Year - startDate.Year) * 12 + endDate.Month - startDate.Month + 1)
          .Select(startDate.AddMonths)
          .Select(date => (date.Year, date.Month));

        var monthlySeries = source
          .GroupByMonth(pair => pair.Key)
          .ToDictionary(
            group => group.Key,
            group => group.Sum(group => group.Value))
          .FillMissingKeys(allMonths, TDataPoint.Zero)
          .Select(group => new LineChartMonthlySeries<TDataPoint>
          {
            Year = group.Key.Year,
            Month = group.Key.Month,
            DataPoint = group.Value
          });

        return new LineChart<TDataPoint>(monthlySeries);
      }

      default:
        throw new ArgumentOutOfRangeException(nameof(chartType), chartType, null);
    }
  }
}
