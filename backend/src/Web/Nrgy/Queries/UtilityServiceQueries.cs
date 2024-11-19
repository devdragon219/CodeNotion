using HotChocolate.Resolvers;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Distributed;
using RealGimm.Core;
using RealGimm.Core.IAM;
using RealGimm.Core.Nrgy.UtilityServiceAggregate;
using RealGimm.Core.Nrgy.UtilityServiceAggregate.Specifications;
using RealGimm.Core.Shared.Interfaces;
using RealGimm.Core.Shared.Specifications;
using RealGimm.SharedKernel.Interfaces;
using RealGimm.Web.Nrgy.Queries.Filters;
using RealGimm.Web.Nrgy.Queries.Sorting;
using RealGimm.WebCommons;
using RealGimm.WebCommons.Models;

namespace RealGimm.Web.Nrgy.Queries;

public class UtilityServiceQueries : QueriesBase
{
  [BackOfficePermission(Features.NRGY_SERVICE_BASE, Permission.Read)]
  public async Task<UtilityService?> Get(int id,
    [Service] IReadRepository<UtilityService> repository,
    CancellationToken cancellationToken = default)
    => await repository.AsQueryable(new UtilityServiceIncludeAllSpec(), new GetByIdSpec<UtilityService>(id))
      .SingleOrDefaultAsync(cancellationToken);

  [BackOfficePermission(Features.NRGY_SERVICE_BASE, Permission.Read)]
  [UsePaging(IncludeTotalCount = true, MaxPageSize = 100)]
  [UseFiltering(typeof(UtilityServiceFilterType))]
  [UseSorting(typeof(UtilityServiceSortInputType))]
  public async Task<IQueryable<UtilityService>> ListUtilityServices(
    [Service] RepositoryWebWrapper<UtilityService> repository,
    [SchemaService] IResolverContext? resolverContext)
    => await repository.ListAllAsync(resolverContext, new UtilityServiceIncludeAllSpec());

  [BackOfficePermission(Features.NRGY_TYPE_BASE, Permission.Read)]
  public Task<string?> ProposeNewInternalCode([Service] ICodeSuggestor<UtilityService> codeSuggestor)
    => codeSuggestor.SuggestNextCode(null, (UtilityService?)null);

  [BackOfficePermission(Features.NRGY_TYPE_BASE, Permission.Read)]
  public Task<bool> CanUseInternalCode(
    string internalCode,
    int? currentUtilityServiceId,
    [Service] IReadRepository<UtilityService> repository,
    CancellationToken cancellationToken = default)
    => CanUseInternalCode<UtilityService>(internalCode, currentUtilityServiceId, repository, cancellationToken);

  [BackOfficePermission(Features.NRGY_TYPE_BASE, Permission.Read)]
  [UseFiltering(typeof(UtilityServiceFilterType))]
  [UseSorting(typeof(UtilityServiceSortInputType))]
  public async Task<FileUrlOutput> ExportToExcel(
    [SchemaService] IResolverContext resolverContext,
    [Service] RepositoryWebWrapper<UtilityService> repository,
    [Service] IExportService<UtilityService> exportService,
    [Service] IDistributedCache distributedCache,
    CancellationToken cancellationToken = default)
  {
    var utilityServices = (await repository.ListAllAsync(resolverContext, new UtilityServiceIncludeAllSpec())).ToArray();
    return await ExportToExcelAsync(utilityServices, distributedCache, exportService, cancellationToken);
  }
}
