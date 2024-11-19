using Ardalis.Specification;

namespace RealGimm.Core.Common.CityAggregate.Specifications;

public class ExcludeCitiesByRegionsExternalCodesSpec : Specification<City>
{
  public ExcludeCitiesByRegionsExternalCodesSpec(IEnumerable<string> regionsExternalCodesToExclude)
  {
    Query.Where(city => !regionsExternalCodesToExclude.Contains(city.RegionExternalCode));
  }
}
