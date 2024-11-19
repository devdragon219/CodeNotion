using RealGimm.Core.Fclt.CalendarAggregate;

namespace RealGimm.Core.Extensions;

public static class TimeOnlyRangedExtensions
{
  public static bool ContainsOverlaps(this IEnumerable<TimeRange> source)
  {
    var sortedList = source.OrderBy(item => item.Since).ThenBy(item => item.Until).ToArray();

    for (int i = 1; i < sortedList.Length; i++)
    {
      var previous = sortedList[i - 1];
      var current = sortedList[i];

      if (previous.Until > current.Since)
      {
        return true;
      }
    }

    return false;
  }
}
