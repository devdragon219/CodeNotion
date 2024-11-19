using Bogus.DataSets;
using RealGimm.Core.Common.CityAggregate;
using RealGimm.Infrastructure;
using RealGimm.Plugin.Import.Common;

namespace RealGimm.ImportTests.Anag.Fakers;

public sealed class ImportedCityFaker : BaseSeededFaker<City>
{
  public ImportedCityFaker()
  {
    CustomInstantiator(faker =>
    {
      var city = new City(
        faker.Address.City(),
        Guid.NewGuid(),
        faker.Address.CountryCode(Iso3166Format.Alpha3),
        DefaultCommonDataImporter.IMPORT_CITY_PROVIDER);

      return city;
    });
  }
}
