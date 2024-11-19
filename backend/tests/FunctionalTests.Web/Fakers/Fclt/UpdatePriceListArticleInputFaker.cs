using RealGimm.Core.Asst.CatalogueTypeAggregate;
using RealGimm.Core.Extensions;
using RealGimm.Core.Fclt.PriceListAggregate;
using RealGimm.Core.Fclt.PriceListMeasurementUnitAggregate;
using RealGimm.Infrastructure;
using RealGimm.Web.Fclt.Models;

namespace RealGimm.FunctionalTests.Web.Fakers.Fclt;

public sealed class UpdatePriceListArticleInputFaker : BaseSeededFaker<UpdatePriceListArticleInput>
{
  private int _generatedInputsCount = 0;

  public required IEnumerable<CatalogueType> CatalogueTypes { get; init; }
  public required IEnumerable<PriceListMeasurementUnit> PriceListMeasurementUnits { get; init; }
  public required IEnumerable<PriceList> PriceLists { get; init; }

  public UpdatePriceListArticleInputFaker() : base(seed: 1)
  {
    CustomInstantiator(faker =>
    {
      var input = new UpdatePriceListArticleInput()
      {
        InternalCode = $"AR{(_generatedInputsCount + 1).ToString().PadLeft(3, '0')}",
        Name = faker.Lorem.Sentence(2),
        MeasurementUnitId = faker.PickRandom(PriceListMeasurementUnits).Id,
        PriceListId = faker.PickRandom(PriceLists).Id
      };

      var catalogueTypes = faker.PickRandom(
        CatalogueTypes,
        amountToPick: faker.Random.Int(1, Math.Min(3, CatalogueTypes!.Count())));
      
      input.CatalogueTypeIds = catalogueTypes.Select(catalogueType => catalogueType.Id).ToArray();

      input.PricePeriods =
      [
        new ArticlePricePeriodInput
        {
          Since = faker.Date.BetweenDateOnly(new DateOnly(2022, 01, 01), new DateOnly(2022, 06, 01).AddDays(-1)),
          Until = faker.Date.BetweenDateOnly(new DateOnly(2022, 06, 01), new DateOnly(2023, 01, 01).AddDays(-1)),
          Price = faker.Random.Decimal(5, 100).Round2()
        },
        new ArticlePricePeriodInput
        {
          Since = faker.Date.BetweenDateOnly(new DateOnly(2023, 01, 01), new DateOnly(2023, 06, 01).AddDays(-1)),
          Until = faker.Date.BetweenDateOnly(new DateOnly(2023, 06, 01), new DateOnly(2024, 01, 01).AddDays(-1)),
          Price = faker.Random.Decimal(5, 100).Round2()
        }
      ];

      return input;
    });

    FinishWith((faker, input) => _generatedInputsCount++);
  }
}
