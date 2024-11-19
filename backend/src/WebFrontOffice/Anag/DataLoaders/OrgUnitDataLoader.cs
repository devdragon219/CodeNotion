using RealGimm.Core.Anag.OrgUnitAggregate;
using RealGimm.Core.Anag.OrgUnitAggregate.Specifications;
using GreenDonut;
using RealGimm.WebCommons;
using Ardalis.Specification;

namespace RealGimm.WebFrontOffice.Anag.DataLoaders;

public class OrgUnitDataLoader : IdentifiableBatchDataLoader<OrgUnit>
{
  protected override Specification<OrgUnit>[] AdditionalSpecificationsSingle { get; } = [new OrgUnitIncludeAllSpec()];
  protected override Specification<OrgUnit>[] AdditionalSpecificationsMultiple { get; } = [new OrgUnitIncludeAllForListSpec()];

  public OrgUnitDataLoader(
    IServiceProvider serviceProvider,
    IBatchScheduler batchScheduler,
    DataLoaderOptions? options = null)
    : base(serviceProvider, batchScheduler, options)
  {
  }
}
