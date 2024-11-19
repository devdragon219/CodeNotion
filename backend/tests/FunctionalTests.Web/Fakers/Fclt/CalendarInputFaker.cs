using Bogus;
using RealGimm.Core.Fclt.CalendarAggregate;
using RealGimm.Infrastructure;
using RealGimm.Web.Fclt.Models;

namespace RealGimm.FunctionalTests.Web.Fakers.Fclt;

public sealed class CalendarInputFaker : BaseSeededFaker<CalendarInput>
{
  private static readonly string[] _timeZones = TimeZoneInfo
    .GetSystemTimeZones()
    .Select(timeZone => timeZone.Id)
    .ToArray();

  private int _generatedInputsCount = 0;

  public CalendarInputFaker() : base(seed: 1)
  {
    CustomInstantiator(faker =>
    {
      var calendar = new CalendarInput
      {
        Name = $"Calendar {_generatedInputsCount}",
        TimeZoneId = faker.PickRandom(_timeZones)
      };

      var totalDayHours = faker.PickRandom(8, 9, 10);
      var lunchBreakMinutes = faker.Random.Bool() ? (int?)null : faker.PickRandom(15, 30, 60);
      var dayStartHour = faker.PickRandom(6, 7, 8, 9);

      calendar.Monday = CreateDayInput(totalDayHours, lunchBreakMinutes, dayStartHour);
      calendar.Tuesday = CreateDayInput(totalDayHours, lunchBreakMinutes, dayStartHour);
      calendar.Wednesday = CreateDayInput(totalDayHours, lunchBreakMinutes, dayStartHour);
      calendar.Thursday = CreateDayInput(totalDayHours, lunchBreakMinutes, dayStartHour);
      calendar.Friday = CreateDayInput(totalDayHours, lunchBreakMinutes, dayStartHour);

      if (faker.Random.Bool())
      {
        calendar.Saturday = CreateDayInput(totalDayHours, lunchBreakMinutes, dayStartHour);
      }

      var holidays = Enumerable.Range(0, faker.Random.Int(10, 20)).Select(_ => GenerateHolidayInput(faker));
      calendar.Holidays = holidays.ToArray();

      return calendar;
    });

    FinishWith((faker, calendar) =>
    {
      EnsureValid(calendar);
      _generatedInputsCount++;
    });
  }

  private static CalendarDayInput CreateDayInput(int totalHours, int? lunchBreakMinutes, int startHour)
  {
    var dayInput = new CalendarDayInput();

    if (lunchBreakMinutes is null)
    {
      var timeRangeInput = new TimeRangeInput()
      {
        Since = new TimeOnly(startHour, 00)
      };

      timeRangeInput.Until = timeRangeInput.Since.AddHours(totalHours);

      dayInput.TimeRanges = [timeRangeInput];

      return dayInput;
    }

    var firstHalfDurationHours = totalHours / 2;
    var secondHalfDurationHours = totalHours - firstHalfDurationHours;

    var firstHalfInput = new TimeRangeInput()
    {
      Since = new TimeOnly(startHour, 00)
    };

    firstHalfInput.Until = firstHalfInput.Since.AddHours(firstHalfDurationHours);

    var seconfHalfInput = new TimeRangeInput()
    {
      Since = firstHalfInput.Until.AddHours(lunchBreakMinutes.Value)
    };

    seconfHalfInput.Until = seconfHalfInput.Since.AddHours(secondHalfDurationHours);

    dayInput.TimeRanges = [firstHalfInput, seconfHalfInput];

    return dayInput;
  }

  private static HolidayInput GenerateHolidayInput(Faker faker)
  {
    var holidayInput = new HolidayInput
    {
      Name = faker.Lorem.Sentence(wordCount: 2),
      Date = faker.Date.BetweenDateOnly(new DateOnly(2022, 1, 1), new DateOnly(2024, 12, 31)),
      Periodicity = faker.PickRandom<HolidayPeriodicity>()
    };

    return holidayInput;
  }
}
