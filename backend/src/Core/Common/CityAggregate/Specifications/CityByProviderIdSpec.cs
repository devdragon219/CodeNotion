using Ardalis.Specification;

namespace RealGimm.Core.Common.CityAggregate.Specifications;

public class CityByProviderIdSpec : Specification<City>
{
  public CityByProviderIdSpec(Guid providerId)
  {
    Query.Where(city => city.CityProvider == providerId);
  }
}
