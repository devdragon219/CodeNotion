using RealGimm.Infrastructure;
using RealGimm.Web.Fclt.Models;

namespace RealGimm.FunctionalTests.Web.Fakers.Fclt;

public sealed class PriceListInputFaker : BaseSeededFaker<PriceListInput>
{
  private int _generatedInputsCount = 0;

  public PriceListInputFaker() : base(seed: 1)
  {
    CustomInstantiator(faker =>
    {
      var input = new PriceListInput
      {
        Name = faker.Lorem.Sentence(wordCount: 2),
        InternalCode = $"LS{(_generatedInputsCount + 1).ToString().PadLeft(4, '0')}",
        Ordering = _generatedInputsCount + 1
      };

      return input;
    });

    FinishWith((_, input) => _generatedInputsCount++);
  }
}
