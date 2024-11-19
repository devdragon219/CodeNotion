using HotChocolate.Resolvers;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using RealGimm.Core.IAM;
using RealGimm.Core.Shared.Interfaces;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Web.Common.Queries.Filters;
using RealGimm.Web.Common.Queries.Sorting;
using RealGimm.WebCommons;
using RealGimm.WebCommons.Models;
using RealGimm.Core;
using RealGimm.Core.Common.RevaluationDataAggregate;
using Microsoft.Extensions.Caching.Distributed;

namespace RealGimm.Web.Common.Queries;
public class RevaluationDataQueries : QueriesBase
{
  [BackOfficePermission(Features.COMMON_REVALUATIONDATA, Permission.Read)]
  public async Task<RevaluationData?> Get(
    int id,
    [Service] IReadRepository<RevaluationData> repository,
    CancellationToken cancellationToken = default)
    => await repository.SingleOrDefaultAsync(new GetByIdSpec<RevaluationData>(id), cancellationToken);

  [BackOfficePermission(Features.COMMON_REVALUATIONDATA, Permission.Read)]
  [UsePaging(IncludeTotalCount = true, MaxPageSize = 100)]
  [UseFiltering(typeof(RevaluationDataFilterType))]
  [UseSorting(typeof(RevaluationDataSortInputType))]
  public IQueryable<RevaluationData> ListRevaluationData([Service] IReadRepository<RevaluationData> repository)
    => repository.AsQueryable();

  [BackOfficePermission(Features.COMMON_REVALUATIONDATA, Permission.Read)]
  [UseFiltering(typeof(RevaluationDataFilterType))]
  [UseSorting(typeof(RevaluationDataSortInputType))]
  public async Task<FileUrlOutput> ExportToExcel(
    [SchemaService] IResolverContext resolverContext,
    [Service] IDistributedCache distributedCache,
    [Service] IReadRepository<RevaluationData> repository,
    [Service] IExportService<RevaluationData> exportService,
    CancellationToken cancellationToken = default)
  {
    var revaluationData = await repository
      .AsQueryable()
      .Filter(resolverContext)
      .Sort(resolverContext)
      .ToListAsync(cancellationToken);

    return await ExportToExcelAsync(revaluationData, distributedCache, exportService, cancellationToken);
  }
}
