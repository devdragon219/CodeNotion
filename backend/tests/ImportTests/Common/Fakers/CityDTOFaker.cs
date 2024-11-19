using Bogus;
using RealGimm.Infrastructure;
using RealGimm.Plugin.Import.Common.Models;

namespace RealGimm.ImportTests.Common.Fakers;

public sealed class CityDTOFaker : BaseSeededFaker<CityDTO>
{
  public CityDTOFaker() : base(seed: 1)
  {
    CustomInstantiator(faker =>
    {
      var cityDto = new CityDTO
      {
        Name = faker.Address.Country(),
        Iso3316Alpha2 = faker.Address.CountryCode(),
        CountyShortCode = faker.Address.County()[0..2].ToUpper(),
      };

      return cityDto;
    });
  }
}
