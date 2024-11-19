using RealGimm.Infrastructure;
using RealGimm.Web.Fclt.Models;

namespace RealGimm.FunctionalTests.Web.Fakers.Fclt;

public sealed class PriceListMeasurementUnitInputFaker : BaseSeededFaker<PriceListMeasurementUnitInput>
{
  private int _generatedObjectsCount = 0;

  public PriceListMeasurementUnitInputFaker() : base(seed: 1)
  {
    CustomInstantiator(faker =>
    {
      var input = new PriceListMeasurementUnitInput
      {
        Name = faker.Lorem.Sentence(wordCount: 2),
        InternalCode = $"UL{(_generatedObjectsCount + 1).ToString().PadLeft(2, '0')}",
        Ordering = _generatedObjectsCount + 1
      };

      return input;
    });

    FinishWith((_, input) => _generatedObjectsCount++);
  }
}
