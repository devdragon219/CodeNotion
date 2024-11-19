namespace RealGimm.Core.Extensions;

public static class DoubleExtensions
{
  public static double Round2(this double value) => double.Round(value, 2);
  
  public static double? Round2(this double? value)
  {
    if (value is null)
    {
      return null;
    }

    return value.Value.Round2();
  }

  public static double? ToPercentageOrNull(this double? value, double total)
  {
    if (value is null)
    {
      return null;
    }

    return (value / total) * 100;
  }
}
