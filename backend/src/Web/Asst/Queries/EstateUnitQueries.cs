using HotChocolate.Resolvers;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.IdentityModel.Tokens;
using RealGimm.Core;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate.Specifications;
using RealGimm.Core.Asst.EstateUsageTypeAggregate;
using RealGimm.Core.IAM;
using RealGimm.Core.Shared.Interfaces;
using RealGimm.Core.Shared.Specifications;
using RealGimm.SharedKernel;
using RealGimm.SharedKernel.Interfaces;
using RealGimm.Web.Asst.Models;
using RealGimm.Web.Asst.Queries.Filters;
using RealGimm.Web.Asst.Queries.Sorting;
using RealGimm.WebCommons;
using RealGimm.WebCommons.Models;

namespace RealGimm.Web.Asst.Queries;

public class EstateUnitQueries : QueriesBase
{
  [BackOfficePermission(Features.ASST_ESTATEUNIT_BASE, Permission.Read)]
  public async Task<EstateUnit?> GetEstateUnit(
    int estateUnitId,
    [Service] IReadRepository<EstateUnit> repository,
    CancellationToken cancellationToken = default)
    => await repository
        .AsQueryable(new GetByIdSpec<EstateUnit>(estateUnitId), new EstateUnitIncludeAllSpec())
        .SingleOrDefaultAsync(cancellationToken);

  [BackOfficePermission(Features.ASST_ESTATEUNIT_BASE, Permission.Read)]
  [UsePaging(IncludeTotalCount = true, MaxPageSize = 100)]
  [UseFiltering(typeof(EstateUnitFilterType))]
  [UseSorting(typeof(EstateUnitSortInputType))]
  public async Task<IQueryable<EstateUnit>> ListEstateUnits(
    [Service] RepositoryWebWrapper<EstateUnit> repository,
    [SchemaService] IResolverContext? resolverContext)
    => await repository.ListAllAsync(resolverContext, new EntityNonDeletedSpec<EstateUnit>(), new EstateUnitIncludeForListSpec());

  [BackOfficePermission(Features.ASST_ESTATEUNIT_BASE, Permission.Read)]
  [UseFiltering(typeof(EstateUnitFilterType))]
  [UseSorting(typeof(EstateUnitSortInputType))]
  public async Task<IQueryable<EstateUnit>> ListEstateUnitsFull(
    [Service] RepositoryWebWrapper<EstateUnit> repository,
    [SchemaService] IResolverContext? resolverContext)
    => await repository.ListAllAsync(resolverContext, new EntityNonDeletedSpec<EstateUnit>(), new EstateUnitIncludeForListSpec());

  [BackOfficePermission(Features.ASST_ESTATEUNIT_BASE, Permission.Read)]
  public async Task<string?> ProposeNewInternalCode(int parentEstateId, [Service] ICodeSuggestor<EstateUnit> codeSuggestor)
    => await codeSuggestor.SuggestNextCode(parentEstateId, partialEntity: null);

  [BackOfficePermission(Features.ASST_ESTATEUNIT_BASE, Permission.Read)]
  public async Task<string> ProposeNewInternalCodeExceptOccupied(
    int parentId,
    string[] additionallyOccupiedCodes,
    [Service] ICodeSuggestor<EstateUnit> codeSuggestor)
    => await codeSuggestor.SuggestNextCode(parentId, additionallyOccupiedCodes);

  [BackOfficePermission(Features.ASST_ESTATEUNIT_BASE, Permission.Read)]
  [UseFiltering(typeof(EstateUnitFilterType))]
  [UseSorting(typeof(EstateUnitSortInputType))]
  public async Task<FileUrlOutput> ExportToExcel(
    [SchemaService] IResolverContext resolverContext,
    [Service] RepositoryWebWrapper<EstateUnit> estateUnitRepo,
    [Service] IDistributedCache distributedCache,
    [Service] IExportService<EstateUnit> exportService,
    CancellationToken cancellationToken = default)
  {
    var estateUnits = await (await estateUnitRepo
      .ListAllAsync(resolverContext, new EntityNonDeletedSpec<EstateUnit>(), new EstateUnitIncludeForListSpec())
    ).ToArrayAsync(cancellationToken);

    return await ExportToExcelAsync(estateUnits, distributedCache, exportService, cancellationToken);
  }

  [BackOfficePermission(Features.ASST_ESTATEUNIT_BASE, Permission.Read)]
  [UsePaging(IncludeTotalCount = true, MaxPageSize = 10)]
  [UseFiltering(typeof(EstateUnitTypeDistributionFilterType))]
  [UseSorting(typeof(EstateUnitTypeDistributionSortInputType))]
  public async Task<List<EstateUnitTypeDistribution>> GetEstateUnitTypeDistribution(
    bool showAll,
    [Service] IReadRepository<EstateUnit> euRepository
  )
  {
    EstateUnitTypeDistribution? otherDistribution = null;
    List<EstateUnitTypeDistribution> typeDistributions = new();

    var groupedQuery = await euRepository.AsQueryable().GroupBy(g => new { g.Type })
                      .Select(e => new
                      {
                        e.First().Type,
                        Count = e.Count()
                      }).ToListAsync();

    var typesToEvaluate = Enum.GetValues(typeof(EstateUnitType)).Cast<EstateUnitType>().ToList();

    if (!showAll)
    {
      typesToEvaluate = typesToEvaluate.Where(e => !e.ToString().Equals(Constants.LABEL_WIDGET_OTHER))
                                       .Take(Constants.COUNT_OF_ESTATE_UNIT_TYPES_DISTRIBUTION).ToList();

      var otherResults = groupedQuery.Where(e => !typesToEvaluate.Contains(e.Type)).ToList();
      otherDistribution = new EstateUnitTypeDistribution(
        Math.Round((double)otherResults.Sum(e => e.Count) / groupedQuery.Sum(e => e.Count) * 100, 2, MidpointRounding.AwayFromZero),
        EstateUnitType.Other
      );
    }

    var results = groupedQuery.Where(e => typesToEvaluate.Contains(e.Type)).ToList();
    foreach (var result in results)
    {
      var typeDistribution = new EstateUnitTypeDistribution(
        Math.Round((double)result.Count / groupedQuery.Sum(e => e.Count) * 100, 2, MidpointRounding.AwayFromZero),
        result.Type
      );

      typeDistributions.Add(typeDistribution);
    }

    if (otherDistribution is not null) typeDistributions.Add(otherDistribution);

    return typeDistributions;
  }
}
