using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core;

public static class DateTimeRangedExtensions
{
  public static bool IsStillValid(this IDateOnlyRanged source)
  {
    return !source.Until.HasValue || source.Until.Value > DateOnly.FromDateTime(DateTime.UtcNow);
  }

  public static bool ContainsOverlaps(this IEnumerable<IDateOnlyRanged> source)
  {
    var sortedList = source.OrderBy(item => item.Since).ThenBy(item => item.Until).ToArray();

    for (int i = 1; i < sortedList.Length; i++)
    {
      var previous = sortedList[i - 1];
      var current = sortedList[i];

      // checking for open-ended date ranges
      if (!current.Since.HasValue || !previous.Until.HasValue)
      {
        return true;
      }

      if (previous.Until > current.Since)
      {
        return true;
      }
    }

    return false;
  }
}
