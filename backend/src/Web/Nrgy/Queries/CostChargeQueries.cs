using RealGimm.Core.IAM;
using RealGimm.Core.Nrgy.CostChargeAggregate;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Core;
using RealGimm.WebCommons;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Nrgy.CostChargeAggregate.Specifications;
using HotChocolate.Resolvers;
using RealGimm.Web.Nrgy.Queries.Filters;
using RealGimm.Web.Nrgy.Queries.Sorting;
using Microsoft.Extensions.Caching.Distributed;
using RealGimm.Core.Shared.Interfaces;
using RealGimm.WebCommons.Models;
using RealGimm.Core.Nrgy.UtilityServiceAggregate;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Core.Nrgy.UtilityTypeAggregate;
using RealGimm.Core.Nrgy.Services;
using RealGimm.Core.Nrgy.CostChargeAnalysisAggregate;
using RealGimm.Web.Asst.Queries.Filters;
using RealGimm.Web.Asst.Queries.Sorting;
using RealGimm.Web.Nrgy.Models;
using RealGimm.SharedKernel;

namespace RealGimm.Web.Nrgy.Queries;

public class CostChargeQueries : QueriesBase
{
  [BackOfficePermission(Features.NRGY_COSTCHARGE_BASE, Permission.Read)]
  public async Task<CostCharge?> Get(int id,
    [Service] IReadRepository<CostCharge> repository,
    CancellationToken cancellationToken = default)
    => await repository.AsQueryable(new CostChargeIncludeAllSpec(), new GetByIdSpec<CostCharge>(id)).SingleOrDefaultAsync(cancellationToken);

  [BackOfficePermission(Features.NRGY_COSTCHARGE_BASE, Permission.Read)]
  [UsePaging(IncludeTotalCount = true, MaxPageSize = 100)]
  [UseProjection]
  [UseFiltering(typeof(CostChargeFilterType))]
  [UseSorting(typeof(CostChargeSortInputType))]
  public async Task<IQueryable<CostCharge>> ListCostCharges(
    [Service] RepositoryWebWrapper<CostCharge> repository,
    [SchemaService] IResolverContext? resolverContext)
    => await repository.ListAllAsync(resolverContext, new CostChargeIncludeAllSpec());

  [BackOfficePermission(Features.NRGY_COSTCHARGE_BASE, Permission.Read)]
  [UsePaging(IncludeTotalCount = true, MaxPageSize = 100)]
  [UseFiltering(typeof(EstateFilterType))]
  [UseSorting(typeof(EstateSortInputType))]
  public async Task<IQueryable<Estate>> GetFilteredEstates(
  CostChargeAnalysisFilters? filters,
  [Service] CostChargeAnalysisService analysisService,
  CancellationToken cancellationToken)
    => await analysisService.GetFilteredEstates(filters, cancellationToken);

  [BackOfficePermission(Features.NRGY_COSTCHARGE_BASE, Permission.Read)]
  [UsePaging(IncludeTotalCount = true, MaxPageSize = 100)]
  [UseFiltering(typeof(AsstAddressFilterType))]
  [UseSorting(typeof(AsstAddressSortInputType))]
  public async Task<IEnumerable<Address>> GetFilteredAddresses(
    CostChargeAnalysisFilters? filters,
    [Service] CostChargeAnalysisService analysisService,
    CancellationToken cancellationToken)
    => await analysisService.GetFilteredAddresses(filters, cancellationToken);

  [BackOfficePermission(Features.NRGY_COSTCHARGE_BASE, Permission.Read)]
  [UsePaging(IncludeTotalCount = true, MaxPageSize = 100)]
  [UseFiltering<FilteredCountyName>]
  [UseSorting<FilteredCountyName>]
  public async Task<IEnumerable<FilteredCountyName>> GetFilteredCountyNames(
    CostChargeAnalysisFilters? filters,
    [Service] CostChargeAnalysisService analysisService,
    CancellationToken cancellationToken)
    => (await analysisService.GetFilteredAddresses(filters, cancellationToken))
        .DistinctBy(address => address.CountyName)
        .Select(address => new FilteredCountyName(address.CountyName!));

