using RealGimm.Core.Fclt.SLAAggregate;
using RealGimm.Core.Shared;

namespace RealGimm.Infrastructure.Fclt.Data.Fakers;

public sealed class ComplexTicketConditionFaker : BaseSeededFaker<ComplexTicketCondition>
{
  public required TicketConditionFaker InternalConditionFaker { get; init; }

  public ComplexTicketConditionFaker()
  {
    CustomInstantiator(faker =>
    {
      var condition = new ComplexTicketCondition();
      condition.SetOperator(faker.PickRandom<BooleanOperator>());

      var internalConditionsCount = faker.Random.Int(1, 3);
      for (var i = 0; i < internalConditionsCount; i++)
      {
        var internalCondition = InternalConditionFaker!.Generate();
        condition.InternalConditions.Add(internalCondition);
      }

      return condition;
    });

    FinishWith((_, condition) => EnsureValid(condition));
  }
}
