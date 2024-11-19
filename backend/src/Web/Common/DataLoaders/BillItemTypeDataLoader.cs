using GreenDonut;
using Ardalis.Specification;
using RealGimm.WebCommons;
using RealGimm.Core.Prop.BillItemTypeAggregate;

namespace RealGimm.Web.Common.DataLoaders;

public class BillItemTypeDataLoader : IdentifiableBatchDataLoader<BillItemType>
{
  protected override Specification<BillItemType>[] AdditionalSpecificationsSingle { get; } = [];
  protected override Specification<BillItemType>[] AdditionalSpecificationsMultiple { get; } = [];

  public BillItemTypeDataLoader(
    IServiceProvider serviceProvider,
    IBatchScheduler batchScheduler,
    DataLoaderOptions? options = null)
    : base(serviceProvider, batchScheduler, options)
  {
  }
}
