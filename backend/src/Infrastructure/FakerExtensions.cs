using Bogus;

namespace RealGimm.Infrastructure;

public static class FakerExtensions
{
  public static string RgCountryCode(this Faker faker)
  {
    var cc = faker.Address.CountryCode(Bogus.DataSets.Iso3166Format.Alpha3).ToLower();

    //Exclude St. Lucia due to inconsistent country naming between platforms (linux, windows, macos)
    while (cc == "lca")
    {
      cc = faker.Address.CountryCode(Bogus.DataSets.Iso3166Format.Alpha3).ToLower();
    }

    return cc;
  }
}