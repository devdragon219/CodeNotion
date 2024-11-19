using RealGimm.Infrastructure;
using RealGimm.Web.Fclt.Models;

namespace RealGimm.FunctionalTests.Web.Fakers.Fclt;

public sealed class SLAInputFaker : BaseSeededFaker<SLAInput>
{
  private int _generatedInputsCount = 0;

  public required ComplexTicketConditionInputFaker ComplexTicketConditionInputFaker { get; init; }

  public SLAInputFaker()
  {
    CustomInstantiator(faker =>
    {
      var input = new SLAInput
      {
        InternalCode = $"SLA{(_generatedInputsCount + 1).ToString().PadLeft(3, '0')}",
        Description = faker.Lorem.Sentence(2),
        IfCondition = ComplexTicketConditionInputFaker!.Generate(),
        ThenCondition = ComplexTicketConditionInputFaker!.Generate()
      };

      return input;
    });

    FinishWith((faker, sla) => _generatedInputsCount++);
  }
}
