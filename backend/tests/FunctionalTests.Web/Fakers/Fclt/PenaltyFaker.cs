using RealGimm.Core.Extensions;
using RealGimm.Core.Fclt.PenaltyAggregate;
using RealGimm.Core.Shared;
using RealGimm.Infrastructure;
using RealGimm.Web.Fclt.Models;

namespace RealGimm.FunctionalTests.Web.Fakers.Fclt;

public sealed class PenaltyInputFaker : BaseSeededFaker<PenaltyInput>
{
  private int _generatedInputsCount = 0;

  public required ComplexTicketConditionInputFaker ComplexTicketConditionInputFaker { get; init; }

  public PenaltyInputFaker() : base(seed: 1)
  {
    CustomInstantiator(faker =>
    {
      var input = new PenaltyInput()
      {
        InternalCode = $"PE{(_generatedInputsCount + 1).ToString().PadLeft(3, '0')}",
        Description = faker.Lorem.Sentence(2),
        IfCondition = ComplexTicketConditionInputFaker!.Generate(),
        ThenOperator = faker.PickRandom<BooleanOperator>()
      };

      var thenPenalitiesCount = faker.Random.Int(1, 2);
      var thenPenaltiesInputs = new List<PenaltyValueInput>();

      for (var i = 0; i < thenPenalitiesCount; i++)
      {
        var penaltyValueInput = new PenaltyValueInput
        {
          Type = faker.PickRandom<PenaltyType>(),
          Amount = faker.Random.Decimal(5, 100).Round2()
        };

        thenPenaltiesInputs.Add(penaltyValueInput);
      }

      input.ThenPenalties = thenPenaltiesInputs.ToArray();

      return input;
    });

    FinishWith((faker, penalty) => EnsureValid(penalty));
  }
}
