using RealGimm.Core.IAM;
using RealGimm.WebCommons;
using RealGimm.Core.Asst.CatalogueCategoryAggregate;
using RealGimm.SharedKernel.Interfaces;
using RealGimm.Core.Asst.CatalogueCategoryAggregate.Specifications;
using RealGimm.Web.Asst.Queries.Filters;
using RealGimm.Web.Asst.Queries.Sorting;
using RealGimm.Core.Shared.Specifications;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core;

namespace RealGimm.Web.Asst.Queries;

public class CatalogueCategoryQueries : QueriesBase
{
  [BackOfficePermission(Features.ASST_CATALOGUE_CONFIG, Permission.Read)]
  public async Task<CatalogueCategory?> Get(
    int id,
    [Service] IReadRepository<CatalogueCategory> repository,
    CancellationToken cancellationToken = default)
    => await repository
        .AsQueryable(new GetByIdSpec<CatalogueCategory>(id), new CatalogueCategoryIncludeAllSpec())
        .SingleOrDefaultAsync(cancellationToken);

  [BackOfficePermission(Features.ASST_CATALOGUE_CONFIG, Permission.Read)]
  [UsePaging(IncludeTotalCount = true, MaxPageSize = 100)]
  [UseFiltering(typeof(CatalogueCategoryFilterType))]
  [UseSorting(typeof(CatalogueCategorySortInputType))]
  public IQueryable<CatalogueCategory> ListCatalogueCategories([Service] IReadRepository<CatalogueCategory> repository)
    => repository.AsQueryable(new CatalogueCategoryIncludeAllSpec());

  [BackOfficePermission(Features.ASST_CATALOGUE_CONFIG, Permission.Read)]
  [UsePaging(IncludeTotalCount = true, MaxPageSize = 100)]
  [UseFiltering]
  [UseSorting]
  public IQueryable<CatalogueSubCategory> ListCatalogueSubCategories(
    int? catalogueCategoryId,
    [Service] IReadRepository<CatalogueCategory> repository)
  {
    var catalogueCategorySpecifications = catalogueCategoryId.HasValue
      ? new[] { new GetByIdSpec<CatalogueCategory>(catalogueCategoryId.Value) }
      : [];

    return repository
      .AsQueryable(catalogueCategorySpecifications)
      .SelectMany(category => category.SubCategories)
      .Include(subCategory => subCategory.CatalogueTypes);
  }

  [BackOfficePermission(Features.ASST_CATALOGUE_CONFIG, Permission.Read)]
  [UseFiltering(typeof(CatalogueCategoryFilterType))]
  [UseSorting(typeof(CatalogueCategorySortInputType))]
  public IQueryable<CatalogueCategory> ListCatalogueCategoriesFull([Service] IReadRepository<CatalogueCategory> repository)
    => repository.AsQueryable(new CatalogueCategoryIncludeAllSpec());

  [BackOfficePermission(Features.ASST_CATALOGUE_CONFIG, Permission.Read)]
  [UseFiltering]
  [UseSorting]
  public IQueryable<CatalogueSubCategory> ListCatalogueSubCategoriesFull(
    int catalogueCategoryId,
    [Service] IReadRepository<CatalogueCategory> repository)
    => repository
      .AsQueryable(new GetByIdSpec<CatalogueCategory>(catalogueCategoryId))
      .SelectMany(category => category.SubCategories)
      .Include(subCategory => subCategory.CatalogueTypes);

  [BackOfficePermission(Features.ASST_CATALOGUE_CONFIG, Permission.Read)]
  public async Task<string?> ProposeNewInternalCode([Service] ICodeSuggestor<CatalogueCategory> codeSuggestor)
    => await codeSuggestor.SuggestNextCode(null, (CatalogueCategory?)null);

  [BackOfficePermission(Features.ASST_CATALOGUE_CONFIG, Permission.Read)]
  public async Task<string?> ProposeNewInternalCodeSubCategory(
      string parentInternalCode,
      string[] additionallyOccupiedCodes,
      [Service] ICodeSuggestor<CatalogueSubCategory> codeSuggestor)
      => await codeSuggestor.SuggestNextCode(parentInternalCode, additionallyOccupiedCodes);

  [BackOfficePermission(Features.ASST_CATALOGUE_CONFIG, Permission.Read)]
  public async Task<bool> CanUseInternalCode(
    string internalCode,
    int? currentCatalogueCategoryId,
    [Service] IReadRepository<CatalogueCategory> repository,
    CancellationToken cancellationToken = default)
  {
    var isCodeInUse = currentCatalogueCategoryId.HasValue
      ? await repository
          .AsQueryable(
            new GetByInternalCodeSpec<CatalogueCategory>(internalCode.Trim()),
            new ExcludeByIdSpec<CatalogueCategory>(currentCatalogueCategoryId.Value))
          .AnyAsync(cancellationToken)
      : await repository.AnyAsync(new GetByInternalCodeSpec<CatalogueCategory>(internalCode.Trim()), cancellationToken);

    return !isCodeInUse;
  }

  [BackOfficePermission(Features.ASST_CATALOGUE_CONFIG, Permission.Read)]
  public async Task<bool> CanUseInternalCodeSubCategory(
    string internalCode,
    int? catalogueCategoryId,
    int? currentCatalogueSubCategoryId,
    [Service] IReadRepository<CatalogueCategory> repository,
    CancellationToken cancellationToken = default)
  {
    var catalogueCategory = await repository.AsQueryable(new GetByIdSpec<CatalogueCategory>(catalogueCategoryId ?? 0), new CatalogueCategoryIncludeAllSpec())
                                            .SingleOrDefaultAsync(cancellationToken);

    if (catalogueCategory is null || !catalogueCategory.SubCategories.Any()) return true;

    if (currentCatalogueSubCategoryId.HasValue)
      return !catalogueCategory.SubCategories.AsQueryable().Any(sub => sub.InternalCode == internalCode && sub.Id != currentCatalogueSubCategoryId.Value);
    else
      return !catalogueCategory.SubCategories.AsQueryable()
              .Any(sub => sub.InternalCode == internalCode && (currentCatalogueSubCategoryId.HasValue ? sub.Id != currentCatalogueSubCategoryId : true));
  }
}
