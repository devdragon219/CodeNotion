using RealGimm.Core.Common.CityAggregate;
using RealGimm.Core.Prop.RegistrationOfficeAggregate;
using RealGimm.Web.Common.DataLoaders;

namespace RealGimm.Web.Prop.Extensions;

[ExtendObjectType(typeof(RegistrationOffice))]
public class RegistrationOfficeExtension
{
  public async Task<City?> GetCity(
    [Parent] RegistrationOffice registrationOffice,
    [Service] CityDataLoader dataLoader,
    CancellationToken cancellationToken = default)
    => registrationOffice.CityId.HasValue
      ? await dataLoader.LoadAsync(registrationOffice.CityId.Value, cancellationToken)
      : null;
}
