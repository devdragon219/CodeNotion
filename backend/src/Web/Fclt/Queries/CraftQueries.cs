using RealGimm.Core.IAM;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Core;
using RealGimm.Core.Fclt.CraftAggregate;
using RealGimm.Web.Fclt.Queries.Filters;
using RealGimm.Web.Fclt.Queries.Sorting;
using RealGimm.SharedKernel.Interfaces;
using RealGimm.WebCommons;
using HotChocolate.Resolvers;
using Microsoft.Extensions.Caching.Distributed;
using RealGimm.Core.Shared.Interfaces;
using RealGimm.WebCommons.Models;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Fclt.CraftAggregate.Specifications;

namespace RealGimm.Web.Fclt.Queries;

public class CraftQueries : QueriesBase
{
  [BackOfficePermission(Features.FCLT_CONFIG, Permission.Read)]
  public async Task<Craft?> Get(
    int id,
    [Service] IReadRepository<Craft> repository,
    CancellationToken cancellationToken = default)
    => await repository
        .AsQueryable(new GetByIdSpec<Craft>(id), new CraftIncludeAllSpec())
        .SingleOrDefaultAsync(cancellationToken);

  [BackOfficePermission(Features.FCLT_CONFIG, Permission.Read)]
  [UsePaging(IncludeTotalCount = true, MaxPageSize = 100)]
  [UseFiltering(typeof(CraftFilterType))]
  [UseSorting(typeof(CraftSortInputType))]
  public IQueryable<Craft> ListCrafts([Service] IReadRepository<Craft> repository)
    => repository.AsQueryable(new CraftIncludeForListSpec());

  [BackOfficePermission(Features.FCLT_CONFIG, Permission.Read)]
  public Task<string?> ProposeNewInternalCode([Service] ICodeSuggestor<Craft> codeSuggestor)
    => codeSuggestor.SuggestNextCode(null, (Craft?)null);

  [BackOfficePermission(Features.FCLT_CONFIG, Permission.Read)]
  public Task<bool> CanUseInternalCode(
    string internalCode,
    int? currentCraftId,
    [Service] IReadRepository<Craft> repository,
    CancellationToken cancellationToken = default)
    => CanUseInternalCode<Craft>(internalCode, currentCraftId, repository, cancellationToken);

  [BackOfficePermission(Features.FCLT_CONFIG, Permission.Read)]
  [UseFiltering(typeof(CraftFilterType))]
  [UseSorting(typeof(CraftSortInputType))]
  public async Task<FileUrlOutput> ExportToExcel(
    [SchemaService] IResolverContext resolverContext,
    [Service] IDistributedCache distributedCache,
    [Service] IReadRepository<Craft> repository,
    [Service] IExportService<Craft> exportService,
    CancellationToken cancellationToken = default)
  {
    var crafts = await repository
      .AsQueryable()
      .Filter(resolverContext)
      .Sort(resolverContext)
      .ToArrayAsync(cancellationToken);

    return await ExportToExcelAsync(crafts, distributedCache, exportService, cancellationToken);
  }
}
