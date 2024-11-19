using Ardalis.Specification;
using GreenDonut;
using RealGimm.Core.Common.VATRateAggregate;
using RealGimm.WebCommons;

namespace RealGimm.Web.Common.DataLoaders;

public class VATRateDataLoader : IdentifiableBatchDataLoader<VATRate>
{
  protected override Specification<VATRate>[] AdditionalSpecificationsSingle { get; } = [];
  protected override Specification<VATRate>[] AdditionalSpecificationsMultiple { get; } = [];
  public VATRateDataLoader(
    IServiceProvider serviceProvider,
    IBatchScheduler batchScheduler,
    DataLoaderOptions? options = null)
    : base(serviceProvider, batchScheduler, options)
  {
  }
}
