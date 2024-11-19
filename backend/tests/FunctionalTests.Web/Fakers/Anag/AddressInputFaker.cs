using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Infrastructure;
using RealGimm.Web.Anag.Models;

namespace RealGimm.FunctionalTests.Web.Fakers.Anag;

public sealed class AddressInputFaker : BaseSeededFaker<AddressInput>
{
  public AddressInputFaker() : base(seed: 1)
  {
    CustomInstantiator(faker =>
    {
      var input = new AddressInput
      {
        AddressType = faker.PickRandom<AddressType>(),
        CityId = null,
        CityName = faker.Address.City(),
        Toponymy = faker.Address.StreetAddress(),
        CountryISO = faker.RgCountryCode(),
        RegionName = null,
        CountyName = faker.Address.County(),
        LocalPostCode = faker.Address.ZipCode(),
        Numbering = faker.Address.BuildingNumber(),
        Notes = faker.Lorem.Sentence()
      };

      return input;
    });
  }
}
