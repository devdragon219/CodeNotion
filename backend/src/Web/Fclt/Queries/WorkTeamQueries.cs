using RealGimm.Core.IAM;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Core;
using RealGimm.Core.Fclt.WorkTeamAggregate;
using RealGimm.Web.Fclt.Queries.Filters;
using RealGimm.Web.Fclt.Queries.Sorting;
using RealGimm.SharedKernel.Interfaces;
using RealGimm.WebCommons;
using HotChocolate.Resolvers;
using Microsoft.Extensions.Caching.Distributed;
using RealGimm.Core.Shared.Interfaces;
using RealGimm.WebCommons.Models;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Fclt.WorkTeamAggregate.Specifications;
using RealGimm.WebCommons.Extensions;

namespace RealGimm.Web.Fclt.Queries;

public class WorkTeamQueries : QueriesBase
{
  [BackOfficePermission(Features.FCLT_CONFIG, Permission.Read)]
  public async Task<WorkTeam?> Get(
    int id,
    [Service] IReadRepository<WorkTeam> repository,
    CancellationToken cancellationToken = default)
    => await repository
        .AsQueryable(new GetByIdSpec<WorkTeam>(id), new WorkTeamIncludeAllSpec())
        .SingleOrDefaultAsync(cancellationToken);

  [BackOfficePermission(Features.FCLT_CONFIG, Permission.Read)]
  [UsePaging(IncludeTotalCount = true, MaxPageSize = 100)]
  [UseFiltering(typeof(WorkTeamFilterType))]
  [UseSorting(typeof(WorkTeamSortInputType))]
  public Task<IQueryable<WorkTeam>> ListWorkTeams(
    [Service] IReadRepository<WorkTeam> repository,
    [SchemaService] IResolverContext resolverContext)
    => repository.AsQueryable(new WorkTeamIncludeForListSpec()).MaterializeIfRequiredAsync(resolverContext);

  [BackOfficePermission(Features.FCLT_CONFIG, Permission.Read)]
  public Task<string?> ProposeNewInternalCode([Service] ICodeSuggestor<WorkTeam> codeSuggestor)
    => codeSuggestor.SuggestNextCode(null, (WorkTeam?)null);

  [BackOfficePermission(Features.FCLT_CONFIG, Permission.Read)]
  public Task<bool> CanUseInternalCode(
    string internalCode,
    int? currentWorkTeamId,
    [Service] IReadRepository<WorkTeam> repository,
    CancellationToken cancellationToken = default)
    => CanUseInternalCode<WorkTeam>(internalCode, currentWorkTeamId, repository, cancellationToken);

  [BackOfficePermission(Features.FCLT_CONFIG, Permission.Read)]
  [UseFiltering(typeof(WorkTeamFilterType))]
  [UseSorting(typeof(WorkTeamSortInputType))]
  public async Task<FileUrlOutput> ExportToExcel(
    [SchemaService] IResolverContext resolverContext,
    [Service] IDistributedCache distributedCache,
    [Service] IReadRepository<WorkTeam> repository,
    [Service] IExportService<WorkTeam> exportService,
    CancellationToken cancellationToken = default)
  {
    var query = await repository
      .AsQueryable(new WorkTeamIncludeForExportToExcelSpec())
      .MaterializeIfRequiredAsync(resolverContext);

    var workTeams = await query.ToArrayAsync(cancellationToken);

    return await ExportToExcelAsync(workTeams, distributedCache, exportService, cancellationToken);
  }
}
