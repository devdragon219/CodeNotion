using RealGimm.Core.IAM;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Core;
using RealGimm.Core.Fclt.QualificationLevelAggregate;
using RealGimm.Web.Fclt.Queries.Filters;
using RealGimm.Web.Fclt.Queries.Sorting;
using RealGimm.SharedKernel.Interfaces;
using RealGimm.WebCommons;
using HotChocolate.Resolvers;
using Microsoft.Extensions.Caching.Distributed;
using RealGimm.Core.Shared.Interfaces;
using RealGimm.WebCommons.Models;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Fclt.QualificationLevelAggregate.Specifications;

namespace RealGimm.Web.Fclt.Queries;

public class QualificationLevelQueries : QueriesBase
{
  [BackOfficePermission(Features.FCLT_CONFIG, Permission.Read)]
  public async Task<QualificationLevel?> Get(
    int id,
    [Service] IReadRepository<QualificationLevel> repository,
    CancellationToken cancellationToken = default)
    => await repository
        .AsQueryable(new GetByIdSpec<QualificationLevel>(id), new QualificationLevelIncludeAllSpec())
        .SingleOrDefaultAsync(cancellationToken);

  [BackOfficePermission(Features.FCLT_CONFIG, Permission.Read)]
  [UsePaging(IncludeTotalCount = true, MaxPageSize = 100)]
  [UseFiltering(typeof(QualificationLevelFilterType))]
  [UseSorting(typeof(QualificationLevelSortInputType))]
  public IQueryable<QualificationLevel> ListQualificationLevels([Service] IReadRepository<QualificationLevel> repository)
    => repository.AsQueryable(new QualificationLevelIncludeForListSpec());

  [BackOfficePermission(Features.FCLT_CONFIG, Permission.Read)]
  public Task<string?> ProposeNewInternalCode([Service] ICodeSuggestor<QualificationLevel> codeSuggestor)
    => codeSuggestor.SuggestNextCode(null, (QualificationLevel?)null);

  [BackOfficePermission(Features.FCLT_CONFIG, Permission.Read)]
  public Task<bool> CanUseInternalCode(
    string internalCode,
    int? currentQualificationLevelId,
    [Service] IReadRepository<QualificationLevel> repository,
    CancellationToken cancellationToken = default)
    => CanUseInternalCode<QualificationLevel>(internalCode, currentQualificationLevelId, repository, cancellationToken);

  [BackOfficePermission(Features.FCLT_CONFIG, Permission.Read)]
  [UseFiltering(typeof(QualificationLevelFilterType))]
  [UseSorting(typeof(QualificationLevelSortInputType))]
  public async Task<FileUrlOutput> ExportToExcel(
    [SchemaService] IResolverContext resolverContext,
    [Service] IDistributedCache distributedCache,
    [Service] IReadRepository<QualificationLevel> repository,
    [Service] IExportService<QualificationLevel> exportService,
    CancellationToken cancellationToken = default)
  {
    var qualificationLevels = await repository
      .AsQueryable()
      .Filter(resolverContext)
      .Sort(resolverContext)
      .ToArrayAsync(cancellationToken);

    return await ExportToExcelAsync(qualificationLevels, distributedCache, exportService, cancellationToken);
  }
}
