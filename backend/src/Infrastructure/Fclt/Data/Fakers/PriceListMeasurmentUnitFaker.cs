using RealGimm.Core.Fclt.PriceListMeasurementUnitAggregate;

namespace RealGimm.Infrastructure.Fclt.Data.Fakers;

public sealed class PriceListMeasurementUnitFaker : BaseSeededFaker<PriceListMeasurementUnit>
{
  private int _generatedObjectsCount = 0;

  public PriceListMeasurementUnitFaker()
  {
    CustomInstantiator(faker =>
    {
      var unit = new PriceListMeasurementUnit();
      unit.SetName(faker.Lorem.Sentence(wordCount: 2));
      unit.SetInternalCode($"UL{(_generatedObjectsCount + 1).ToString().PadLeft(2, '0')}");
      unit.SetOrdering(_generatedObjectsCount + 1);

      return unit;
    });

    FinishWith((faker, unit) =>
    {
      EnsureValid(unit);
      _generatedObjectsCount++;
    });
  }
}
