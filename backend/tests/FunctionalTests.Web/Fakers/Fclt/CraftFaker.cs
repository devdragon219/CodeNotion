using RealGimm.Infrastructure;
using RealGimm.Web.Fclt.Models;

namespace RealGimm.FunctionalTests.Web.Fakers.Fclt;

public sealed class CraftInputFaker : BaseSeededFaker<CraftInput>
{
  private int _generatedInputsCount = 0;

  public CraftInputFaker() : base(seed: 1)
  {
    CustomInstantiator(faker =>
    {
      var input = new CraftInput
      {
        Name = faker.Lorem.Sentence(wordCount: 2),
        InternalCode = $"SP{(_generatedInputsCount + 1).ToString().PadLeft(2, '0')}",
        Ordering = _generatedInputsCount + 1
      };

      return input;
    });

    FinishWith((_, input) => _generatedInputsCount++);
  }
}
