using Ardalis.Specification;
using HotChocolate.Execution;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core;
using RealGimm.Core.Fclt.CalendarAggregate;
using RealGimm.Core.Fclt.CalendarAggregate.Specifications;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Infrastructure.Fclt.Data.Fakers;
using Microsoft.EntityFrameworkCore;
using RealGimm.FunctionalTests.Web.Extensions;
using System.Diagnostics.CodeAnalysis;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.CalendarTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class DuplicateTests : EmptyDbWebTest
{
  public string Mutation => $$"""
    mutation($id: Int!) {
      calendar {
        duplicate (id: $id) {
          {{GraphQLHelper.ResultFragment(GraphQLHelper.Fclt.CalendarFragment(includeDays: true, includeHolidays: true))}}
        }
      }
    }
    """;

  public DuplicateTests(EmptyDbWebFactory factory) : base(factory)
  {
  }

  [Fact]
  public async Task Should_Duplicate()
  {
    // Arrange
    Calendar originalCalendar;

    await using (var scope = Provider.CreateAsyncScope())
    {
      var faker = new CalendarFaker();
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<Calendar>>();

      originalCalendar = faker.Generate();
      await repository.AddAsync(originalCalendar);
    }

    var addMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("id", originalCalendar.Id)
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(addMutation);

    // Assert
    AssertSuccessGraphQLQueryResult(result);

    var duplicatedCalendarId = result.Data!
      .GetDictionaryValue("calendar")
      .GetDictionaryValue("duplicate")
      .GetDictionaryValue("value")
      .GetValue<int>("id");

    await using (var scope = Provider.CreateAsyncScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<Calendar>>();

      var duplicateCalendar = await repository
        .AsQueryable(new GetByIdSpec<Calendar>(duplicatedCalendarId), new CalendarIncludeAllSpec())
        .SingleOrDefaultAsync();

      Assert.NotNull(duplicateCalendar);
      Assert.Equal(originalCalendar, duplicateCalendar, new CalendarEqualityComparer());
    }
  }

  private class CalendarEqualityComparer : IEqualityComparer<Calendar>
  {
    public bool Equals(Calendar? calendar1, Calendar? calendar2)
    {
      if (calendar1 is null || calendar2 is null)
      {
        return false;
      }

      return
        calendar1.Name == calendar2.Name &&
        calendar1.TimeZoneId == calendar2.TimeZoneId &&
        calendar1.Days
          .OrderBy(day => day.DayOfWeek)
          .SequenceEqual(calendar2.Days.OrderBy(day => day.DayOfWeek), new CalendarDayEqualityComparer()) &&
        calendar1.Holidays
          .OrderBy(holiday => holiday.Name)
          .SequenceEqual(calendar2.Holidays.OrderBy(holiday => holiday.Name), new HolidayEqualityComparer());
    }

    public int GetHashCode([DisallowNull] Calendar calendar)
      => HashCode.Combine(calendar.Name, calendar.TimeZoneId, calendar.Days, calendar.Holidays);
  }

  private class CalendarDayEqualityComparer : IEqualityComparer<CalendarDay>
  {
    public bool Equals(CalendarDay? day1, CalendarDay? day2)
    {
      if (day1 is null || day2 is null)
      {
        return false;
      }

      return
        day1.DayOfWeek == day2.DayOfWeek &&
        day1.TimeRanges
          .OrderBy(range => range.Since)
          .SequenceEqual(day2.TimeRanges.OrderBy(range => range.Since), new TimeRangeEqualityComparer());
    }

    public int GetHashCode([DisallowNull] CalendarDay day)
      => HashCode.Combine(day.DayOfWeek, day.TimeRanges);
  }

  private class TimeRangeEqualityComparer : IEqualityComparer<TimeRange>
  {
    public bool Equals(TimeRange? range1, TimeRange? range2)
    {
      if (range1 is null || range2 is null)
      {
        return false;
      }
      return
        range1.Since == range2.Since &&
        range1.Until == range2.Until;
    }
    public int GetHashCode([DisallowNull] TimeRange range)
      => HashCode.Combine(range.Since, range.Until);
  }

  private class HolidayEqualityComparer : IEqualityComparer<Holiday>
  {
    public bool Equals(Holiday? holiday1, Holiday? holiday2)
    {
      if (holiday1 is null || holiday2 is null)
      {
        return false;
      }
      return
        holiday1.Name == holiday2.Name &&
        holiday1.Date == holiday2.Date &&
        holiday1.Periodicity == holiday2.Periodicity;
    }

    public int GetHashCode([DisallowNull] Holiday holiday)
      => HashCode.Combine(holiday.Name, holiday.Date, holiday.Periodicity);
  }
}
