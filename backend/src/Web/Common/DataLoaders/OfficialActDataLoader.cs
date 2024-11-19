using RealGimm.Core.Common.OfficialActAggregate;
using RealGimm.Core.Common.OfficialActAggregate.Specifications;
using GreenDonut;
using RealGimm.WebCommons;
using Ardalis.Specification;

namespace RealGimm.Web.Common.DataLoaders;

public class OfficialActDataLoader : IdentifiableBatchDataLoader<OfficialAct>
{
  protected override Specification<OfficialAct>[] AdditionalSpecificationsSingle { get; } = [new OfficialActIncludeAllSpec()];
  protected override Specification<OfficialAct>[] AdditionalSpecificationsMultiple { get; } = [new OfficialActIncludeAllSpec()];

  public OfficialActDataLoader(
    IServiceProvider serviceProvider,
    IBatchScheduler batchScheduler,
    DataLoaderOptions? options = null)
    : base(serviceProvider, batchScheduler, options)
  {
  }
}
