using Ardalis.Specification;

namespace RealGimm.Core.Common.CityAggregate.Specifications;

public class CityThatMainInCountySpec : Specification<City>
{
  public CityThatMainInCountySpec()
  {
    Query.Where(city => city.IsCountyMainCity);
  }
}
