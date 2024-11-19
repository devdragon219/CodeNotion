using GreenDonut;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate.Specifications;
using RealGimm.WebCommons;
using Ardalis.Specification;

namespace RealGimm.Web.Asst.DataLoaders;

public class EstateUnitDataLoader : IdentifiableBatchDataLoader<EstateUnit>
{
  protected override Specification<EstateUnit>[] AdditionalSpecificationsSingle { get; } = [new EstateUnitIncludeAllSpec()];
  protected override Specification<EstateUnit>[] AdditionalSpecificationsMultiple { get; } = [new EstateUnitIncludeForListSpec()];

  public EstateUnitDataLoader(
    IServiceProvider serviceProvider,
    IBatchScheduler batchScheduler,
    DataLoaderOptions? options = null)
    : base(serviceProvider, batchScheduler, options)
  {
  }
}
