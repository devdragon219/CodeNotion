using RealGimm.Core.Fclt.SLAAggregate;
using RealGimm.Core.Fclt.TicketTypeAggregate;
using RealGimm.Core.Shared;

namespace RealGimm.Infrastructure.Fclt.Data.Fakers;

public sealed class TicketTypeEqualityConditionFaker : BaseSeededFaker<TicketTypeEqualityCondition>
{
  public required IEnumerable<TicketType> TicketTypes { get; init; }

  public TicketTypeEqualityConditionFaker()
  {
    CustomInstantiator(faker =>
    {
      var condition = new TicketTypeEqualityCondition();
      condition.SetOperator(faker.PickRandom<EqualityOperator>());
      condition.SetTargetTicketType(faker.PickRandom(TicketTypes));

      return condition;
    });

    FinishWith((_, condition) => EnsureValid(condition));
  }
}
