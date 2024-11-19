using RealGimm.Core.IAM;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Core;
using RealGimm.Core.Fclt.TicketChecklistAggregate;
using RealGimm.Web.Fclt.Queries.Filters;
using RealGimm.Web.Fclt.Queries.Sorting;
using RealGimm.SharedKernel.Interfaces;
using RealGimm.WebCommons;
using HotChocolate.Resolvers;
using Microsoft.Extensions.Caching.Distributed;
using RealGimm.Core.Shared.Interfaces;
using RealGimm.WebCommons.Models;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Fclt.TicketChecklistAggregate.Specifications;
using RealGimm.WebCommons.Extensions;
using RealGimm.Web.Fclt.Models;

namespace RealGimm.Web.Fclt.Queries;

public class TicketChecklistQueries : QueriesBase
{
  [BackOfficePermission(Features.FCLT_CONTRACT_BASE, Permission.Read)]
  public async Task<TicketChecklist?> Get(
    int id,
    [Service] IReadRepository<TicketChecklist> repository,
    CancellationToken cancellationToken = default)
    => await repository
        .AsQueryable(new GetByIdSpec<TicketChecklist>(id), new TicketChecklistIncludeAllSpec())
        .SingleOrDefaultAsync(cancellationToken);

  [BackOfficePermission(Features.FCLT_CONTRACT_BASE, Permission.Read)]
  [UsePaging(IncludeTotalCount = true, MaxPageSize = 100)]
  [UseFiltering(typeof(TicketChecklistFilterType))]
  [UseSorting(typeof(TicketChecklistSortInputType))]
  public Task<IQueryable<TicketChecklist>> ListTicketChecklists(
    [Service] IReadRepository<TicketChecklist> repository,
    [SchemaService] IResolverContext resolverContext)
    => repository
        .AsQueryable(new TicketChecklistIncludeForListSpec())
        .MaterializeIfRequiredAsync(resolverContext);

  [BackOfficePermission(Features.FCLT_CONTRACT_BASE, Permission.Read)]
  [UsePaging(IncludeTotalCount = true, MaxPageSize = 100)]
  [UseFiltering(typeof(TicketChecklistFilterType))]
  [UseSorting(typeof(TicketChecklistSortInputType))]
  public async Task<IQueryable<TicketChecklistsPerEstateUnit>> ListTicketChecklistsPerEstateUnits(
    [Service] IReadRepository<TicketChecklist> repository,
    [SchemaService] IResolverContext resolverContext)
  {
    var query = await repository
      .AsQueryable(new TicketChecklistIncludeForListSpec())
      .MaterializeIfRequiredAsync(resolverContext);

    return query
      .GroupBy(checklist => checklist.EstateUnitId)
      .Select(grouped => new TicketChecklistsPerEstateUnit
      {
        EstateUnitId = grouped.Key,
        TicketChecklists = grouped.ToArray()
      });
  }

  [BackOfficePermission(Features.FCLT_CONTRACT_BASE, Permission.Read)]
  [UseFiltering(typeof(TicketChecklistFilterType))]
  [UseSorting(typeof(TicketChecklistSortInputType))]
  public Task<IQueryable<TicketChecklist>> ListTicketChecklistsFull(
    [Service] IReadRepository<TicketChecklist> repository,
    [SchemaService] IResolverContext resolverContext)
    => repository
        .AsQueryable(new TicketChecklistIncludeForListSpec())
        .MaterializeIfRequiredAsync(resolverContext);

  [BackOfficePermission(Features.FCLT_CONTRACT_BASE, Permission.Read)]
  [UseFiltering(typeof(TicketChecklistFilterType))]
  [UseSorting(typeof(TicketChecklistSortInputType))]
  public async Task<FileUrlOutput> ExportToExcel(
    [SchemaService] IResolverContext resolverContext,
    [Service] IDistributedCache distributedCache,
    [Service] IReadRepository<TicketChecklist> repository,
    [Service] IExportService<TicketChecklist> exportService,
    CancellationToken cancellationToken = default)
  {
    var query = await repository.AsQueryable().MaterializeIfRequiredAsync(resolverContext);
    var ticketChecklists = await query.ToArrayAsync(cancellationToken);

    return await ExportToExcelAsync(ticketChecklists, distributedCache, exportService, cancellationToken);
  }
}
