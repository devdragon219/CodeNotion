using RealGimm.Core.Fclt.SLAAggregate;
using RealGimm.Core.Fclt.TicketAggregate;
using RealGimm.Core.Shared;

namespace RealGimm.Infrastructure.Fclt.Data.Fakers;

public sealed class TicketPriorityEqualityConditionFaker : BaseSeededFaker<TicketPriorityEqualityCondition>
{
  public TicketPriorityEqualityConditionFaker()
  {
    CustomInstantiator(faker =>
    {
      var condition = new TicketPriorityEqualityCondition();
      condition.SetOperator(faker.PickRandom<EqualityOperator>());
      condition.SetTargetPriority(faker.PickRandom<Priority>());

      return condition;
    });

    FinishWith((_, condition) => EnsureValid(condition));
  }
}
