using GreenDonut;
using RealGimm.WebCommons;
using RealGimm.Core.Asst.EstateUsageTypeAggregate;
using Ardalis.Specification;

namespace RealGimm.Web.Asst.DataLoaders;

public class EstateUsageTypeDataLoader : IdentifiableBatchDataLoader<EstateUsageType>
{
  protected override Specification<EstateUsageType>[] AdditionalSpecificationsMultiple => [];
  protected override Specification<EstateUsageType>[] AdditionalSpecificationsSingle => [];
  public EstateUsageTypeDataLoader(
    IServiceProvider serviceProvider,
    IBatchScheduler batchScheduler,
    DataLoaderOptions? options = null)
    : base(serviceProvider, batchScheduler, options)
  {
  }
}
