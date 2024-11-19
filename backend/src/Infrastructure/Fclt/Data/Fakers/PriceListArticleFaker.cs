using Bogus;
using RealGimm.Core.Asst.CatalogueTypeAggregate;
using RealGimm.Core.Extensions;
using RealGimm.Core.Fclt.PenaltyAggregate;
using RealGimm.Core.Fclt.PriceListAggregate;
using RealGimm.Core.Fclt.PriceListArticleAggregate;
using RealGimm.Core.Fclt.PriceListMeasurementUnitAggregate;

namespace RealGimm.Infrastructure.Fclt.Data.Fakers;

public sealed class PriceListArticleFaker : BaseSeededFaker<PriceListArticle>
{
  private int _generatedObjectsCount = 0;

  public required IEnumerable<CatalogueType> CatalogueTypes { get; init; }
  public required IEnumerable<PriceListMeasurementUnit> PriceListMeasurementUnits { get; init; }
  public required IEnumerable<PriceList> PriceLists { get; init; }

  public PriceListArticleFaker()
  {
    CustomInstantiator(faker =>
    {
      var article = new PriceListArticle();
      article.SetInternalCode($"AR{(_generatedObjectsCount + 1).ToString().PadLeft(3, '0')}");
      article.SetName(faker.Lorem.Sentence(2));
      article.SetMeasurementUnit(faker.PickRandom(PriceListMeasurementUnits));
      article.SetPriceList(faker.PickRandom(PriceLists));

      var catalogueTypes = faker.PickRandom(
        CatalogueTypes,
        amountToPick: faker.Random.Int(1, Math.Min(3, CatalogueTypes!.Count())));

      article.SetCatalogueTypeIds(catalogueTypes.Select(catalogueType => catalogueType.Id).ToArray());

      var pricePeriod = new ArticlePricePeriod();
      pricePeriod.SetSince(faker.Date.BetweenDateOnly(new DateOnly(2022, 01, 01), new DateOnly(2024, 01, 01)));
      pricePeriod.SetUntil(faker.Date.BetweenDateOnly(new DateOnly(2024, 01, 01), new DateOnly(2025, 01, 01)).OrNull(faker));
      pricePeriod.SetPrice(faker.Random.Decimal(5, 100).Round2());

      article.PricePeriods.Add(pricePeriod);

      return article;
    });

    FinishWith((faker, penalty) =>
    {
      EnsureValid(penalty);
      _generatedObjectsCount++;
    });
  }
}
