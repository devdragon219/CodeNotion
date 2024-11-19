using RealGimm.Core.IAM;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Core;
using RealGimm.Core.Fclt.CalendarAggregate;
using RealGimm.WebCommons;
using HotChocolate.Resolvers;
using Microsoft.Extensions.Caching.Distributed;
using RealGimm.Core.Shared.Interfaces;
using RealGimm.WebCommons.Models;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Fclt.CalendarAggregate.Specifications;
using RealGimm.Web.Fclt.Queries.Filters;
using RealGimm.Web.Fclt.Queries.Sorting;

namespace RealGimm.Web.Fclt.Queries;

public class CalendarQueries : QueriesBase
{
  [BackOfficePermission(Features.FCLT_CONFIG, Permission.Read)]
  public async Task<Calendar?> Get(
    int id,
    [Service] IReadRepository<Calendar> repository,
    CancellationToken cancellationToken = default)
    => await repository
        .AsQueryable(new GetByIdSpec<Calendar>(id), new CalendarIncludeAllSpec())
        .SingleOrDefaultAsync(cancellationToken);

  [BackOfficePermission(Features.FCLT_CONFIG, Permission.Read)]
  [UsePaging(IncludeTotalCount = true, MaxPageSize = 100)]
  [UseFiltering(typeof(CalendarFilterType))]
  [UseSorting(typeof(CalendarSortInputType))]
  public IQueryable<Calendar> ListCalendars([Service] IReadRepository<Calendar> repository)
    => repository.AsQueryable(new CalendarIncludeForListSpec());

  [BackOfficePermission(Features.FCLT_CONFIG, Permission.Read)]
  [UseFiltering(typeof(CalendarFilterType))]
  [UseSorting(typeof(CalendarSortInputType))]
  public IQueryable<Calendar> ListCalendarsFull([Service] IReadRepository<Calendar> repository)
    => repository.AsQueryable(new CalendarIncludeForListSpec());

  [BackOfficePermission(Features.FCLT_CONFIG, Permission.Read)]
  [UseFiltering(typeof(CalendarFilterType))]
  [UseSorting(typeof(CalendarSortInputType))]
  public async Task<FileUrlOutput> ExportToExcel(
    [SchemaService] IResolverContext resolverContext,
    [Service] IDistributedCache distributedCache,
    [Service] IReadRepository<Calendar> repository,
    [Service] IExportService<Calendar> exportService,
    CancellationToken cancellationToken = default)
  {
    var calendars = await repository
      .AsQueryable(new CalendarIncludeForExportToExcelSpec())
      .Filter(resolverContext)
      .Sort(resolverContext)
      .ToArrayAsync(cancellationToken);

    return await ExportToExcelAsync(calendars, distributedCache, exportService, cancellationToken);
  }
}
