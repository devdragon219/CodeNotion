using GreenDonut;
using RealGimm.WebCommons;
using RealGimm.Core.Common.AccountingItemAggregate;
using Ardalis.Specification;

namespace RealGimm.Web.Common.DataLoaders;

public class AccountingItemDataLoader : IdentifiableBatchDataLoader<AccountingItem>
{
  protected override Specification<AccountingItem>[] AdditionalSpecificationsMultiple => [];
  protected override Specification<AccountingItem>[] AdditionalSpecificationsSingle => [];
  public AccountingItemDataLoader(
    IServiceProvider serviceProvider,
    IBatchScheduler batchScheduler,
    DataLoaderOptions? options = null)
    : base(serviceProvider, batchScheduler, options)
  {
  }
}
