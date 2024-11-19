using RealGimm.Infrastructure;
using RealGimm.Web.Fclt.Models;

namespace RealGimm.FunctionalTests.Web.Fakers.Fclt;

public sealed class TicketTypeInputFaker : BaseSeededFaker<TicketTypeInput>
{
  private int _generatedObjectsCount = 0;

  public TicketTypeInputFaker() : base(seed: 1)
  {
    CustomInstantiator(faker =>
    {
      var input = new TicketTypeInput
      {
        Description = faker.Lorem.Sentence(wordCount: 2),
        InternalCode = $"TTK{(_generatedObjectsCount + 1).ToString().PadLeft(2, '0')}",
        Ordering = _generatedObjectsCount + 1
      };

      return input;
    });

    FinishWith((_, input) => _generatedObjectsCount++);
  }
}
