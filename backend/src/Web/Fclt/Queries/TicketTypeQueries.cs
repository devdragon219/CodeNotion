using RealGimm.Core.IAM;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Core;
using RealGimm.Core.Fclt.TicketTypeAggregate;
using RealGimm.Web.Fclt.Queries.Filters;
using RealGimm.Web.Fclt.Queries.Sorting;
using RealGimm.SharedKernel.Interfaces;
using RealGimm.WebCommons;
using HotChocolate.Resolvers;
using Microsoft.Extensions.Caching.Distributed;
using RealGimm.Core.Shared.Interfaces;
using RealGimm.WebCommons.Models;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Fclt.TicketTypeAggregate.Specifications;

namespace RealGimm.Web.Fclt.Queries;

public class TicketTypeQueries : QueriesBase
{
  [BackOfficePermission(Features.FCLT_CONFIG, Permission.Read)]
  public async Task<TicketType?> Get(
    int id,
    [Service] IReadRepository<TicketType> repository,
    CancellationToken cancellationToken = default)
    => await repository
        .AsQueryable(new GetByIdSpec<TicketType>(id), new TicketTypeIncludeAllSpec())
        .SingleOrDefaultAsync(cancellationToken);

  [BackOfficePermission(Features.FCLT_CONFIG, Permission.Read)]
  [UsePaging(IncludeTotalCount = true, MaxPageSize = 100)]
  [UseFiltering(typeof(TicketTypeFilterType))]
  [UseSorting(typeof(TicketTypeSortInputType))]
  public IQueryable<TicketType> ListTicketTypes([Service] IReadRepository<TicketType> repository)
    => repository.AsQueryable(new TicketTypeIncludeForListSpec());

  [BackOfficePermission(Features.FCLT_CONFIG, Permission.Read)]
  public Task<string?> ProposeNewInternalCode([Service] ICodeSuggestor<TicketType> codeSuggestor)
    => codeSuggestor.SuggestNextCode(null, (TicketType?)null);

  [BackOfficePermission(Features.FCLT_CONFIG, Permission.Read)]
  public Task<bool> CanUseInternalCode(
    string internalCode,
    int? currentTicketTypeId,
    [Service] IReadRepository<TicketType> repository,
    CancellationToken cancellationToken = default)
    => CanUseInternalCode<TicketType>(internalCode, currentTicketTypeId, repository, cancellationToken);

  [BackOfficePermission(Features.FCLT_CONFIG, Permission.Read)]
  [UseFiltering(typeof(TicketTypeFilterType))]
  [UseSorting(typeof(TicketTypeSortInputType))]
  public async Task<FileUrlOutput> ExportToExcel(
    [SchemaService] IResolverContext resolverContext,
    [Service] IDistributedCache distributedCache,
    [Service] IReadRepository<TicketType> repository,
    [Service] IExportService<TicketType> exportService,
    CancellationToken cancellationToken = default)
  {
    var ticketTypes = await repository
      .AsQueryable()
      .Filter(resolverContext)
      .Sort(resolverContext)
      .ToArrayAsync(cancellationToken);

    return await ExportToExcelAsync(ticketTypes, distributedCache, exportService, cancellationToken);
  }
}
