using Ardalis.Result;
using HotChocolate;
using RealGimm.Core.Fclt.CalendarAggregate;
using RealGimm.Core.Fclt.TicketAggregate;
using RealGimm.Core.Shared;

namespace RealGimm.Core.Fclt.SLAAggregate;

public class TicketMasterStatusCondition : TicketCondition
{
  public TicketMasterStatus TargetMasterStatus { get; private set; }
  public ComparisonOperator TimeComparisonOperator { get; private set; }
  public Calendar Calendar { get; private set; } = default!;
  public int? MinTimePeriodInMinutes { get; private set; }
  public int? MaxTimePeriodInMinutes { get; private set; }

  public void SetTargetMasterStatus(TicketMasterStatus targetMasterStatus)
    => TargetMasterStatus = targetMasterStatus;

  public void SetTimeComparisonOperator(ComparisonOperator timeComparisonOperator)
    => TimeComparisonOperator = timeComparisonOperator;

  public void SetCalendar(Calendar calendar) => Calendar = calendar;

  public void SetMinTimePeriodInMinutes(int? minTimePeriodInMinutes)
    => MinTimePeriodInMinutes = minTimePeriodInMinutes;

  public void SetMaxTimePeriodInMinutes(int? maxTimePeriodInMinutes)
    => MaxTimePeriodInMinutes = maxTimePeriodInMinutes;

  [GraphQLIgnore]
  public override IEnumerable<ValidationError> Validate()
  {
    switch (TimeComparisonOperator)
    {
      case ComparisonOperator.Between:
      {
        if (!MinTimePeriodInMinutes.HasValue ||
          !MaxTimePeriodInMinutes.HasValue ||
          MinTimePeriodInMinutes <= 0 ||
          MaxTimePeriodInMinutes < MinTimePeriodInMinutes)
        {
          yield return ErrorCode.InvalidTimePeriod.ToValidationError();
        }

        break;
      }

      case ComparisonOperator.GreaterThan:
      {
        if (!MinTimePeriodInMinutes.HasValue || MinTimePeriodInMinutes <= 0)
        {
          yield return ErrorCode.InvalidTimePeriod.ToValidationError();
        }

        break;
      }

      case ComparisonOperator.LessThan:
      {
        if (!MaxTimePeriodInMinutes.HasValue || MaxTimePeriodInMinutes <= 0)
        {
          yield return ErrorCode.InvalidTimePeriod.ToValidationError();
        }

        break;
      }
    }
  }
}
