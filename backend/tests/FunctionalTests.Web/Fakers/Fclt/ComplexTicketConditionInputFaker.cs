using RealGimm.Core.Shared;
using RealGimm.Infrastructure;
using RealGimm.Web.Fclt.Models;

namespace RealGimm.FunctionalTests.Web.Fakers.Fclt;

public sealed class ComplexTicketConditionInputFaker : BaseSeededFaker<ComplexTicketConditionInput>
{
  public required OneOfTicketConditionInputFaker InternalConditionFaker { get; init; }

  public ComplexTicketConditionInputFaker() : base(seed: 1)
  {
    CustomInstantiator(faker =>
    {
      var input = new ComplexTicketConditionInput
      {
        Operator = faker.PickRandom<BooleanOperator>()
      };

      var internalConditionInputsCount = faker.Random.Int(1, 3);
      var internalConditionInputs = new List<OneOfTicketConditionInput>();

      for (var i = 0; i < internalConditionInputsCount; i++)
      {
        var internalCondition = InternalConditionFaker!.Generate();
        internalConditionInputs.Add(internalCondition);
      }

      input.InternalConditions = internalConditionInputs.ToArray();

      return input;
    });
  }
}
