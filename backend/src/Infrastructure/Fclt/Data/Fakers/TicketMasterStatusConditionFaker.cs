using RealGimm.Core.Fclt.CalendarAggregate;
using RealGimm.Core.Fclt.SLAAggregate;
using RealGimm.Core.Fclt.TicketAggregate;
using RealGimm.Core.Shared;

namespace RealGimm.Infrastructure.Fclt.Data.Fakers;

public sealed class TicketMasterStatusConditionFaker : BaseSeededFaker<TicketMasterStatusCondition>
{
  public required IEnumerable<Calendar> Calendars { get; init; }

  public TicketMasterStatusConditionFaker()
  {
    CustomInstantiator(faker =>
    {
      var condition = new TicketMasterStatusCondition();
      condition.SetTargetMasterStatus(faker.PickRandomWithout(TicketMasterStatus.New));
      condition.SetCalendar(faker.PickRandom(Calendars));

      var timeComparisonOperator = faker.PickRandom<ComparisonOperator>();
      condition.SetTimeComparisonOperator(timeComparisonOperator);

      switch (timeComparisonOperator)
      {
        case ComparisonOperator.Between:
          condition.SetMinTimePeriodInMinutes(faker.Random.Int(1, 4));
          condition.SetMaxTimePeriodInMinutes(faker.Random.Int(5, 8));
          break;

        case ComparisonOperator.GreaterThan:
          condition.SetMinTimePeriodInMinutes(faker.Random.Int(1, 8));
          break;

        case ComparisonOperator.LessThan:
          condition.SetMaxTimePeriodInMinutes(faker.Random.Int(1, 8));
          break;
      }

      return condition;
    });

    FinishWith((_, condition) => EnsureValid(condition));
  }
}
