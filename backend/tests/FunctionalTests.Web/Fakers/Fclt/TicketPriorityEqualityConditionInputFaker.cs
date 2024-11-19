using RealGimm.Core.Fclt.TicketAggregate;
using RealGimm.Core.Shared;
using RealGimm.Infrastructure;
using RealGimm.Web.Fclt.Models;

namespace RealGimm.FunctionalTests.Web.Fakers.Fclt;

public sealed class TicketPriorityEqualityConditionInputFaker : BaseSeededFaker<TicketPriorityEqualityConditionInput>
{
  public TicketPriorityEqualityConditionInputFaker() : base(seed: 1)
  {
    CustomInstantiator(faker =>
    {
      var input = new TicketPriorityEqualityConditionInput()
      {
        Operator = faker.PickRandom<EqualityOperator>(),
        TargetPriority = faker.PickRandom<Priority>()
      };

      return input;
    });
  }
}
