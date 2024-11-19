using RealGimm.Core.IAM;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Core;
using RealGimm.Core.Fclt.EstateUnitGroupAggregate;
using RealGimm.Web.Fclt.Queries.Filters;
using RealGimm.Web.Fclt.Queries.Sorting;
using RealGimm.WebCommons.Extensions;
using HotChocolate.Resolvers;
using RealGimm.WebCommons;
using RealGimm.SharedKernel.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Distributed;
using RealGimm.Core.Shared.Interfaces;
using RealGimm.WebCommons.Models;

namespace RealGimm.Web.Fclt.Queries;

public class EstateUnitGroupQueries : QueriesBase
{
  [BackOfficePermission(Features.FCLT_ESTATE_UNIT_GROUP_BASE, Permission.Read)]
  public async Task<EstateUnitGroup?> Get(
    int id,
    [Service] IReadRepository<EstateUnitGroup> repository,
    CancellationToken cancellationToken = default)
    => await repository.SingleOrDefaultAsync(new GetByIdSpec<EstateUnitGroup>(id), cancellationToken);

  [BackOfficePermission(Features.FCLT_ESTATE_UNIT_GROUP_BASE, Permission.Read)]
  [UsePaging(IncludeTotalCount = true, MaxPageSize = 100)]
  [UseFiltering(typeof(EstateUnitGroupFilterType))]
  [UseSorting(typeof(EstateUnitGroupSortInputType))]
  public Task<IQueryable<EstateUnitGroup>> ListEstateUnitGroups(
    [Service] IReadRepository<EstateUnitGroup> repository,
    [SchemaService] IResolverContext resolverContext)
    => repository.AsQueryable().MaterializeIfRequiredAsync(resolverContext);

  [BackOfficePermission(Features.FCLT_ESTATE_UNIT_GROUP_BASE, Permission.Read)]
  public Task<string?> ProposeNewInternalCode([Service] ICodeSuggestor<EstateUnitGroup> codeSuggestor)
    => codeSuggestor.SuggestNextCode(null, (EstateUnitGroup?)null);

  [BackOfficePermission(Features.FCLT_ESTATE_UNIT_GROUP_BASE, Permission.Read)]
  public Task<bool> CanUseInternalCode(
    string internalCode,
    int? currentEstateUnitGroupId,
    [Service] IReadRepository<EstateUnitGroup> repository,
    CancellationToken cancellationToken = default)
    => CanUseInternalCode<EstateUnitGroup>(internalCode, currentEstateUnitGroupId, repository, cancellationToken);

  [BackOfficePermission(Features.FCLT_ESTATE_UNIT_GROUP_BASE, Permission.Read)]
  [UseFiltering(typeof(EstateUnitGroupFilterType))]
  [UseSorting(typeof(EstateUnitGroupSortInputType))]
  public async Task<FileUrlOutput> ExportToExcel(
    [SchemaService] IResolverContext resolverContext,
    [Service] IDistributedCache distributedCache,
    [Service] IReadRepository<EstateUnitGroup> repository,
    [Service] IExportService<EstateUnitGroup> exportService,
    CancellationToken cancellationToken = default)
  {
    var query = await repository.AsQueryable().MaterializeIfRequiredAsync(resolverContext);

    var estateUnitGroups = await query
      .AsQueryable()
      .Filter(resolverContext)
      .Sort(resolverContext)
      .ToArrayAsync(cancellationToken);

    return await ExportToExcelAsync(estateUnitGroups, distributedCache, exportService, cancellationToken);
  }
}
