using Ardalis.Specification;
using GreenDonut;
using RealGimm.Core.Asst.EstateSubUnitAggregate;
using RealGimm.Core.Asst.EstateSubUnitAggregate.Specifications;
using RealGimm.Core.Shared.Specifications;
using RealGimm.WebCommons;

namespace RealGimm.Web.Asst.DataLoaders;

public class EstateSubUnitDataLoader : IdentifiableBatchDataLoader<EstateSubUnit>
{
  protected override Specification<EstateSubUnit>[] AdditionalSpecificationsSingle { get; } = [new EstateSubUnitIncludeAllSpec()];
  protected override Specification<EstateSubUnit>[] AdditionalSpecificationsMultiple { get; } = [new EstateSubUnitIncludeAllSpec()];
  
  public EstateSubUnitDataLoader(
    IServiceProvider serviceProvider,
    IBatchScheduler batchScheduler,
    DataLoaderOptions? options = null)
    : base(serviceProvider, batchScheduler, options)
  {
  }
}
