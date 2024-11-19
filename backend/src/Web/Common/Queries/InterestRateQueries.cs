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
using RealGimm.Core.Common.InterestRateAggregate;
using RealGimm.Core;
using Microsoft.Extensions.Caching.Distributed;

namespace RealGimm.Web.Common.Queries;
public class InterestRateQueries : QueriesBase
{
  [BackOfficePermission(Features.COMMON_INTERESTRATES, Permission.Read)]
  public async Task<InterestRate?> Get(
    int id,
    [Service] IReadRepository<InterestRate> repository,
    CancellationToken cancellationToken = default)
    => await repository.SingleOrDefaultAsync(new GetByIdSpec<InterestRate>(id), cancellationToken);

  [BackOfficePermission(Features.COMMON_INTERESTRATES, Permission.Read)]
  [UsePaging(IncludeTotalCount = true, MaxPageSize = 100)]
  [UseFiltering(typeof(InterestRateFilterType))]
  [UseSorting(typeof(InterestRateSortInputType))]
  public IQueryable<InterestRate> ListInterestRates([Service] IReadRepository<InterestRate> repository)
    => repository.AsQueryable();

  [BackOfficePermission(Features.COMMON_INTERESTRATES, Permission.Read)]
  [UseFiltering(typeof(InterestRateFilterType))]
  [UseSorting(typeof(InterestRateSortInputType))]
  public async Task<FileUrlOutput> ExportToExcel(
    [SchemaService] IResolverContext resolverContext,
    [Service] IReadRepository<InterestRate> repository,
    [Service] IExportService<InterestRate> exportService,
    [Service] IDistributedCache distributedCache,
    CancellationToken cancellationToken = default)
  {
    var interestRates = await repository
      .AsQueryable()
      .Filter(resolverContext)
      .Sort(resolverContext)
      .ToListAsync(cancellationToken);

    return await ExportToExcelAsync(interestRates, distributedCache, exportService, cancellationToken);
  }
}
