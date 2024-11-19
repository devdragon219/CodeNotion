using GreenDonut;
using RealGimm.WebCommons;
using Ardalis.Specification;
using RealGimm.Core.Asst.CatalogueTypeAggregate;
using RealGimm.Core.Asst.CatalogueTypeAggregate.Specifications;

namespace RealGimm.Web.Asst.DataLoaders;

public class CatalogueTypeDataLoader : IdentifiableBatchDataLoader<CatalogueType>
{
  protected override Specification<CatalogueType>[] AdditionalSpecificationsSingle { get; } = [new CatalogueTypeIncludeAllSpec()];
  protected override Specification<CatalogueType>[] AdditionalSpecificationsMultiple { get; } = [new CatalogueTypeIncludeAllSpec()];

  public CatalogueTypeDataLoader(
    IServiceProvider serviceProvider,
    IBatchScheduler batchScheduler,
    DataLoaderOptions? options = null)
    : base(serviceProvider, batchScheduler, options)
  {
  }
}
