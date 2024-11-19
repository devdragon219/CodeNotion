using HotChocolate.Resolvers;
using Microsoft.Extensions.Caching.Memory;
using RealGimm.Core.Asst.FunctionAreaAggregate;
using RealGimm.Core.IAM;
using RealGimm.Core.Shared.Interfaces;
using RealGimm.SharedKernel.Interfaces;
using RealGimm.WebCommons;
using RealGimm.WebCommons.Models;
using Microsoft.EntityFrameworkCore;
using RealGimm.Web.Asst.Queries.Filters;
using RealGimm.Web.Asst.Queries.Sorting;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Core;
using Microsoft.Extensions.Caching.Distributed;

namespace RealGimm.Web.Asst.Queries;

public class FunctionAreaQueries : QueriesBase
{
  [BackOfficePermission(Features.ASST_ESTATE_BASE, Permission.Read)]
  public async Task<string?> ProposeNewInternalCode(
    string[] additionallyOccupiedCodes,
    [Service] ICodeSuggestor<FunctionArea> codeSuggestor)
    => await codeSuggestor.SuggestNextCode(parentId: null, additionallyOccupiedCodes);

  [BackOfficePermission(Features.ASST_ESTATE_BASE, Permission.Read)]
  public async Task<bool> CanUseInternalCode(
    string internalCode,
    int? currentFunctionAreaId,
    [Service] IReadRepository<FunctionArea> repository,
    CancellationToken cancellationToken = default)
  {
    var isCodeInUse = currentFunctionAreaId.HasValue
      ? await repository
        .AsQueryable(
          new GetByInternalCodeSpec<FunctionArea>(internalCode.Trim()),
          new ExcludeByIdSpec<FunctionArea>(currentFunctionAreaId.Value))
        .AnyAsync(cancellationToken)
      : await repository.AnyAsync(new GetByInternalCodeSpec<FunctionArea>(internalCode.Trim()), cancellationToken);

    return !isCodeInUse;
  }

  [BackOfficePermission(Features.ASST_ESTATE_BASE, Permission.Read)]
  [UsePaging(IncludeTotalCount = true, MaxPageSize = 100)]
  [UseFiltering(typeof(FunctionAreaFilterType))]
  [UseSorting(typeof(FunctionAreaSortInputType))]
  public IQueryable<FunctionArea> ListFunctionAreas([Service] IReadRepository<FunctionArea> repository)
    => repository.AsQueryable();

  [BackOfficePermission(Features.ASST_ESTATE_BASE, Permission.Read)]
  [UseFiltering(typeof(FunctionAreaFilterType))]
  [UseSorting(typeof(FunctionAreaSortInputType))]
  public IQueryable<FunctionArea> ListFunctionAreasFull([Service] IReadRepository<FunctionArea> repository)
    => repository.AsQueryable();

  [BackOfficePermission(Features.ASST_ESTATE_BASE, Permission.Read)]
  [UseFiltering(typeof(FunctionAreaFilterType))]
  [UseSorting(typeof(FunctionAreaSortInputType))]
  public async Task<FileUrlOutput> ExportToExcel(
    [SchemaService] IResolverContext resolverContext,
    [Service] IDistributedCache distributedCache,
    [Service] IReadRepository<FunctionArea> repository,
    [Service] IExportService<FunctionArea> exportService,
    CancellationToken cancellationToken = default)
  {
    var functionAreas = await repository
      .AsQueryable()
      .Filter(resolverContext)
      .Sort(resolverContext)
      .ToArrayAsync(cancellationToken);

    return await ExportToExcelAsync(functionAreas, distributedCache, exportService, cancellationToken);
  }
}
