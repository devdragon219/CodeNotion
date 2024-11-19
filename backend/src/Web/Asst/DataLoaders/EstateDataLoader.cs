using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Core.Asst.EstateAggregate.Specifications;
using GreenDonut;
using RealGimm.WebCommons;
using Ardalis.Specification;

namespace RealGimm.Web.Asst.DataLoaders;

public class EstateDataLoader : IdentifiableBatchDataLoader<Estate>
{
  protected override Specification<Estate>[] AdditionalSpecificationsSingle { get; } = [new EstateIncludeAllSpec()];
  protected override Specification<Estate>[] AdditionalSpecificationsMultiple { get; } = [new EstateIncludeForListSpec()];

  public EstateDataLoader(
    IServiceProvider serviceProvider,
    IBatchScheduler batchScheduler,
    DataLoaderOptions? options = null)
    : base(serviceProvider, batchScheduler, options)
  {
  }
}
