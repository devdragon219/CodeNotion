using RealGimm.Core.IAM;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Core;
using RealGimm.Core.Fclt.PriceListMeasurementUnitAggregate;
using RealGimm.Web.Fclt.Queries.Filters;
using RealGimm.Web.Fclt.Queries.Sorting;
using RealGimm.SharedKernel.Interfaces;
using RealGimm.WebCommons;
using HotChocolate.Resolvers;
using Microsoft.Extensions.Caching.Distributed;
using RealGimm.Core.Shared.Interfaces;
using RealGimm.WebCommons.Models;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Fclt.PriceListMeasurementUnitAggregate.Specifications;

namespace RealGimm.Web.Fclt.Queries;

public class PriceListMeasurementUnitQueries : QueriesBase
{
  [BackOfficePermission(Features.FCLT_CONFIG, Permission.Read)]
  public async Task<PriceListMeasurementUnit?> Get(
    int id,
    [Service] IReadRepository<PriceListMeasurementUnit> repository,
    CancellationToken cancellationToken = default)
    => await repository
        .AsQueryable(new GetByIdSpec<PriceListMeasurementUnit>(id), new PriceListMeasurementUnitIncludeAllSpec())
        .SingleOrDefaultAsync(cancellationToken);

  [BackOfficePermission(Features.FCLT_CONFIG, Permission.Read)]
  [UsePaging(IncludeTotalCount = true, MaxPageSize = 100)]
  [UseFiltering(typeof(PriceListMeasurementUnitFilterType))]
  [UseSorting(typeof(PriceListMeasurementUnitSortInputType))]
  public IQueryable<PriceListMeasurementUnit> ListPriceListMeasurementUnits([Service] IReadRepository<PriceListMeasurementUnit> repository)
    => repository.AsQueryable(new PriceListMeasurementUnitIncludeForListSpec());

  [BackOfficePermission(Features.FCLT_CONFIG, Permission.Read)]
  public Task<string?> ProposeNewInternalCode([Service] ICodeSuggestor<PriceListMeasurementUnit> codeSuggestor)
    => codeSuggestor.SuggestNextCode(null, (PriceListMeasurementUnit?)null);

  [BackOfficePermission(Features.FCLT_CONFIG, Permission.Read)]
  public Task<bool> CanUseInternalCode(
    string internalCode,
    int? currentPriceListMeasurementUnitId,
    [Service] IReadRepository<PriceListMeasurementUnit> repository,
    CancellationToken cancellationToken = default)
    => CanUseInternalCode<PriceListMeasurementUnit>(internalCode, currentPriceListMeasurementUnitId, repository, cancellationToken);

  [BackOfficePermission(Features.FCLT_CONFIG, Permission.Read)]
  [UseFiltering(typeof(PriceListMeasurementUnitFilterType))]
  [UseSorting(typeof(PriceListMeasurementUnitSortInputType))]
  public async Task<FileUrlOutput> ExportToExcel(
    [SchemaService] IResolverContext resolverContext,
    [Service] IDistributedCache distributedCache,
    [Service] IReadRepository<PriceListMeasurementUnit> repository,
    [Service] IExportService<PriceListMeasurementUnit> exportService,
    CancellationToken cancellationToken = default)
  {
    var priceListMeasurementUnits = await repository
      .AsQueryable(new PriceListMeasurementUnitIncludeForExportToExcelSpec())
      .Filter(resolverContext)
      .Sort(resolverContext)
      .ToArrayAsync(cancellationToken);

    return await ExportToExcelAsync(priceListMeasurementUnits, distributedCache, exportService, cancellationToken);
  }
}
