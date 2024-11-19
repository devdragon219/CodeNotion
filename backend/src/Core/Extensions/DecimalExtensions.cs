using RealGimm.Core.Shared;

namespace RealGimm.Core.Extensions;

public static class DecimalExtensions
{
  public static decimal Round2(this decimal value) => decimal.Round(value, 2);
  
  public static decimal? Round2(this decimal? value)
    => value is null ? null : decimal.Round(value.Value, 2);

  public static double ToPercentage(this decimal value, decimal total)
  {
    ArgumentOutOfRangeException.ThrowIfLessThanOrEqual(total, 0);

    return (double)((value / total) * 100);
  }

  public static Trend TrendRelativeTo(this decimal value, decimal oldValue)
  {
    if (value > oldValue)
    {
      return Trend.Up;
    }
    else if (value < oldValue)
    {
      return Trend.Down;
    }
    else
    {
      return Trend.Same;
    }
  }
}
