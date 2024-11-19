using RealGimm.Core.Common.CityAggregate;
using GreenDonut;
using RealGimm.WebCommons;
using Ardalis.Specification;

namespace RealGimm.Web.Common.DataLoaders;

public class CityDataLoader : IdentifiableBatchDataLoader<City>
{
  protected override Specification<City>[] AdditionalSpecificationsMultiple => [];
  protected override Specification<City>[] AdditionalSpecificationsSingle => [];
  public CityDataLoader(
    IServiceProvider serviceProvider, 
    IBatchScheduler batchScheduler,
    DataLoaderOptions? options = null)
    : base(serviceProvider, batchScheduler, options)
  {
  }
}
