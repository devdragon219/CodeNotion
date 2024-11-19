using Ardalis.Specification;
using UAgg = RealGimm.Core.IAM.UserAggregate;
using RealGimm.Core.IAM.UserAggregate.Specifications;

namespace RealGimm.WebCommons.User.DataLoaders;

public class UserDataLoader : IdentifiableBatchDataLoader<UAgg.User>
{
  protected override Specification<UAgg.User>[] AdditionalSpecificationsSingle { get; } = [new UserIncludeAllSpec()];
  protected override Specification<UAgg.User>[] AdditionalSpecificationsMultiple { get; } = [new UserIncludeAllForListSpec()];

  public UserDataLoader(
    IServiceProvider serviceProvider,
    IBatchScheduler batchScheduler,
    DataLoaderOptions? options = null)
    : base(serviceProvider, batchScheduler, options)
  {
  }
}
