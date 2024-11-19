using HotChocolate.Resolvers;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Distributed;
using RealGimm.Core;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.Asst.EstateUsageTypeAggregate;
using RealGimm.Core.IAM;
using RealGimm.Core.Shared.Interfaces;
using RealGimm.Core.Shared.Specifications;
using RealGimm.SharedKernel.Interfaces;
using RealGimm.Web.Asst.Queries.Filters;
using RealGimm.Web.Asst.Queries.Sorting;
using RealGimm.WebCommons.Models;
using RealGimm.Web.Asst.Models;
using RealGimm.SharedKernel;

namespace RealGimm.Web.Asst.Queries;

public class EstateUsageTypeQueries : QueriesBase
{
  [BackOfficePermission(Features.ASST_ESTATE_BASE, Permission.Read)]
  public async Task<EstateUsageType?> Get(
    int id,
    [Service] IReadRepository<EstateUsageType> repository,
    CancellationToken cancellationToken = default)
    => await repository.SingleOrDefaultAsync(new GetByIdSpec<EstateUsageType>(id), cancellationToken);

  [BackOfficePermission(Features.ASST_ESTATE_BASE, Permission.Read)]
  [UsePaging(IncludeTotalCount = true, MaxPageSize = 100)]
  [UseFiltering(typeof(EstateUsageTypeFilterType))]
  [UseSorting(typeof(EstateUsageTypeSortInputType))]
  public async Task<IQueryable<EstateUsageType>> ListEstateUsageTypes(
    [Service] RepositoryWebWrapper<EstateUsageType> repository,
    [SchemaService] IResolverContext? resolverContext) => await repository.ListAllAsync(resolverContext);

  [BackOfficePermission(Features.ASST_ESTATE_BASE, Permission.Read)]
  [UseFiltering(typeof(EstateUsageTypeFilterType))]
  [UseSorting(typeof(EstateUsageTypeSortInputType))]
  public async Task<IQueryable<EstateUsageType>> ListEstateUsageTypesFull(
    [Service] RepositoryWebWrapper<EstateUsageType> repository,
    [SchemaService] IResolverContext? resolverContext)
    => await repository.ListAllAsync(resolverContext);

  [BackOfficePermission(Features.ASST_ESTATE_BASE, Permission.Read)]
  public Task<string?> ProposeNewInternalCode([Service] ICodeSuggestor<EstateUsageType> codeSuggestor)
    => codeSuggestor.SuggestNextCode(null, partialEntity: null);

  [BackOfficePermission(Features.ASST_ESTATE_BASE, Permission.Read)]
  public Task<bool> CanUseInternalCode(
    string internalCode,
    int? currentEstateUsageTypeId,
    [Service] IReadRepository<EstateUsageType> repository,
    CancellationToken cancellationToken = default)
    => base.CanUseInternalCode(internalCode, currentEstateUsageTypeId, repository, cancellationToken);

  [BackOfficePermission(Features.ASST_ESTATE_BASE, Permission.Read)]
  [UseFiltering(typeof(EstateUsageTypeFilterType))]
  [UseSorting(typeof(EstateUsageTypeSortInputType))]
  public async Task<FileUrlOutput> ExportToExcel(
    [SchemaService] IResolverContext resolverContext,
    [Service] RepositoryWebWrapper<EstateUsageType> repository,
    [Service] IExportService<EstateUsageType> exportService,
    [Service] IDistributedCache distributedCache,
    CancellationToken cancellationToken = default)
  {
    var estateUsageTypes = await repository.ListAllAsync(resolverContext);
    return await ExportToExcelAsync(estateUsageTypes, distributedCache, exportService, cancellationToken);
  }

  [BackOfficePermission(Features.ASST_ESTATE_BASE, Permission.Read)]
  [UsePaging(IncludeTotalCount = true, MaxPageSize = 10)]
  [UseFiltering(typeof(UsageTypeDistributionFilterType))]
  [UseSorting(typeof(UsageTypeDistributionSortInputType))]
  public async Task<List<UsageTypeDistribution>> GetUsageTypeDistribution(
    bool showAll,
    [Service] IReadRepository<EstateUnit> euRepository,
    [Service] IReadRepository<EstateUsageType> usRepository
  )
  {
    UsageTypeDistribution? otherUsageTypeDistribution = null;
    List<UsageTypeDistribution> usageTypeDistributions = new();

    var utQueryable = usRepository.AsQueryable();
    var groupedQuery = await euRepository.AsQueryable()
                      .GroupBy(g => new { g.UsageType.InternalCode })
                      .Select(e => new
                      {
                        UsageTypeId = e.First().UsageType.Id,
                        UsageTypeName = e.First().UsageType.Name,
                        Count = e.Count()
                      }).ToListAsync();

    if (!showAll)
    {
      utQueryable = utQueryable.Where(e => !string.IsNullOrEmpty(e.Name) && !e.Name.Equals(Constants.LABEL_WIDGET_OTHER))
                               .Take(Constants.COUNT_OF_USAGE_TYPES_DISTRIBUTION);

      var otherResults = groupedQuery.Where(e => !utQueryable.Select(e => e.Id).Contains(e.UsageTypeId));
      otherUsageTypeDistribution = new UsageTypeDistribution(
        Math.Round((double)otherResults.Sum(e => e.Count) / groupedQuery.Sum(e => e.Count) * 100, 2, MidpointRounding.AwayFromZero),
        Constants.LABEL_WIDGET_OTHER
      );
    }

    var results = groupedQuery.Where(e => utQueryable.Select(e => e.Id).Contains(e.UsageTypeId));
    foreach (var result in results)
    {
      var usageTypeDistribution = new UsageTypeDistribution(
        Math.Round((double)result.Count / groupedQuery.Sum(e => e.Count) * 100, 2, MidpointRounding.AwayFromZero),
        result.UsageTypeName!
      );

      usageTypeDistributions.Add(usageTypeDistribution);
    }

    if (otherUsageTypeDistribution is not null) usageTypeDistributions.Add(otherUsageTypeDistribution);
    return usageTypeDistributions;
  }
}
