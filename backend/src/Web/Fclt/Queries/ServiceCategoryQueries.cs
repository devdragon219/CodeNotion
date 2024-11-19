using HotChocolate.Resolvers;
using RealGimm.Core.IAM;
using RealGimm.Core.Fclt.ServiceCategoryAggregate;
using RealGimm.SharedKernel.Interfaces;
using RealGimm.Core.Fclt.ServiceCategoryAggregate.Specifications;
using RealGimm.Web.Fclt.Queries.Filters;
using RealGimm.Web.Fclt.Queries.Sorting;
using RealGimm.Core.Shared.Specifications;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Distributed;
using RealGimm.Core;
using RealGimm.Core.Shared.Interfaces;
using RealGimm.WebCommons.Models;

namespace RealGimm.Web.Fclt.Queries;

public class ServiceCategoryQueries : QueriesBase
{
  [BackOfficePermission(Features.FCLT_SERVICE_CATEGORY, Permission.Read)]
  public async Task<ServiceCategory?> Get(
    int id,
    [Service] IReadRepository<ServiceCategory> repository,
    CancellationToken cancellationToken = default)
    => await repository
      .AsQueryable(new GetByIdSpec<ServiceCategory>(id), new ServiceCategoryIncludeAllSpec())
      .SingleOrDefaultAsync(cancellationToken);

  [BackOfficePermission(Features.FCLT_SERVICE_CATEGORY, Permission.Read)]
  [UsePaging(IncludeTotalCount = true, MaxPageSize = 100)]
  [UseFiltering(typeof(ServiceCategoryFilterType))]
  [UseSorting(typeof(ServiceCategorySortInputType))]
  public IQueryable<ServiceCategory> ListServiceCategories([Service] IReadRepository<ServiceCategory> repository)
    => repository.AsQueryable(new ServiceCategoryIncludeAllSpec());

  [BackOfficePermission(Features.FCLT_SERVICE_CATEGORY, Permission.Read)]
  [UsePaging(IncludeTotalCount = true, MaxPageSize = 100)]
  [UseFiltering]
  [UseSorting]
  public IQueryable<ServiceSubCategory> ListServiceSubCategories(
    int? serviceCategoryId,
    [Service] IReadRepository<ServiceCategory> repository)
  {
    var serviceCategorySpecifications = serviceCategoryId.HasValue
      ? new[] { new GetByIdSpec<ServiceCategory>(serviceCategoryId.Value) }
      : [];

    return repository
      .AsQueryable(serviceCategorySpecifications)
      .SelectMany(category => category.SubCategories);
  }

  [BackOfficePermission(Features.FCLT_SERVICE_CATEGORY, Permission.Read)]
  public async Task<string?> ProposeNewInternalCode([Service] ICodeSuggestor<ServiceCategory> codeSuggestor)
    => await codeSuggestor.SuggestNextCode(null, (ServiceCategory?)null);

  [BackOfficePermission(Features.FCLT_SERVICE_CATEGORY, Permission.Read)]
  public async Task<string?> ProposeNewInternalCodeSubCategory(
    string parentInternalCode,
    string[] additionallyOccupiedCodes,
    [Service] ICodeSuggestor<ServiceSubCategory> codeSuggestor)
    => await codeSuggestor.SuggestNextCode(parentInternalCode, additionallyOccupiedCodes);

  [BackOfficePermission(Features.FCLT_SERVICE_CATEGORY, Permission.Read)]
  public async Task<bool> CanUseInternalCode(
    string internalCode,
    int? currentServiceCategoryId,
    [Service] IReadRepository<ServiceCategory> repository,
    CancellationToken cancellationToken = default)
  {
    var isCodeInUse = currentServiceCategoryId.HasValue
      ? await repository
        .AsQueryable(
          new GetByInternalCodeSpec<ServiceCategory>(internalCode.Trim()),
          new ExcludeByIdSpec<ServiceCategory>(currentServiceCategoryId.Value))
        .AnyAsync(cancellationToken)
      : await repository.AnyAsync(new GetByInternalCodeSpec<ServiceCategory>(internalCode.Trim()), cancellationToken);

    return !isCodeInUse;
  }

  [BackOfficePermission(Features.FCLT_SERVICE_CATEGORY, Permission.Read)]
  public async Task<bool> CanUseInternalCodeSubCategory(
    string internalCode,
    int? serviceCategoryId,
    int? currentServiceSubCategoryId,
    [Service] IReadRepository<ServiceCategory> repository,
    CancellationToken cancellationToken = default)
  {
    var serviceCategory = await repository.AsQueryable(new GetByIdSpec<ServiceCategory>(serviceCategoryId ?? 0), new ServiceCategoryIncludeAllSpec())
      .SingleOrDefaultAsync(cancellationToken);

    if (serviceCategory is null || !serviceCategory.SubCategories.Any()) return true;

    if (currentServiceSubCategoryId.HasValue)
      return !serviceCategory.SubCategories.AsQueryable().Any(sub => sub.InternalCode == internalCode && sub.Id != currentServiceSubCategoryId.Value);
    else
      return !serviceCategory.SubCategories.AsQueryable()
        .Any(sub => sub.InternalCode == internalCode && (currentServiceSubCategoryId.HasValue ? sub.Id != currentServiceSubCategoryId : true));
  }

  [BackOfficePermission(Features.FCLT_SERVICE_CATEGORY, Permission.Read)]
  [UseFiltering(typeof(ServiceCategoryFilterType))]
  [UseSorting(typeof(ServiceCategorySortInputType))]
  public async Task<FileUrlOutput> ExportToExcel(
    [SchemaService] IResolverContext resolverContext,
    [Service] IDistributedCache distributedCache,
    [Service] IReadRepository<ServiceCategory> repository,
    [Service] IExportService<ServiceCategory> exportService,
    CancellationToken cancellationToken = default)
  {
    var services = await repository
      .AsQueryable(new ServiceCategoryIncludeAllSpec())
      .Filter(resolverContext)
      .Sort(resolverContext)
      .ToArrayAsync(cancellationToken);

    return await ExportToExcelAsync(services, distributedCache, exportService, cancellationToken);
  }
}
