using RealGimm.Core.IAM;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Core;
using RealGimm.Core.Fclt.TicketChecklistTemplateAggregate;
using RealGimm.Web.Fclt.Queries.Filters;
using RealGimm.Web.Fclt.Queries.Sorting;
using RealGimm.SharedKernel.Interfaces;
using RealGimm.WebCommons;
using HotChocolate.Resolvers;
using Microsoft.Extensions.Caching.Distributed;
using RealGimm.Core.Shared.Interfaces;
using RealGimm.WebCommons.Models;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Fclt.TicketChecklistTemplateAggregate.Specifications;
using RealGimm.WebCommons.Extensions;

namespace RealGimm.Web.Fclt.Queries;

public class TicketChecklistTemplateQueries : QueriesBase
{
  [BackOfficePermission(Features.FCLT_CONFIG, Permission.Read)]
  public async Task<TicketChecklistTemplate?> Get(
    int id,
    [Service] IReadRepository<TicketChecklistTemplate> repository,
    CancellationToken cancellationToken = default)
    => await repository
        .AsQueryable(new GetByIdSpec<TicketChecklistTemplate>(id), new TicketChecklistTemplateIncludeAllSpec())
        .SingleOrDefaultAsync(cancellationToken);

  [BackOfficePermission(Features.FCLT_CONFIG, Permission.Read)]
  [UsePaging(IncludeTotalCount = true, MaxPageSize = 100)]
  [UseFiltering(typeof(TicketChecklistTemplateFilterType))]
  [UseSorting(typeof(TicketChecklistTemplateSortInputType))]
  public Task<IQueryable<TicketChecklistTemplate>> ListTicketChecklistTemplates(
    [Service] IReadRepository<TicketChecklistTemplate> repository,
    [SchemaService] IResolverContext resolverContext)
    => repository
        .AsQueryable(new TicketChecklistTemplateIncludeForListSpec())
        .MaterializeIfRequiredAsync(resolverContext);

  [BackOfficePermission(Features.FCLT_CONFIG, Permission.Read)]
  [UseFiltering(typeof(TicketChecklistTemplateFilterType))]
  [UseSorting(typeof(TicketChecklistTemplateSortInputType))]
  public Task<IQueryable<TicketChecklistTemplate>> ListTicketChecklistTemplatesFull(
    [Service] IReadRepository<TicketChecklistTemplate> repository,
    [SchemaService] IResolverContext resolverContext)
    => repository
        .AsQueryable(new TicketChecklistTemplateIncludeForListSpec())
        .MaterializeIfRequiredAsync(resolverContext);

  [BackOfficePermission(Features.FCLT_CONFIG, Permission.Read)]
  public Task<string?> ProposeNewInternalCode([Service] ICodeSuggestor<TicketChecklistTemplate> codeSuggestor)
    => codeSuggestor.SuggestNextCode(null, (TicketChecklistTemplate?)null);

  [BackOfficePermission(Features.FCLT_CONFIG, Permission.Read)]
  public Task<bool> CanUseInternalCode(
    string internalCode,
    int? currentTicketChecklistTemplateId,
    [Service] IReadRepository<TicketChecklistTemplate> repository,
    CancellationToken cancellationToken = default)
    => CanUseInternalCode<TicketChecklistTemplate>(internalCode, currentTicketChecklistTemplateId, repository, cancellationToken);

  [BackOfficePermission(Features.FCLT_CONFIG, Permission.Read)]
  [UseFiltering(typeof(TicketChecklistTemplateFilterType))]
  [UseSorting(typeof(TicketChecklistTemplateSortInputType))]
  public async Task<FileUrlOutput> ExportToExcel(
    [SchemaService] IResolverContext resolverContext,
    [Service] IDistributedCache distributedCache,
    [Service] IReadRepository<TicketChecklistTemplate> repository,
    [Service] IExportService<TicketChecklistTemplate> exportService,
    CancellationToken cancellationToken = default)
  {
    var query = await repository.AsQueryable().MaterializeIfRequiredAsync(resolverContext);
    var ticketChecklistTemplates = await query.ToArrayAsync(cancellationToken);

    return await ExportToExcelAsync(ticketChecklistTemplates, distributedCache, exportService, cancellationToken);
  }
}
