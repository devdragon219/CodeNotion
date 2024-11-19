using RealGimm.Core.Fclt.PriceListAggregate;

namespace RealGimm.Infrastructure.Fclt.Data.Fakers;

public sealed class PriceListFaker : BaseSeededFaker<PriceList>
{
  private int _generatedObjectsCount = 0;

  public PriceListFaker()
  {
    CustomInstantiator(faker =>
    {
      var priceList = new PriceList();
      priceList.SetName(faker.Lorem.Sentence(wordCount: 2));
      priceList.SetInternalCode($"LS{(_generatedObjectsCount + 1).ToString().PadLeft(4, '0')}");
      priceList.SetOrdering(_generatedObjectsCount + 1);

      return priceList;
    });

    FinishWith((faker, priceList) =>
    {
      EnsureValid(priceList);
      _generatedObjectsCount++;
    });
  }
}
