using HotChocolate.Resolvers;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Caching.Memory;
using RealGimm.Core;
using RealGimm.Core.Asst.CatalogueItemAggregate;
using RealGimm.Core.Asst.CatalogueItemAggregate.Specifications;
using RealGimm.Core.Asst.Interfaces;
using RealGimm.Core.IAM;
using RealGimm.SharedKernel;
using RealGimm.Web.Asst.Queries.Filters;
using RealGimm.Web.Asst.Queries.Sorting;
using RealGimm.WebCommons.Models;

namespace RealGimm.Web.Asst.Queries;

public class CatalogueQueries
{
  [BackOfficePermission(Features.ASST_ESTATE_CATALOGUE, Permission.Read)]
  public async Task<List<CatalogueItem>> Get(
    int estateId,
    int catalogueTypeId,
    [Service] IReadRepository<CatalogueItem> repository,
    CancellationToken cancellationToken = default)
    => await repository
      .AsQueryable(new CatalogueItemsByCatalogueIdSpec(new(estateId, catalogueTypeId)), new CatalogueItemIncludeAllSpec())
      .ToListAsync(cancellationToken);

  [BackOfficePermission(Features.ASST_ESTATE_CATALOGUE, Permission.Read)]
  [UsePaging(IncludeTotalCount = true, MaxPageSize = 100)]
  [UseFiltering(typeof(CatalogueOutputFilterType))]
  [UseSorting(typeof(CatalogueOutputSortInputType))]
  public async Task<IQueryable<CatalogueOutput>> ListCatalogues(
    [Service] ICatalogueService service,
    CancellationToken cancellationToken = default)
    => (await service.GetCatalogues(cancellationToken)).AsQueryable();

  [BackOfficePermission(Features.ASST_ESTATE_CATALOGUE, Permission.Read)]
  [UseFiltering(typeof(CatalogueOutputFilterType))]
  [UseSorting(typeof(CatalogueOutputSortInputType))]
  public async Task<FileUrlOutput> ExportToExcel(
    [Service] IDistributedCache distributedCache,
    [Service] ICatalogueService service,
    [SchemaService] IResolverContext resolverContext,
    CancellationToken cancellationToken = default)
  {
    var consistencyRows = await service.GetCatalogues(cancellationToken);
    var queryableResult = consistencyRows.AsQueryable()
      .Filter(resolverContext)
      .Sort(resolverContext)
      .ToArray();

    var fileEntry = await service.ExportToExcel(queryableResult, cancellationToken);
    var cacheEntryOptions = new DistributedCacheEntryOptions()
      .SetAbsoluteExpiration(Constants.DEFAULT_EXPORT_DURATION_EXCEL);

    var fileId = Guid.NewGuid();
    distributedCache.Set(fileId.ToString(),
      fileEntry.ToByteArray(),
      cacheEntryOptions);
    return new FileUrlOutput($"{QueriesBase.API_FILE_BASE}{fileId}");
  }
}
