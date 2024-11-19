using System.Globalization;
using System.Numerics;
using RealGimm.Core.Shared.Charts;

namespace RealGimm.Core.Extensions;

public static class EnumerableExtensions
{
  public static TNumber? SumOrNull<TSource, TNumber>(this IEnumerable<TSource> source, Func<TSource, TNumber?> selector)
    where TNumber : struct, INumber<TNumber>
  {
    var sum = TNumber.Zero;
    var isAnyNonNullValue = false;

    var enumerator = source.GetEnumerator();
    while (enumerator.MoveNext())
    {
      var value = selector(enumerator.Current);
      if (!value.HasValue)
      {
        continue;
      }

      sum += value.Value;
      isAnyNonNullValue = true;
    }

    return isAnyNonNullValue ? sum : null;
  }

  public static T? SumOrNull<T>(this IEnumerable<T?> source)
    where T : struct, INumber<T>
    => source.SumOrNull(item => item);
    
  public static IEnumerable<(T1?, T2?)> ZipLongest<T1, T2>(
    this IEnumerable<T1> first,
    IEnumerable<T2> second,
    T1? defaultFirst = default,
    T2? defaultSecond = default)
  {
    using var enumerator1 = first.GetEnumerator();
    using var enumerator2 = second.GetEnumerator();
    bool moveNext1;
    bool moveNext2;

    while ((moveNext1 = enumerator1.MoveNext()) | (moveNext2 = enumerator2.MoveNext()))
    {
      yield return (
        moveNext1 ? enumerator1.Current : defaultFirst, 
        moveNext2 ? enumerator2.Current : defaultSecond);
    }
  }

  public static IEnumerable<IGrouping<(int Year, int Week), T>> GroupByWeek<T>(
    this IEnumerable<T> source,
    Func<T, DateOnly> selector)
  {
    return source
      .GroupBy(item =>
      {
        var date = selector(item);
        var week = ISOWeek.GetWeekOfYear(date.ToDateTime(TimeOnly.MinValue));
        var year = ISOWeek.GetYear(date.ToDateTime(TimeOnly.MinValue));

        return (Year: year, Week: week);
      });
  }
  
  public static IEnumerable<IGrouping<(int Year, int Month), T>> GroupByMonth<T>(
    this IEnumerable<T> source,
    Func<T, DateOnly> selector)
  {
    return source
      .GroupBy(item =>
      {
        var date = selector(item);
        var month = date.Month;
        var year = date.Year;

        return (Year: year, Month: month);
      });
  }

  public static TDataPoint Sum<TSource, TDataPoint>(
    this IEnumerable<TSource> source,
    Func<TSource, TDataPoint> selector)
    where TDataPoint : ILineChartDataPoint<TDataPoint>
  {
    ArgumentNullException.ThrowIfNull(source);
    
    TDataPoint sum = TDataPoint.Zero;

    foreach (var item in source)
    {
      sum += selector(item);
    }

    return sum;
  }

  public static TSource Sum<TSource>(this IEnumerable<TSource> source)
    where TSource : ILineChartDataPoint<TSource>
    => source.Sum(dataPoint => dataPoint);
}
