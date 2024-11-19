using GreenDonut;
using Ardalis.Specification;
using RealGimm.Core.Asst.CatalogueCategoryAggregate;
using RealGimm.Core;
using Microsoft.EntityFrameworkCore;

namespace RealGimm.Web.Asst.DataLoaders;

public class CatalogueSubCategoryDataLoader : BatchDataLoader<int, CatalogueSubCategory>
{
  private readonly IServiceProvider _serviceProvider;

  public CatalogueSubCategoryDataLoader(
    IServiceProvider serviceProvider,
    IBatchScheduler batchScheduler,
    DataLoaderOptions? options = null)
    : base(batchScheduler, options)
  {
    _serviceProvider = serviceProvider;
  }

  protected override async Task<IReadOnlyDictionary<int, CatalogueSubCategory>> LoadBatchAsync(
    IReadOnlyList<int> keys,
    CancellationToken cancellationToken)
  {
    await using var scope = _serviceProvider.CreateAsyncScope();
    var catalogueCategoryRepository = scope.ServiceProvider.GetRequiredService<IRepository<CatalogueCategory>>();

    return await catalogueCategoryRepository
      .AsQueryable()
      .SelectMany(catalogueCategory => catalogueCategory.SubCategories)
      .Where(subCategory => keys.Contains(subCategory.Id))
      .ToDictionaryAsync(subCategory => subCategory.Id, cancellationToken);
  }

}


