using HotChocolate.Resolvers;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Web.Asst.Queries.Filters;
using RealGimm.Web.Asst.Queries.Sorting;
using RealGimm.Core.Asst.CatalogueTypeAggregate;
using RealGimm.SharedKernel.Interfaces;
using RealGimm.Core.Asst.CatalogueTypeAggregate.Specifications;
using RealGimm.Core.IAM;
using Microsoft.EntityFrameworkCore;
using RealGimm.WebCommons.Models;
using Microsoft.Extensions.Caching.Memory;
using RealGimm.Core.Shared.Interfaces;
using RealGimm.WebCommons;
using RealGimm.Core;
using Microsoft.Extensions.Caching.Distributed;

namespace RealGimm.Web.Asst.Queries;

public class CatalogueTypeQueries : QueriesBase
{
  [BackOfficePermission(Features.ASST_CATALOGUE_CONFIG, Permission.Read)]
  public async Task<CatalogueType?> Get(
    int id,
    [Service] IReadRepository<CatalogueType> repository,
    CancellationToken cancellationToken = default)
    => await repository
      .AsQueryable(new GetByIdSpec<CatalogueType>(id), new CatalogueTypeIncludeAllSpec())
      .SingleOrDefaultAsync(cancellationToken);

  [BackOfficePermission(Features.ASST_CATALOGUE_CONFIG, Permission.Read)]
  [UsePaging(IncludeTotalCount = true, MaxPageSize = 100)]
  [UseFiltering(typeof(CatalogueTypeFilterType))]
  [UseSorting(typeof(CatalogueTypeSortInputType))]
  public IQueryable<CatalogueType> ListCatalogueTypes(
    int[]? keepTopIds,
    [Service] IReadRepository<CatalogueType> repository)
    => repository.AsQueryable(new CatalogueTypeIncludeAllSpec(), new CatalogueTypeKeepTopIdsSpec(keepTopIds));

  [BackOfficePermission(Features.ASST_CATALOGUE_CONFIG, Permission.Read)]
  [UseFiltering(typeof(CatalogueTypeFilterType))]
  [UseSorting(typeof(CatalogueTypeSortInputType))]
  public IQueryable<CatalogueType> ListCatalogueTypesFull([Service] IReadRepository<CatalogueType> repository)
    => repository.AsQueryable(new CatalogueTypeIncludeAllSpec());

  [BackOfficePermission(Features.ASST_CATALOGUE_CONFIG, Permission.Read)]
  [UseFiltering(typeof(CatalogueTypeFilterType))]
  [UseSorting(typeof(CatalogueTypeSortInputType))]
  public async Task<FileUrlOutput> ExportToExcel(
    [SchemaService] IResolverContext resolverContext,
    [Service] RepositoryWebWrapper<CatalogueType> repository,
    [Service] IDistributedCache distributedCache,
    [Service] IExportService<CatalogueType> exportService,
    CancellationToken cancellationToken = default)
  {
    var catalogueTypes = await (await repository
      .ListAllAsync(resolverContext, new CatalogueTypeIncludeAllSpec()))
      .ToArrayAsync(cancellationToken);

    return await ExportToExcelAsync(catalogueTypes, distributedCache, exportService, cancellationToken);
  }

  [BackOfficePermission(Features.ASST_CATALOGUE_CONFIG, Permission.Read)]
  public async Task<string?> ProposeNewInternalCode([Service] ICodeSuggestor<CatalogueType> codeSuggestor)
    => await codeSuggestor.SuggestNextCode(null, (CatalogueType?)null);

  [BackOfficePermission(Features.ASST_CATALOGUE_CONFIG, Permission.Read)]
  public async Task<bool> CanUseInternalCode(
    string internalCode,
    int? currentCatalogueTypeId,
    [Service] IReadRepository<CatalogueType> repository,
    CancellationToken cancellationToken = default)
  {
    var isCodeInUse = currentCatalogueTypeId.HasValue
      ? await repository
          .AsQueryable(
            new GetByInternalCodeSpec<CatalogueType>(internalCode.Trim()),
            new ExcludeByIdSpec<CatalogueType>(currentCatalogueTypeId.Value))
          .AnyAsync(cancellationToken)
      : await repository.AnyAsync(new GetByInternalCodeSpec<CatalogueType>(internalCode.Trim()), cancellationToken);

    return !isCodeInUse;
  }
}
