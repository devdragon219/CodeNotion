using Ardalis.Specification;

namespace RealGimm.Core.Common.CityAggregate.Specifications;

public class CityByGuidSpec : Specification<City>
{
  public CityByGuidSpec(Guid? guid)
  {
    Query.Where(city => guid.HasValue && city.Guid == guid.Value);
  }
}
