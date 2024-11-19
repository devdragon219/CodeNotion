using HotChocolate.Resolvers;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Distributed;
using RealGimm.Core;
using RealGimm.Core.Common.VATRateAggregate;
using RealGimm.Core.IAM;
using RealGimm.Core.Shared.Interfaces;
using RealGimm.Core.Shared.Specifications;
using RealGimm.SharedKernel.Interfaces;
using RealGimm.Web.Common.Queries.Filters;
using RealGimm.Web.Common.Queries.Sorting;
using RealGimm.WebCommons;
using RealGimm.WebCommons.Models;

namespace RealGimm.Web.Common.Queries;

public sealed class VATRateQueries : QueriesBase
{
  [BackOfficePermission(Features.COMMON_VATRATES, Permission.Read)]
  public async Task<VATRate?> Get(
    int id,
    [Service] IReadRepository<VATRate> repository,
    CancellationToken cancellationToken = default)
    => await repository.SingleOrDefaultAsync(new GetByIdSpec<VATRate>(id), cancellationToken);

  [BackOfficePermission(Features.COMMON_VATRATES, Permission.Read)]
  [UsePaging(IncludeTotalCount = true, MaxPageSize = 100)]
  [UseFiltering(typeof(VATRateFilterType))]
  [UseSorting(typeof(VATRateSortInputType))]
  public IQueryable<VATRate> ListVATRates([Service] IReadRepository<VATRate> repository)
    => repository.AsQueryable();

  [BackOfficePermission(Features.COMMON_VATRATES, Permission.Read)]
  [UseFiltering(typeof(VATRateFilterType))]
  [UseSorting(typeof(VATRateSortInputType))]
  public async Task<FileUrlOutput> ExportToExcel(
    [SchemaService] IResolverContext resolverContext,
    [Service] IDistributedCache distributedCache,
    [Service] IReadRepository<VATRate> repository,
    [Service] IExportService<VATRate> exportService,
    CancellationToken cancellationToken = default)
  {
    var vatRates = await repository
      .AsQueryable()
      .Filter(resolverContext)
      .Sort(resolverContext)
      .ToListAsync(cancellationToken);

    return await ExportToExcelAsync(vatRates, distributedCache, exportService, cancellationToken);
  }

  [BackOfficePermission(Features.COMMON_VATRATES, Permission.Read)]
  public Task<bool> CanUseInternalCode(
    string internalCode,
    int? currentVATRateId,
    [Service] IReadRepository<VATRate> repository,
    CancellationToken cancellationToken = default)
    => base.CanUseInternalCode(internalCode, currentVATRateId, repository, cancellationToken);

  [BackOfficePermission(Features.COMMON_VATRATES, Permission.Read)]
  public Task<string?> ProposeNewInternalCode([Service] ICodeSuggestor<VATRate> codeSuggestor)
    => codeSuggestor.SuggestNextCode(null, partialEntity: null);
}
