using RealGimm.SharedKernel.Attributes;
using System.ComponentModel.DataAnnotations;
using RealGimm.SharedKernel.Interfaces;
using HotChocolate;
using Ardalis.Result;

namespace RealGimm.Core.Fclt.CalendarAggregate;

public class Calendar : EntityBase, IAggregateRoot
{
  [FuzzySearchable, MaxLength(StrFieldSizes.NAME), Required]
  public string Name { get; private set; } = default!;

  [FuzzySearchable, MaxLength(StrFieldSizes.TIME_ZONE_ID), Required]
  public string TimeZoneId { get; private set; } = default!;

  [GraphQLIgnore]
  public TimeZoneInfo TimeZoneInfo => TimeZoneInfo.FindSystemTimeZoneById(TimeZoneId);

  public CalendarDay? Sunday => Days.SingleOrDefault(day => day.DayOfWeek == DayOfWeek.Sunday);
  public CalendarDay? Monday => Days.SingleOrDefault(day => day.DayOfWeek == DayOfWeek.Monday);
  public CalendarDay? Tuesday => Days.SingleOrDefault(day => day.DayOfWeek == DayOfWeek.Tuesday);
  public CalendarDay? Wednesday => Days.SingleOrDefault(day => day.DayOfWeek == DayOfWeek.Wednesday);
  public CalendarDay? Thursday => Days.SingleOrDefault(day => day.DayOfWeek == DayOfWeek.Thursday);
  public CalendarDay? Friday => Days.SingleOrDefault(day => day.DayOfWeek == DayOfWeek.Friday);
  public CalendarDay? Saturday => Days.SingleOrDefault(day => day.DayOfWeek == DayOfWeek.Saturday);

  [GraphQLIgnore]
  public NullSafeCollection<CalendarDay> Days { get; private set; } = [];

  public NullSafeCollection<Holiday> Holidays { get; private set; } = [];

  public void SetName(string name) => Name = name;

  public void SetTimeZoneId(string timeZoneId) => TimeZoneId = timeZoneId;

  [GraphQLIgnore]
  public DateTime CalculateEndTime(DateTime startDateTime, TimeSpan duration)
  {
    var timeZone = TimeZoneInfo;
    var currentDateTime = TimeZoneInfo.ConvertTime(startDateTime, timeZone);
    var remainingDuration = duration;

    while (remainingDuration > TimeSpan.Zero)
    {
      var currentDay = Days.SingleOrDefault(day => day.DayOfWeek == currentDateTime.DayOfWeek);

      if (currentDay != null && !IsHoliday(currentDateTime))
      {
        foreach (var timeRange in currentDay.TimeRanges.OrderBy(timeRange => timeRange.Since))
        {
          var workStartTime = DateTime.SpecifyKind(
            currentDateTime.Date.Add(timeRange.Since.ToTimeSpan()),
            DateTimeKind.Unspecified);

          var workEndTime = DateTime.SpecifyKind(
            currentDateTime.Date.Add(timeRange.Until.ToTimeSpan()),
            DateTimeKind.Unspecified);

          workStartTime = TimeZoneInfo.ConvertTimeToUtc(workStartTime, timeZone);
          workEndTime = TimeZoneInfo.ConvertTimeToUtc(workEndTime, timeZone);

          if (currentDateTime < workEndTime)
          {
            var timeLeftInWorkRange = workEndTime - currentDateTime;
            var timeToAdd = remainingDuration <= timeLeftInWorkRange ? remainingDuration : timeLeftInWorkRange;

            currentDateTime = currentDateTime.Add(timeToAdd);
            remainingDuration -= timeToAdd;

            if (remainingDuration == TimeSpan.Zero)
            {
              return TimeZoneInfo.ConvertTimeFromUtc(currentDateTime, timeZone);
            }
          }
        }
      }

      currentDateTime = currentDateTime.AddDays(1).Date;
    }

    return TimeZoneInfo.ConvertTimeFromUtc(currentDateTime, timeZone);
  }

  [GraphQLIgnore]
  public bool IsHoliday(DateTime date)
  {
    return Holidays.Any(holiday =>
      (holiday.Periodicity == HolidayPeriodicity.Once && holiday.Date == DateOnly.FromDateTime(date)) ||
      (holiday.Periodicity == HolidayPeriodicity.Yearly && holiday.Date.Day == date.Day && holiday.Date.Month == date.Month));
  }

  [GraphQLIgnore]
  public IEnumerable<ValidationError> Validate()
  {
    foreach (var day in Days)
    {
      foreach (var validationError in day.Validate())
      {
        yield return validationError;
      }
    }

    if (Days.GroupBy(day => day.DayOfWeek).Any(group => group.Count() > 1))
    {
      yield return ErrorCode.CalendarContainsDuplicateDays.ToValidationError();
    }
  }
}
