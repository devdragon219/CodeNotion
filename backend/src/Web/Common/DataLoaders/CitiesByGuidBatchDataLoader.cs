using RealGimm.Core.Common.CityAggregate;
using RealGimm.Core.Common.CityAggregate.Specifications;
using GreenDonut;
using RealGimm.WebCommons;
using Ardalis.Specification;

namespace RealGimm.Web.Common.DataLoaders;

public class CityByGuidDataLoader : RgBatchDataLoader<Guid, City>
{
  protected override Func<City, Guid> KeySelector => city => city.Guid;
  
  public CityByGuidDataLoader(
    IServiceProvider serviceProvider,
    IBatchScheduler batchScheduler,
    DataLoaderOptions? options = null)
    : base(serviceProvider, batchScheduler, options)
  {
  }

  protected override Specification<City>[] GetSpecificationsSingle(IReadOnlyList<Guid> keys) => [new CitiesByGuidsSpec(keys)];
  protected override Specification<City>[] GetSpecificationsMultiple(IReadOnlyList<Guid> keys) => [new CitiesByGuidsSpec(keys)];
}
