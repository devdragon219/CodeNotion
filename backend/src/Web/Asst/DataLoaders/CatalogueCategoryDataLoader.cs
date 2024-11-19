using GreenDonut;
using Ardalis.Specification;
using RealGimm.Core.Asst.CatalogueCategoryAggregate;
using RealGimm.Core.Asst.CatalogueCategoryAggregate.Specifications;
using static Dapper.SqlMapper;

namespace RealGimm.Web.Asst.DataLoaders;

public class CatalogueCategoryDataLoader : IdentifiableBatchDataLoader<CatalogueCategory>
{
  protected override Specification<CatalogueCategory>[] AdditionalSpecificationsSingle { get; } = [new CatalogueCategoryIncludeAllSpec()];
  protected override Specification<CatalogueCategory>[] AdditionalSpecificationsMultiple { get; } = [new CatalogueCategoryIncludeAllSpec()];

  public CatalogueCategoryDataLoader(
    IServiceProvider serviceProvider,
    IBatchScheduler batchScheduler,
    DataLoaderOptions? options = null)
    : base(serviceProvider, batchScheduler, options)
  {
  }
}
