using RealGimm.Core.Prop.ContractAggregate;
using GreenDonut;
using RealGimm.Core.Prop.ContractAggregate.Specifications;
using RealGimm.WebCommons;
using Ardalis.Specification;

namespace RealGimm.Web.Prop.DataLoaders;

public class ContractDataLoader : IdentifiableBatchDataLoader<Contract>
{
  protected override Specification<Contract>[] AdditionalSpecificationsSingle { get; } = [new ContractIncludeAllSpec()];
  protected override Specification<Contract>[] AdditionalSpecificationsMultiple { get; } = [new ContractIncludeForListSpec()];

  public ContractDataLoader(
    IServiceProvider serviceProvider,
    IBatchScheduler batchScheduler,
    DataLoaderOptions? options = null)
    : base(serviceProvider, batchScheduler, options)
  {
  }
}
