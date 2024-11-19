using Ardalis.Result;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core;
using RealGimm.Core.Common.CityAggregate;
using RealGimm.Core.Common.CityAggregate.Specifications;
using RealGimm.Core.IAM;
using RealGimm.SharedKernel.Interfaces;
using RealGimm.Web.Common.DataLoaders;

namespace RealGimm.Web.Common.Queries;

public class CityQueries
{
  [BackOfficePermission(Features.COMMON_CITIES, Permission.Read)]
  public async Task<City?> GetCity(
    int cityId,
    CityDataLoader loader,
    CancellationToken cancellationToken = default)
    => await loader.LoadAsync(cityId, cancellationToken);

  [BackOfficePermission(Features.COMMON_CITIES, Permission.Read)]
  [UsePaging(IncludeTotalCount = true, MaxPageSize = 100)]
  [UseFiltering(typeof(Filters.CityFilterType))]
  [UseSorting(typeof(Sorting.CitySortInputType))]
  public IQueryable<City> ListCities([Service] IReadRepository<City> repository)
    => repository.AsQueryable();

  [BackOfficePermission(Features.COMMON_CITIES, Permission.Read)]
  [UseFiltering(typeof(Filters.CityFilterType))]
  [UseSorting(typeof(Sorting.CitySortInputType))]
  public IQueryable<City> ListCitiesFull([Service] IReadRepository<City> repository)
    => repository.AsQueryable();

  [BackOfficePermission(Features.COMMON_CITIES, Permission.Read)]
  public async Task<Result<City>> FindCountyCity(
    string countyShortCode,
    [Service] IReadRepository<City> repository,
    CancellationToken cancellationToken = default)
  {
    if (string.IsNullOrEmpty(countyShortCode))
    {
      return Result<City>.Invalid(ErrorCode.CountyShortCodeIsEmpty.ToValidationError());
    }

    var city = await repository
      .AsQueryable(new CityByCountyShortCodeSpec(countyShortCode.ToUpperInvariant()), new CityThatMainInCountySpec())
      .FirstOrDefaultAsync(cancellationToken);

    return city is null
      ? Result.NotFound()
      : Result.Success(city);
  }
}
