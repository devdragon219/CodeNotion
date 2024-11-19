using RealGimm.Core.Fclt.TicketChecklistAggregate;

namespace RealGimm.Core.Extensions;

public static class DateOnlyExtensions
{
  public static DateOnly NearestDay(this DateOnly date, DayOfWeek dayOfWeek)
  {
    var daysDifference = (dayOfWeek - date.DayOfWeek + 7) % 7;
    return date.AddDays(daysDifference);
  }

  public static DateOnly NearestDay(this DateOnly date, DayOfWeek[] daysOfWeek, bool includeCurrentDay = true)
  {
    var minDaysDifference = daysOfWeek.Min(dayOfWeek =>
    {
      var daysDifference = (dayOfWeek - date.DayOfWeek + 7) % 7;

      // if the current day is not included and matches, add 7 to find the next occurrence
      if (!includeCurrentDay && daysDifference == 0)
      {
        daysDifference = 7;
      }

      return daysDifference;
    });

    return date.AddDays(minDaysDifference);
  }

  public static DateOnly FirstDayOfMonth(this DateOnly date) => new(date.Year, date.Month, 01);

  public static DateOnly GetNextPlannedDate(this DateOnly date, PlannedPeriod plannedPeriod, DayOfWeek[]? daysOfWeek)
  {
    return plannedPeriod switch
    {
      PlannedPeriod.Daily => date.AddDays(1),
      PlannedPeriod.Midweek => date.NearestDay(daysOfWeek!, includeCurrentDay: false),
      PlannedPeriod.Weekly => date.AddDays(7),
      PlannedPeriod.Biweekly => date.AddDays(7 * 2),
      PlannedPeriod.ThriceWeekly => date.AddDays(7 * 3),
      PlannedPeriod.Monthly => date.AddMonths(1).FirstDayOfMonth(),
      PlannedPeriod.Bimonthly => date.AddMonths(2).FirstDayOfMonth(),
      PlannedPeriod.Quarterly => date.AddMonths(3).FirstDayOfMonth(),
      PlannedPeriod.EveryFourMonths => date.AddMonths(4).FirstDayOfMonth(),
      PlannedPeriod.Semiannual => date.AddMonths(6).FirstDayOfMonth(),
      PlannedPeriod.Annual => date.AddYears(1).FirstDayOfMonth(),

      _ => throw new ArgumentOutOfRangeException(nameof(plannedPeriod), plannedPeriod, null),
    };
  }
}
