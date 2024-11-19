using RealGimm.Core.Anag.OrgUnitAggregate;
using RealGimm.Core.Common.CityAggregate;
using RealGimm.Web.Common.DataLoaders;

namespace RealGimm.Web.Common.Extensions;

[ExtendObjectType(typeof(OrgUnit))]
public sealed class OrgUnitExtension
{
  public async Task<IEnumerable<City>> GetCities(
    [Parent] OrgUnit orgUnit,
    [Service] CityDataLoader dataLoader,
    CancellationToken cancellationToken = default)
    => orgUnit.GeographicalCities is null
      ? Array.Empty<City>()
      : await dataLoader.LoadAsync(orgUnit.GeographicalCities, cancellationToken);
}
