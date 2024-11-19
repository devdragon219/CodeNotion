using HotChocolate.Resolvers;
using Microsoft.Extensions.Caching.Distributed;
using RealGimm.Core;
using RealGimm.Core.Asst.CadastralLandCategoryAggregate;
using RealGimm.Core.IAM;
using RealGimm.Core.Shared.Interfaces;
using RealGimm.Core.Shared.Specifications;
using RealGimm.SharedKernel.Interfaces;
using RealGimm.Web.Asst.Queries.Filters;
using RealGimm.Web.Asst.Queries.Sorting;
using RealGimm.WebCommons;
using RealGimm.WebCommons.Models;

namespace RealGimm.Web.Asst.Queries;

public class  CadastralLandCategoryQueries : QueriesBase
{
  [BackOfficePermission(Features.ASST_CADASTRAL_LAND_CATEGORY, Permission.Read)]
  public async Task<CadastralLandCategory?> Get(
    int id,
    [Service] IReadRepository<CadastralLandCategory> repository,
    CancellationToken cancellationToken = default)
    => await repository.SingleOrDefaultAsync(new GetByIdSpec<CadastralLandCategory>(id), cancellationToken);

  [BackOfficePermission(Features.ASST_CADASTRAL_LAND_CATEGORY, Permission.Read)]
  [UsePaging(IncludeTotalCount = true, MaxPageSize = 100)]
  [UseFiltering(typeof(CadastralLandCategoryFilterType))]
  [UseSorting(typeof(CadastralLandCategorySortInputType))]
  public async Task<IQueryable<CadastralLandCategory>> CadastralLandCategories(
    [Service] RepositoryWebWrapper<CadastralLandCategory> repository,
    [SchemaService] IResolverContext? resolverContext) => await repository.ListAllAsync(resolverContext);

  [BackOfficePermission(Features.ASST_CADASTRAL_LAND_CATEGORY, Permission.Read)]
  public Task<string?> ProposeNewInternalCode([Service] ICodeSuggestor<CadastralLandCategory> codeSuggestor)
    => codeSuggestor.SuggestNextCode(null, partialEntity: null);

  [BackOfficePermission(Features.ASST_CADASTRAL_LAND_CATEGORY, Permission.Read)]
  public Task<bool> CanUseInternalCode(
    string internalCode,
    int? currentCadastralLandCategoryId,
    [Service] IReadRepository<CadastralLandCategory> repository,
    CancellationToken cancellationToken = default)
    => base.CanUseInternalCode(internalCode, currentCadastralLandCategoryId, repository, cancellationToken);

  [BackOfficePermission(Features.ASST_ESTATE_BASE, Permission.Read)]
  [UseFiltering(typeof(CadastralLandCategoryFilterType))]
  [UseSorting(typeof(CadastralLandCategorySortInputType))]
  public async Task<FileUrlOutput> ExportToExcel(
    [SchemaService] IResolverContext resolverContext,
    [Service] RepositoryWebWrapper<CadastralLandCategory> repository,
    [Service] IExportService<CadastralLandCategory> exportService,
    [Service] IDistributedCache distributedCache,
    CancellationToken cancellationToken = default)
  {
    var cadastralLandCategories = await repository.ListAllAsync(resolverContext);
    return await ExportToExcelAsync(cadastralLandCategories, distributedCache, exportService, cancellationToken);
  }
}

