using RealGimm.Core.Common.CityAggregate;
using RealGimm.Core.Common.CityAggregate.Specifications;
using GreenDonut;
using RealGimm.WebCommons;
using Ardalis.Specification;
using RealGimm.Core;
using Microsoft.EntityFrameworkCore;

namespace RealGimm.Web.Common.DataLoaders;

public class CityByAnyGuidDataLoader : BatchDataLoader<Guid, City>
{
  private readonly IReadRepository<City> _cityRepository;

  public CityByAnyGuidDataLoader(
    IReadRepository<City> cityRepository,
    IBatchScheduler batchScheduler,
    DataLoaderOptions? options = null)
    : base(batchScheduler, options)
  {
    _cityRepository = cityRepository;
  }

  protected override async Task<IReadOnlyDictionary<Guid, City>> LoadBatchAsync(IReadOnlyList<Guid> keys, CancellationToken cancellationToken)
  {
    var cities = await _cityRepository
      .AsQueryable(new CitiesByAnyGuidsSpec(keys))
      .ToListAsync(cancellationToken);

    var outDictionary = keys
      .ToDictionary(k => k, k => cities.First(
        ct => ct.Guid == k
          || (ct.CountyGuid.HasValue && ct.CountyGuid.Value == k)
          || (ct.RegionGuid.HasValue && ct.RegionGuid.Value == k)
      ));

    return outDictionary;
  }
}
