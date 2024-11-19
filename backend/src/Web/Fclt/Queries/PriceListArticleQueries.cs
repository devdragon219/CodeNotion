using RealGimm.Core.IAM;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Core;
using RealGimm.Core.Fclt.PriceListArticleAggregate;
using RealGimm.Web.Fclt.Queries.Filters;
using RealGimm.Web.Fclt.Queries.Sorting;
using RealGimm.SharedKernel.Interfaces;
using HotChocolate.Resolvers;
using Microsoft.Extensions.Caching.Distributed;
using RealGimm.Core.Shared.Interfaces;
using RealGimm.WebCommons.Models;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Fclt.PriceListArticleAggregate.Specifications;
using RealGimm.Core.Fclt.Services;
using DocumentFormat.OpenXml.Spreadsheet;
using RealGimm.Core.Shared.Services;
using System.Threading;
using RealGimm.SharedKernel;

namespace RealGimm.Web.Fclt.Queries;

public class PriceListArticleQueries : QueriesBase
{
  [BackOfficePermission(Features.FCLT_PRICE_LIST_ARTICLES, Permission.Read)]
  public async Task<PriceListArticle?> Get(
    int id,
    [Service] IReadRepository<PriceListArticle> repository,
    CancellationToken cancellationToken = default)
    => await repository
        .AsQueryable(new GetByIdSpec<PriceListArticle>(id), new PriceListArticleIncludeAllSpec())
        .SingleOrDefaultAsync(cancellationToken);

  [BackOfficePermission(Features.FCLT_PRICE_LIST_ARTICLES, Permission.Read)]
  [UsePaging(IncludeTotalCount = true, MaxPageSize = 100)]
  [UseFiltering(typeof(PriceListArticleFilterType))]
  [UseSorting(typeof(PriceListArticleSortInputType))]
  public IQueryable<PriceListArticle> ListPriceListArticles([Service] IReadRepository<PriceListArticle> repository)
    => repository.AsQueryable(new PriceListArticleIncludeForListSpec());

  [BackOfficePermission(Features.FCLT_PRICE_LIST_ARTICLES, Permission.Read)]
  [UseFiltering(typeof(PriceListArticleFilterType))]
  [UseSorting(typeof(PriceListArticleSortInputType))]
  public IQueryable<PriceListArticle> ListPriceListArticlesFull([Service] IReadRepository<PriceListArticle> repository)
    => repository.AsQueryable(new PriceListArticleIncludeForListSpec());

  [BackOfficePermission(Features.FCLT_PRICE_LIST_ARTICLES, Permission.Read)]
  public Task<string?> ProposeNewInternalCode([Service] ICodeSuggestor<PriceListArticle> codeSuggestor)
    => codeSuggestor.SuggestNextCode(null, (PriceListArticle?)null);

  [BackOfficePermission(Features.FCLT_PRICE_LIST_ARTICLES, Permission.Read)]
  public Task<bool> CanUseInternalCode(
    string internalCode,
    int? currentPriceListArticleId,
    [Service] IReadRepository<PriceListArticle> repository,
    CancellationToken cancellationToken = default)
    => CanUseInternalCode<PriceListArticle>(internalCode, currentPriceListArticleId, repository, cancellationToken);

  [BackOfficePermission(Features.FCLT_PRICE_LIST_ARTICLES, Permission.Read)]
  [UseFiltering(typeof(PriceListArticleFilterType))]
  [UseSorting(typeof(PriceListArticleSortInputType))]
  public async Task<FileUrlOutput> ExportToExcel(
    [SchemaService] IResolverContext resolverContext,
    [Service] IDistributedCache distributedCache,
    [Service] IReadRepository<PriceListArticle> repository,
    [Service] IExportService<PriceListArticle> exportService,
    CancellationToken cancellationToken = default)
  {
    var priceListArticles = await repository
      .AsQueryable(new PriceListArticleIncludeForExportToExcelSpec())
      .Filter(resolverContext)
      .Sort(resolverContext)
      .ToArrayAsync(cancellationToken);

    return await ExportToExcelAsync(priceListArticles, distributedCache, exportService, cancellationToken);
  }

  [BackOfficePermission(Features.FCLT_PRICE_LIST_ARTICLES, Permission.Read)]
  public FileUrlOutput GetTemplateOfImportFromExcel(
    [Service] PriceListArticleImportService priceListArticleImportService,
    [Service] IDistributedCache distributedCache)
  {
    var fileEntry = priceListArticleImportService.GenerateTemplate();
    var fileId = Guid.NewGuid();
    var cacheEntryOptions = new DistributedCacheEntryOptions().SetAbsoluteExpiration(Constants.DEFAULT_IMPORT_TEMPLATE_DURATION);

    distributedCache.Set(fileId.ToString(), fileEntry.ToByteArray(), cacheEntryOptions);

    return new FileUrlOutput($"{API_FILE_BASE}{fileId}");
  }
}
