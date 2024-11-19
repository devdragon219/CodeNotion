namespace RealGimm.Core.Extensions;

public static class IntExtensions
{
  public static double ToPercentage(this int value, double total)
  {
    ArgumentOutOfRangeException.ThrowIfLessThanOrEqual(total, 0);
    return (value / total) * 100;
  }

  public static double? ToPercentageOrNull(this int value, double total)
  {
    ArgumentOutOfRangeException.ThrowIfLessThan(total, 0);

    if (total == 0)
    {
      return null;
    }

    return (value / total) * 100;
  }
}
