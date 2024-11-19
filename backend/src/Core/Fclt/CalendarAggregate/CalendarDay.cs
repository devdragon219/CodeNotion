using HotChocolate;
using Ardalis.Result;
using RealGimm.Core.Extensions;

namespace RealGimm.Core.Fclt.CalendarAggregate;

public class CalendarDay : EntityBase
{
  public DayOfWeek DayOfWeek { get; private set; }
  public NullSafeCollection<TimeRange> TimeRanges { get; private set; } = [];

  public void SetDayOfWeek(DayOfWeek dayOfWeek) => DayOfWeek = dayOfWeek;

  [GraphQLIgnore]
  public IEnumerable<ValidationError> Validate()
  {
    foreach (var range in TimeRanges)
    {
      foreach (var validationError in range.Validate())
      {
        yield return validationError;
      }
    }

    if (TimeRanges.ContainsOverlaps())
    {
      yield return ErrorCode.TimeRangesContainOverlaps.ToValidationError();
    }
  }
}
