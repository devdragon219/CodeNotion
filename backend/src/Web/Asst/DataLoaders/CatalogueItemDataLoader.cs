using GreenDonut;
using Ardalis.Specification;
using RealGimm.Core.Asst.CatalogueItemAggregate;
using RealGimm.Core.Asst.CatalogueItemAggregate.Specifications;

namespace RealGimm.Web.Asst.DataLoaders;

public class CatalogueItemDataLoader : IdentifiableBatchDataLoader<CatalogueItem>
{
  protected override Specification<CatalogueItem>[] AdditionalSpecificationsSingle { get; } = [new CatalogueItemIncludeAllSpec()];
  protected override Specification<CatalogueItem>[] AdditionalSpecificationsMultiple { get; } = [new CatalogueItemIncludeAllSpec()];

  public CatalogueItemDataLoader(
    IServiceProvider serviceProvider,
    IBatchScheduler batchScheduler,
    DataLoaderOptions? options = null)
    : base(serviceProvider, batchScheduler, options)
  {
  }
}
