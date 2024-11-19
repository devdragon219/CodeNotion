using RealGimm.Core.Extensions;
using RealGimm.Core.Fclt.PenaltyAggregate;
using RealGimm.Core.Shared;

namespace RealGimm.Infrastructure.Fclt.Data.Fakers;

public sealed class PenaltyFaker : BaseSeededFaker<Penalty>
{
  private int _generatedObjectsCount = 0;

  public string? ContractInternalCode { get; set; }
  public required ComplexTicketConditionFaker ComplexTicketConditionFaker { get; init; }

  public PenaltyFaker()
  {
    CustomInstantiator(faker =>
    {
      var penalty = new Penalty();
      penalty.SetInternalCode($"{ContractInternalCode}PE{(_generatedObjectsCount + 1).ToString().PadLeft(3, '0')}");
      penalty.SetDescription(faker.Lorem.Sentence(2));

      var ifCondition = ComplexTicketConditionFaker!.Generate();
      penalty.SetIfCondition(ifCondition);

      penalty.SetThenOperator(faker.PickRandom<BooleanOperator>());

      var penaltyValuesCount = faker.Random.Int(1, 2);
      for (var i = 0; i < penaltyValuesCount; i++)
      {
        var penaltyValue = new PenaltyValue();
        penaltyValue.SetType(faker.PickRandom<PenaltyType>());
        penaltyValue.SetAmount(faker.Random.Decimal(5, 100).Round2());
        
        penalty.ThenPenalties.Add(penaltyValue);
      }

      return penalty;
    });

    FinishWith((faker, penalty) =>
    {
      EnsureValid(penalty);
      _generatedObjectsCount++;
    });
  }
}
