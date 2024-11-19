using Bogus;
using RealGimm.Core.Fclt.CalendarAggregate;

namespace RealGimm.Infrastructure.Fclt.Data.Fakers;

public sealed class CalendarFaker : BaseSeededFaker<Calendar>
{
  private static readonly string[] _timeZones = TimeZoneInfo
    .GetSystemTimeZones()
    .Select(timeZone => timeZone.Id)
    .ToArray();

  private int _generatedObjectsCount = 0;

  public CalendarFaker()
  {
    CustomInstantiator(faker =>
    {
      var calendar = new Calendar();
      calendar.SetName($"Calendar {_generatedObjectsCount}");
      calendar.SetTimeZoneId(faker.PickRandom(_timeZones));

      var totalDayHours = faker.PickRandom(8, 9, 10);
      var lunchBreakMinutes = faker.Random.Bool() ? (int?)null : faker.PickRandom(15, 30, 60);
      var dayStartHour = faker.PickRandom(6, 7, 8, 9);

      var workingDaysOfWeek = new List<DayOfWeek>
      {
        DayOfWeek.Monday,
        DayOfWeek.Tuesday,
        DayOfWeek.Wednesday,
        DayOfWeek.Thursday,
        DayOfWeek.Friday
      };

      if (faker.Random.Bool())
      {
        workingDaysOfWeek.Add(DayOfWeek.Saturday);
      }

      var days = workingDaysOfWeek.Select(dayOfWeek => CreateDay(dayOfWeek, totalDayHours, lunchBreakMinutes, dayStartHour));
      calendar.Days.AddRange(days);

      var holidays = Enumerable.Range(0, faker.Random.Int(10, 20)).Select(_ => GenerateHoliday(faker));
      calendar.Holidays.AddRange(holidays);

      return calendar;
    });

    FinishWith((faker, calendar) =>
    {
      EnsureValid(calendar);
      _generatedObjectsCount++;
    });
  }

  private static CalendarDay CreateDay(DayOfWeek dayOfWeek, int totalHours, int? lunchBreakMinutes, int startHour)
  {
    var day = new CalendarDay();
    day.SetDayOfWeek(dayOfWeek);

    if (lunchBreakMinutes is null)
    {
      var timeRange = new TimeRange();
      timeRange.SetSince(new TimeOnly(startHour, 00));
      timeRange.SetUntil(timeRange.Since.AddHours(totalHours));

      day.TimeRanges.Add(timeRange);

      return day;
    }

    var firstHalfDurationHours = totalHours / 2;
    var secondHalfDurationHours = totalHours - firstHalfDurationHours;

    var firstHalf = new TimeRange();
    firstHalf.SetSince(new TimeOnly(startHour, 00));
    firstHalf.SetUntil(firstHalf.Since.AddHours(firstHalfDurationHours));

    var seconfHalf = new TimeRange();
    seconfHalf.SetSince(firstHalf.Until.AddHours(lunchBreakMinutes.Value));
    seconfHalf.SetUntil(seconfHalf.Since.AddHours(secondHalfDurationHours));

    day.TimeRanges.AddRange([firstHalf, seconfHalf]);

    return day;
  }

  private static Holiday GenerateHoliday(Faker faker)
  {
    var holiday = new Holiday();
    holiday.SetName(faker.Lorem.Sentence(wordCount: 2));
    holiday.SetDate(faker.Date.BetweenDateOnly(new DateOnly(2022, 1, 1), new DateOnly(2024, 12, 31)));
    holiday.SetPeriodicity(faker.PickRandom<HolidayPeriodicity>());

    return holiday;
  }
}
