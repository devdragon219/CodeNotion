using Bogus;
using Elders.Iso3166;
using RealGimm.Core.Asst.CadastralLandCategoryAggregate;

namespace RealGimm.Infrastructure.Asst.Data.Fakers;

public sealed class CadastralLandCategoryFaker : BaseSeededFaker<CadastralLandCategory>
{
  private IEnumerable<string> countries;

  public CadastralLandCategoryFaker()
  {
    countries = Country.GetAllCountries().Select(e => e.ThreeLetterCode);

    CustomInstantiator(faker =>
    {
      var cadastralLandCategory = new CadastralLandCategory();

      cadastralLandCategory.SetData(
        ordering: GenerateOrdering(faker),
        description: GenerateLongString(faker),
        internalCode: GenerateInternalCode(faker),
        countryISO: PickRandomCountryISO(faker, countries)
      );

      return cadastralLandCategory;
    });
  }

  public static int GenerateOrdering(Faker faker) => faker.Random.Int(0, 10);
  public static string GenerateLongString(Faker faker) => faker.Lorem.Word();
  public static string GenerateInternalCode(Faker faker) => faker.Random.AlphaNumeric(10);
  public static string PickRandomCountryISO(Faker faker, IEnumerable<string> countries) => faker.PickRandom(countries);
}
