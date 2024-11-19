using RealGimm.Core;
using RealGimm.Core.Common.CityAggregate;
using RealGimm.Core.IAM;
using RealGimm.Web.Common.Models;

namespace RealGimm.Web.Common.Mutations;

public class CityMutations
{
  [BackOfficePermission(Features.COMMON_CITIES, Permission.Create)]
  public async Task<City?> Add(
    CityInput city,
    [Service] IRepository<City> repository,
    CancellationToken cancellationToken = default)
    => await repository.AddAsync(new City(city.Name, Guid.NewGuid(), city.CountryISO, Guid.Empty), cancellationToken);

  [BackOfficePermission(Features.COMMON_CITIES, Permission.Update)]
  public async Task<bool> Update(
    int cityId,
    CityInput city,
    [Service] IRepository<City> repository,
    [Service] IHttpContextAccessor contextAccessor,
    [Service] ILogger<CityMutations> logger,
    CancellationToken cancellationToken = default)
  {
    var oldCity = await repository.GetByIdAsync(cityId, cancellationToken);

    if (oldCity == null)
    {
      logger.LogInformation("No such city {CityId} while updating from {remoteAddress}",
        cityId,
        contextAccessor?.HttpContext?.Connection.RemoteIpAddress
        );
      return false;
    }

    oldCity.SetNames(city.Name, null, null);

    await repository.UpdateAsync(oldCity, cancellationToken);

    return true;
  }

  [BackOfficePermission(Features.COMMON_CITIES, Permission.Delete)]
  public async Task<bool> Delete(
    int cityId,
    [Service] IRepository<City> repository,
    [Service] IHttpContextAccessor contextAccessor,
    [Service] ILogger<CityMutations> logger,
    CancellationToken cancellationToken = default)
  {
    var oldCity = await repository.GetByIdAsync(cityId, cancellationToken);

    if (oldCity == null)
    {
      logger.LogInformation("No such city {CityID} while deleting from {remoteAddress}",
        cityId,
        contextAccessor?.HttpContext?.Connection.RemoteIpAddress
        );
      return false;
    }

    if (oldCity.CityProvider != Guid.Empty)
    {
      logger.LogInformation("City managed by external provider {CityID} while deleting from {remoteAddress}",
        cityId,
        contextAccessor?.HttpContext?.Connection.RemoteIpAddress
        );
      return false;
    }

    await repository.DeleteAsync(oldCity, cancellationToken);

    return true;
  }
}
