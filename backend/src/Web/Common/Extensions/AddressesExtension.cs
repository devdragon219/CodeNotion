using RealGimm.Core.Common.CityAggregate;
using RealGimm.Core.CrossModule;
using RealGimm.Web.Common.DataLoaders;

namespace RealGimm.Web.Common.Extensions;

[ExtendObjectType(typeof(IAddress))]
public sealed class AddressesExtension
{
  public async Task<City?> GetCity(
    [Parent] IAddress address,
    [Service] CityByGuidDataLoader dataLoader,
    CancellationToken cancellationToken = default)
    => address.CityReference is null
      ? null
      : await dataLoader.LoadAsync(address.CityReference.Value, cancellationToken);
}
