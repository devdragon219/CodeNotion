using Ardalis.Specification;

namespace RealGimm.Core.Common.CityAggregate.Specifications;

public class CityByCountryISOCodeSpec : Specification<City>
{
  public CityByCountryISOCodeSpec(string countryIso3)
  {
    Query.Where(city => city.CountryISO == countryIso3);
  }
}
