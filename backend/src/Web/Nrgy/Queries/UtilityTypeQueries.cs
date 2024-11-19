using HotChocolate.Resolvers;
using RealGimm.Core.IAM;
using RealGimm.WebCommons;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Core;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Nrgy.UtilityTypeAggregate;
using RealGimm.Web.Nrgy.Queries.Filters;
using RealGimm.Web.Nrgy.Queries.Sorting;
using RealGimm.Core.Nrgy.UtilityTypeAggregate.Specifications;
using RealGimm.WebCommons.Models;
using RealGimm.Core.Shared.Interfaces;
using Microsoft.Extensions.Caching.Distributed;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Web.Nrgy.Queries;

public class UtilityTypeQueries : QueriesBase
{
  [BackOfficePermission(Features.NRGY_TYPE_BASE, Permission.Read)]
  public async Task<UtilityType?> Get(int id, [Service] IReadRepository<UtilityType> repository, CancellationToken cancellationToken)
    => await repository.AsQueryable(new GetByIdSpec<UtilityType>(id)).SingleOrDefaultAsync(cancellationToken);

  [BackOfficePermission(Features.NRGY_TYPE_BASE, Permission.Read)]
  [UsePaging(IncludeTotalCount = true, MaxPageSize = 100)]
  [UseFiltering(typeof(UtilityTypeFilterType))]
  [UseSorting(typeof(UtilityTypeSortInputType))]
  public Task<IQueryable<UtilityType>> ListUtilityType(
    [Service] RepositoryWebWrapper<UtilityType> repository,
    [SchemaService] IResolverContext? resolverContext)
    => repository.ListAllAsync(resolverContext, new UtilityTypeIncludeAllSpec());

  [BackOfficePermission(Features.NRGY_TYPE_BASE, Permission.Read)]
  public Task<string?> ProposeNewInternalCode([Service] ICodeSuggestor<UtilityType> codeSuggestor)
    => codeSuggestor.SuggestNextCode(null, partialEntity: null);

  [BackOfficePermission(Features.NRGY_TYPE_BASE, Permission.Read)]
  public Task<bool> CanUseInternalCode(
    string internalCode,
    int? currentUtilityTypeId,
    [Service] IReadRepository<UtilityType> repository,
    CancellationToken cancellationToken = default)
    => base.CanUseInternalCode(internalCode, currentUtilityTypeId, repository, cancellationToken);

  [BackOfficePermission(Features.NRGY_TYPE_BASE, Permission.Read)]
  [UseFiltering(typeof(UtilityTypeFilterType))]
  [UseSorting(typeof(UtilityTypeSortInputType))]
  public async Task<FileUrlOutput> ExportToExcel(
    [SchemaService] IResolverContext resolverContext,
    [Service] IReadRepository<UtilityType> repository,
    [Service] IExportService<UtilityType> exportService,
    [Service] IDistributedCache distributedCache,
    CancellationToken cancellationToken = default)
  {
    var utilityTypes = await repository
      .AsQueryable()
      .Filter(resolverContext)
      .Sort(resolverContext)
      .ToListAsync(cancellationToken);

    return await ExportToExcelAsync(utilityTypes, distributedCache, exportService, cancellationToken);
  }
}
