using Ardalis.Specification;

namespace RealGimm.Core.Common.CityAggregate.Specifications;

public class CitiesByGuidsSpec : Specification<City>
{
  public CitiesByGuidsSpec(IEnumerable<Guid> guids)
  {
    Query.Where(city => guids.Contains(city.Guid));
  }
}
