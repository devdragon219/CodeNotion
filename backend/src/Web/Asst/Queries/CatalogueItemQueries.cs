using RealGimm.Core.Shared.Specifications;
using RealGimm.Web.Asst.Queries.Filters;
using RealGimm.Web.Asst.Queries.Sorting;
using RealGimm.Core.Asst.CatalogueItemAggregate;
using RealGimm.SharedKernel.Interfaces;
using RealGimm.Core.Asst.CatalogueItemAggregate.Specifications;
using RealGimm.Core.IAM;
using Microsoft.EntityFrameworkCore;
using RealGimm.WebCommons;
using HotChocolate.Resolvers;
using RealGimm.Core.Shared.Interfaces;
using RealGimm.WebCommons.Models;
using RealGimm.Core;
using Microsoft.Extensions.Caching.Distributed;

namespace RealGimm.Web.Asst.Queries;

public class CatalogueItemQueries : QueriesBase
{
  [BackOfficePermission(Features.ASST_ESTATE_CATALOGUE, Permission.Read)]
  public async Task<CatalogueItem?> Get(
    int id,
    [Service] IReadRepository<CatalogueItem> repository,
    CancellationToken cancellationToken = default)
    => await repository
      .AsQueryable(new GetByIdSpec<CatalogueItem>(id), new CatalogueItemIncludeAllSpec())
      .SingleOrDefaultAsync(cancellationToken);

  [BackOfficePermission(Features.ASST_ESTATE_CATALOGUE, Permission.Read)]
  [UsePaging(IncludeTotalCount = true, MaxPageSize = 100)]
  [UseFiltering(typeof(CatalogueItemFilterType))]
  [UseSorting(typeof(CatalogueItemSortInputType))]
  public IQueryable<CatalogueItem> ListCatalogueItems([Service] IReadRepository<CatalogueItem> repository)
    => repository.AsQueryable(new CatalogueItemIncludeAllSpec());

  [BackOfficePermission(Features.ASST_ESTATE_CATALOGUE, Permission.Read)]
  [UseFiltering(typeof(CatalogueItemFilterType))]
  [UseSorting(typeof(CatalogueItemSortInputType))]
  public IQueryable<CatalogueItem> ListCatalogueItemsFull([Service] IReadRepository<CatalogueItem> repository)
    => repository.AsQueryable(new CatalogueItemIncludeAllSpec());

  [BackOfficePermission(Features.ASST_ESTATE_CATALOGUE, Permission.Read)]
  public async Task<string?> ProposeNewInternalCode(
    string[] additionallyOccupiedCodes,
    [Service] ICodeSuggestor<CatalogueItem> codeSuggestor)
    => await codeSuggestor.SuggestNextCode(parentId: null, additionallyOccupiedCodes);

  [BackOfficePermission(Features.ASST_ESTATE_CATALOGUE, Permission.Read)]
  public async Task<bool> CanUseInternalCode(
    string internalCode,
    int? currentCatalogueItemId,
    [Service] IReadRepository<CatalogueItem> repository,
    CancellationToken cancellationToken = default)
  {
    var isCodeInUse = currentCatalogueItemId.HasValue
      ? await repository
          .AsQueryable(
            new GetByInternalCodeSpec<CatalogueItem>(internalCode.Trim()),
            new ExcludeByIdSpec<CatalogueItem>(currentCatalogueItemId.Value))
          .AnyAsync(cancellationToken)
      : await repository.AnyAsync(new GetByInternalCodeSpec<CatalogueItem>(internalCode.Trim()), cancellationToken);

    return !isCodeInUse;
  }

  [BackOfficePermission(Features.ASST_ESTATE_CATALOGUE, Permission.Read)]
  [UseFiltering(typeof(CatalogueItemFilterType))]
  [UseSorting(typeof(CatalogueItemSortInputType))]
  public async Task<FileUrlOutput> ExportToExcel(
    [SchemaService] IResolverContext resolverContext,
    [Service] IReadRepository<CatalogueItem> repository,
    [Service] IDistributedCache distributedCache,
    [Service] IExportService<CatalogueItem> exportService,
    CancellationToken cancellationToken = default)
  {
    var items = await repository
      .AsQueryable(new CatalogueItemIncludeAllSpec())
      .Filter(resolverContext)
      .Sort(resolverContext)
      .ToListAsync(cancellationToken);

    return await ExportToExcelAsync(items, distributedCache, exportService, cancellationToken);
  }
}
