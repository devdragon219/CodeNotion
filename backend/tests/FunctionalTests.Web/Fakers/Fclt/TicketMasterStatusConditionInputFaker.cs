using DocumentFormat.OpenXml.Presentation;
using RealGimm.Core.Fclt.CalendarAggregate;
using RealGimm.Core.Fclt.TicketAggregate;
using RealGimm.Core.Shared;
using RealGimm.Infrastructure;
using RealGimm.Web.Fclt.Models;

namespace RealGimm.FunctionalTests.Web.Fakers.Fclt;

public sealed class TicketMasterStatusConditionInputFaker : BaseSeededFaker<TicketMasterStatusConditionInput>
{
  public required IEnumerable<Calendar> Calendars { get; init; }

  public TicketMasterStatusConditionInputFaker() : base(seed: 1)
  {
    CustomInstantiator(faker =>
    {
      var input = new TicketMasterStatusConditionInput()
      {
        TargetMasterStatus = faker.PickRandomWithout(TicketMasterStatus.New),
        CalendarId = faker.PickRandom(Calendars).Id
      };

      var timeComparisonOperator = faker.PickRandom<ComparisonOperator>();
      input.TimeComparisonOperator = timeComparisonOperator;

      switch (timeComparisonOperator)
      {
        case ComparisonOperator.Between:
          input.MinTimePeriodInMinutes = faker.Random.Int(1, 4);
          input.MaxTimePeriodInMinutes = faker.Random.Int(5, 8);
          break;

        case ComparisonOperator.GreaterThan:
          input.MinTimePeriodInMinutes = faker.Random.Int(1, 8);
          break;

        case ComparisonOperator.LessThan:
          input.MaxTimePeriodInMinutes = faker.Random.Int(1, 8);
          break;
      }

      return input;
    });
  }
}
