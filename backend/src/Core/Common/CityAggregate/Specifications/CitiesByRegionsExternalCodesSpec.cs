using Ardalis.Specification;

namespace RealGimm.Core.Common.CityAggregate.Specifications;

public class CitiesByRegionsExternalCodesSpec : Specification<City>
{
  public CitiesByRegionsExternalCodesSpec(IEnumerable<string> regionsCodes)
  {
    Query.Where(city => regionsCodes.Contains(city.RegionExternalCode));
  }
}
