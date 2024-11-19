using Ardalis.Specification;

namespace RealGimm.Core.Common.CityAggregate.Specifications;

public class CitiesByAnyGuidsSpec : Specification<City>
{
  public CitiesByAnyGuidsSpec(IEnumerable<Guid> guids)
  {
    Query.Where(city => guids.Contains(city.Guid)
      || (city.CountyGuid.HasValue && guids.Contains(city.CountyGuid.Value))
      || (city.RegionGuid.HasValue && guids.Contains(city.RegionGuid.Value)));
  }
}