  [BackOfficePermission(Features.NRGY_COSTCHARGE_BASE, Permission.Read)]
  [UsePaging(IncludeTotalCount = true, MaxPageSize = 100)]
  [UseFiltering<FilteredCityName>]
  [UseSorting<FilteredCityName>]
  public async Task<IEnumerable<FilteredCityName>> GetFilteredCityNames(
    CostChargeAnalysisFilters? filters,
    [Service] CostChargeAnalysisService analysisService,
    CancellationToken cancellationToken)
    => (await analysisService.GetFilteredAddresses(filters, cancellationToken))
        .DistinctBy(address => address.CityName)
        .Select(address => new FilteredCityName(address.CityName!));

  [BackOfficePermission(Features.NRGY_COSTCHARGE_BASE, Permission.Read)]
  [UsePaging(IncludeTotalCount = true, MaxPageSize = 100)]
  [UseFiltering(typeof(UtilityTypeFilterType))]
  [UseSorting(typeof(UtilityTypeSortInputType))]
  public async Task<IEnumerable<UtilityType>?> GetFilteredUtilityTypes(
    CostChargeAnalysisFilters? filters,
    [Service] CostChargeAnalysisService analysisService,
    CancellationToken cancellationToken)
    => await analysisService.GetFilteredUtilityTypes(filters, cancellationToken);

  [BackOfficePermission(Features.NRGY_COSTCHARGE_BASE, Permission.Read)]
  [UsePaging(IncludeTotalCount = true, MaxPageSize = 100)]
  [UseFiltering(typeof(UtilityServiceFilterType))]
  [UseSorting(typeof(UtilityServiceSortInputType))]
  public async Task<IEnumerable<UtilityService>?> GetFilteredUtilityServices(
    CostChargeAnalysisFilters? filters,
    [Service] CostChargeAnalysisService analysisService,
    CancellationToken cancellationToken)
    => await analysisService.GetFilteredUtilityServices(filters, cancellationToken);

  [BackOfficePermission(Features.NRGY_COSTCHARGE_BASE, Permission.Read)]
  public async Task<Dictionary<CostChargeAnalysisCategory, CostChargeAnalysis>> GetAnalysis(
    CostChargeAnalysisFilters filters,
    [Service] CostChargeAnalysisService analysisService,
    CancellationToken cancellationToken)
    => await analysisService.GetAnalysisAsync(filters, cancellationToken);

  [BackOfficePermission(Features.NRGY_COSTCHARGE_BASE, Permission.Read)]
  [UseFiltering(typeof(CostChargeFilterType))]
  [UseSorting(typeof(CostChargeSortInputType))]
  public async Task<FileUrlOutput> ExportToExcel(
    [SchemaService] IResolverContext resolverContext,
    [Service] RepositoryWebWrapper<CostCharge> repository,
    [Service] IExportService<CostCharge> exportService,
    [Service] IDistributedCache distributedCache,
    CancellationToken cancellationToken = default)
  {
    var costCharges = await (await repository.ListAllAsync(resolverContext, new CostChargeIncludeAllSpec())).ToListAsync(cancellationToken);
    return await ExportToExcelAsync(costCharges, distributedCache, exportService, cancellationToken);
  }

  [BackOfficePermission(Features.NRGY_COSTCHARGE_BASE, Permission.Read)]
  public FileUrlOutput GetTemplateOfImportFromExcel(
    [Service] CostChargeImportService costChargeImportService,
    [Service] IDistributedCache distributedCache)
  {
    var fileEntry = costChargeImportService.GenerateExcelTemplate();
    var fileId = Guid.NewGuid();
    var cacheEntryOptions = new DistributedCacheEntryOptions().SetAbsoluteExpiration(Constants.DEFAULT_IMPORT_TEMPLATE_DURATION);

    distributedCache.Set(fileId.ToString(), fileEntry.ToByteArray(), cacheEntryOptions);

    return new FileUrlOutput($"{API_FILE_BASE}{fileId}");
  }

  [BackOfficePermission(Features.NRGY_COSTCHARGE_BASE, Permission.Read)]
  public FileUrlOutput GetTemplateOfImportFromCsv(
    [Service] CostChargeImportService costChargeImportService,
    [Service] IDistributedCache distributedCache)
  {
    var fileEntry = costChargeImportService.GenerateCsvTemplate();
    var fileId = Guid.NewGuid();
    var cacheEntryOptions = new DistributedCacheEntryOptions().SetAbsoluteExpiration(Constants.DEFAULT_IMPORT_TEMPLATE_DURATION);

    distributedCache.Set(fileId.ToString(), fileEntry.ToByteArray(), cacheEntryOptions);

    return new FileUrlOutput($"{API_FILE_BASE}{fileId}");
  }
}
