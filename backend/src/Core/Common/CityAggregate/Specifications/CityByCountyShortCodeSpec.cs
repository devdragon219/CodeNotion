using Ardalis.Specification;

namespace RealGimm.Core.Common.CityAggregate.Specifications;

public class CityByCountyShortCodeSpec : Specification<City>
{
  public CityByCountyShortCodeSpec(string shortCode)
  {
    Query.Where(city => city.CountyShortCode == shortCode);
  }
}
