using HotChocolate;
using Ardalis.Result;

namespace RealGimm.Core.Fclt.CalendarAggregate;

public class TimeRange
{
  public TimeOnly Since { get; private set; }
  public TimeOnly Until { get; private set; }

  public void SetSince(TimeOnly since) => Since = since;

  public void SetUntil(TimeOnly until) => Until = until;

  [GraphQLIgnore]
  public IEnumerable<ValidationError> Validate()
  {
    if (Until <= Since)
    {
      yield return ErrorCode.PeriodEndIsLessThanOrEqualStart.ToValidationError();
    }
  }
}
