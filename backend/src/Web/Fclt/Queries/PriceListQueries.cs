using RealGimm.Core.IAM;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Core;
using RealGimm.Core.Fclt.PriceListAggregate;
using RealGimm.Web.Fclt.Queries.Filters;
using RealGimm.Web.Fclt.Queries.Sorting;
using RealGimm.SharedKernel.Interfaces;
using HotChocolate.Resolvers;
using Microsoft.Extensions.Caching.Distributed;
using RealGimm.Core.Shared.Interfaces;
using RealGimm.WebCommons.Models;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Fclt.PriceListAggregate.Specifications;

namespace RealGimm.Web.Fclt.Queries;

public class PriceListQueries : QueriesBase
{
  [BackOfficePermission(Features.FCLT_PRICE_LIST_BASE, Permission.Read)]
  public async Task<PriceList?> Get(
    int id,
    [Service] IReadRepository<PriceList> repository,
    CancellationToken cancellationToken = default)
    => await repository
        .AsQueryable(new GetByIdSpec<PriceList>(id), new PriceListIncludeAllSpec())
        .SingleOrDefaultAsync(cancellationToken);

  [BackOfficePermission(Features.FCLT_PRICE_LIST_BASE, Permission.Read)]
  [UsePaging(IncludeTotalCount = true, MaxPageSize = 100)]
  [UseFiltering(typeof(PriceListFilterType))]
  [UseSorting(typeof(PriceListSortInputType))]
  public IQueryable<PriceList> ListPriceLists([Service] IReadRepository<PriceList> repository)
    => repository.AsQueryable(new PriceListIncludeForListSpec());

  [BackOfficePermission(Features.FCLT_PRICE_LIST_BASE, Permission.Read)]
  [UseFiltering(typeof(PriceListFilterType))]
  [UseSorting(typeof(PriceListSortInputType))]
  public IQueryable<PriceList> ListPriceListsFull([Service] IReadRepository<PriceList> repository)
    => repository.AsQueryable(new PriceListIncludeForListSpec());

  [BackOfficePermission(Features.FCLT_PRICE_LIST_BASE, Permission.Read)]
  public Task<string?> ProposeNewInternalCode([Service] ICodeSuggestor<PriceList> codeSuggestor)
    => codeSuggestor.SuggestNextCode(null, (PriceList?)null);

  [BackOfficePermission(Features.FCLT_PRICE_LIST_BASE, Permission.Read)]
  public Task<bool> CanUseInternalCode(
    string internalCode,
    int? currentPriceListId,
    [Service] IReadRepository<PriceList> repository,
    CancellationToken cancellationToken = default)
    => CanUseInternalCode<PriceList>(internalCode, currentPriceListId, repository, cancellationToken);

  [BackOfficePermission(Features.FCLT_PRICE_LIST_BASE, Permission.Read)]
  [UseFiltering(typeof(PriceListFilterType))]
  [UseSorting(typeof(PriceListSortInputType))]
  public async Task<FileUrlOutput> ExportToExcel(
    [SchemaService] IResolverContext resolverContext,
    [Service] IDistributedCache distributedCache,
    [Service] IReadRepository<PriceList> repository,
    [Service] IExportService<PriceList> exportService,
    CancellationToken cancellationToken = default)
  {
    var priceLists = await repository
      .AsQueryable(new PriceListIncludeForExportToExcelSpec())
      .Filter(resolverContext)
      .Sort(resolverContext)
      .ToArrayAsync(cancellationToken);

    return await ExportToExcelAsync(priceLists, distributedCache, exportService, cancellationToken);
  }
}
