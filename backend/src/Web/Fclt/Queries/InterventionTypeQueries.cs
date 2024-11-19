using RealGimm.Core.IAM;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Core;
using RealGimm.Core.Fclt.InterventionTypeAggregate;
using RealGimm.Web.Fclt.Queries.Filters;
using RealGimm.Web.Fclt.Queries.Sorting;
using RealGimm.SharedKernel.Interfaces;
using RealGimm.WebCommons;
using HotChocolate.Resolvers;
using Microsoft.Extensions.Caching.Distributed;
using RealGimm.Core.Shared.Interfaces;
using RealGimm.WebCommons.Models;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Fclt.InterventionTypeAggregate.Specifications;

namespace RealGimm.Web.Fclt.Queries;

public class InterventionTypeQueries : QueriesBase
{
  [BackOfficePermission(Features.FCLT_CONFIG, Permission.Read)]
  public async Task<InterventionType?> Get(
    int id,
    [Service] IReadRepository<InterventionType> repository,
    CancellationToken cancellationToken = default)
    => await repository
        .AsQueryable(new GetByIdSpec<InterventionType>(id), new InterventionTypeIncludeAllSpec())
        .SingleOrDefaultAsync(cancellationToken);

  [BackOfficePermission(Features.FCLT_CONFIG, Permission.Read)]
  [UsePaging(IncludeTotalCount = true, MaxPageSize = 100)]
  [UseFiltering(typeof(InterventionTypeFilterType))]
  [UseSorting(typeof(InterventionTypeSortInputType))]
  public IQueryable<InterventionType> ListInterventionTypes([Service] IReadRepository<InterventionType> repository)
    => repository.AsQueryable(new InterventionTypeIncludeForListSpec());

  [BackOfficePermission(Features.FCLT_CONFIG, Permission.Read)]
  public Task<string?> ProposeNewInternalCode([Service] ICodeSuggestor<InterventionType> codeSuggestor)
    => codeSuggestor.SuggestNextCode(null, (InterventionType?)null);

  [BackOfficePermission(Features.FCLT_CONFIG, Permission.Read)]
  public Task<bool> CanUseInternalCode(
    string internalCode,
    int? currentInterventionTypeId,
    [Service] IReadRepository<InterventionType> repository,
    CancellationToken cancellationToken = default)
    => CanUseInternalCode<InterventionType>(internalCode, currentInterventionTypeId, repository, cancellationToken);

  [BackOfficePermission(Features.FCLT_CONFIG, Permission.Read)]
  [UseFiltering(typeof(InterventionTypeFilterType))]
  [UseSorting(typeof(InterventionTypeSortInputType))]
  public async Task<FileUrlOutput> ExportToExcel(
    [SchemaService] IResolverContext resolverContext,
    [Service] IDistributedCache distributedCache,
    [Service] IReadRepository<InterventionType> repository,
    [Service] IExportService<InterventionType> exportService,
    CancellationToken cancellationToken = default)
  {
    var interventionTypes = await repository
      .AsQueryable()
      .Filter(resolverContext)
      .Sort(resolverContext)
      .ToArrayAsync(cancellationToken);

    return await ExportToExcelAsync(interventionTypes, distributedCache, exportService, cancellationToken);
  }
}
