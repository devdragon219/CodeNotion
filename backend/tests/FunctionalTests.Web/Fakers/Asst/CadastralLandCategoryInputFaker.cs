using Elders.Iso3166;
using RealGimm.Infrastructure;
using RealGimm.Infrastructure.Asst.Data.Fakers;
using RealGimm.Web.Asst.Models;

namespace RealGimm.FunctionalTests.Web.Fakers.Asst;
public sealed class CadastralLandCategoryInputFaker : BaseSeededFaker<CadastralLandCategoryInput>
{
  private IEnumerable<string> countries;

  public CadastralLandCategoryInputFaker() : base(seed: 1)
  {
    countries = Country.GetAllCountries().Select(e => e.ThreeLetterCode);

    CustomInstantiator(faker =>
    {
      var input = new CadastralLandCategoryInput
      (
        Description: CadastralLandCategoryFaker.GenerateLongString(faker),
        InternalCode: CadastralLandCategoryFaker.GenerateInternalCode(faker),
        CountryISO: CadastralLandCategoryFaker.PickRandomCountryISO(faker, countries),
        Ordering: CadastralLandCategoryFaker.GenerateOrdering(faker)
      );

      return input;
    });
  }
}
