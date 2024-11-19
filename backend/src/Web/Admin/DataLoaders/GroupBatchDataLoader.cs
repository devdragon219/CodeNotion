using RealGimm.Core.IAM.GroupAggregate;
using RealGimm.Core.IAM.GroupAggregate.Specifications;
using GreenDonut;
using RealGimm.WebCommons;
using Ardalis.Specification;

namespace RealGimm.Web.Admin.DataLoaders;

public class GroupBatchDataLoader : IdentifiableBatchDataLoader<Group>
{
  protected override Specification<Group>[] AdditionalSpecificationsSingle { get; } = [new GroupIncludeAllSpec()];
  protected override Specification<Group>[] AdditionalSpecificationsMultiple { get; } = [new GroupIncludeAllSpec()];

  public GroupBatchDataLoader(
    IServiceProvider serviceProvider,
    IBatchScheduler batchScheduler,
    DataLoaderOptions? options = null)
    : base(serviceProvider, batchScheduler, options)
  {
  }
}
