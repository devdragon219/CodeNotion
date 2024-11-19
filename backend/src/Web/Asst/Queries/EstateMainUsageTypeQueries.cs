using HotChocolate.Resolvers;
using Microsoft.Extensions.Caching.Distributed;
using RealGimm.Core;
using RealGimm.Core.Asst.EstateMainUsageTypeAggregate;
using RealGimm.Core.IAM;
using RealGimm.Core.Shared.Interfaces;
using RealGimm.Core.Shared.Specifications;
using RealGimm.SharedKernel.Interfaces;
using RealGimm.Web.Asst.Queries.Filters;
using RealGimm.Web.Asst.Queries.Sorting;
using RealGimm.WebCommons;
using RealGimm.WebCommons.Models;

namespace RealGimm.Web.Asst.Queries;

public class EstateMainUsageTypeQueries : QueriesBase
{
  [BackOfficePermission(Features.ASST_ESTATE_BASE, Permission.Read)]
  public async Task<EstateMainUsageType?> Get(
    int id,
    [Service] IReadRepository<EstateMainUsageType> repository,
    CancellationToken cancellationToken = default)
    => await repository.SingleOrDefaultAsync(new GetByIdSpec<EstateMainUsageType>(id), cancellationToken);

  [BackOfficePermission(Features.ASST_ESTATE_BASE, Permission.Read)]
  [UsePaging(IncludeTotalCount = true, MaxPageSize = 100)]
  [UseFiltering(typeof(EstateMainUsageTypeFilterType))]
  [UseSorting(typeof(EstateMainUsageTypeSortInputType))]
  public async Task<IQueryable<EstateMainUsageType>> ListEstateMainUsageTypes(
    [Service] RepositoryWebWrapper<EstateMainUsageType> repository,
    [SchemaService] IResolverContext? resolverContext) => await repository.ListAllAsync(resolverContext);  
    
  [BackOfficePermission(Features.ASST_ESTATE_BASE, Permission.Read)]
  public Task<string?> ProposeNewInternalCode([Service] ICodeSuggestor<EstateMainUsageType> codeSuggestor)
    => codeSuggestor.SuggestNextCode(null, partialEntity: null);

  [BackOfficePermission(Features.ASST_ESTATE_BASE, Permission.Read)]
  public Task<bool> CanUseInternalCode(
    string internalCode,
    int? currentEstateMainUsageTypeId,
    [Service] IReadRepository<EstateMainUsageType> repository,
    CancellationToken cancellationToken = default)
    => base.CanUseInternalCode(internalCode, currentEstateMainUsageTypeId, repository, cancellationToken);

  [BackOfficePermission(Features.ASST_ESTATE_BASE, Permission.Read)]
  [UseFiltering(typeof(EstateMainUsageTypeFilterType))]
  [UseSorting(typeof(EstateMainUsageTypeSortInputType))]
  public async Task<FileUrlOutput> ExportToExcel(
    [SchemaService] IResolverContext resolverContext,
    [Service] RepositoryWebWrapper<EstateMainUsageType> repository,
    [Service] IExportService<EstateMainUsageType> exportService,
    [Service] IDistributedCache distributedCache,
    CancellationToken cancellationToken = default)
  {
    var estateMainUsageTypes = await repository.ListAllAsync(resolverContext);
    return await ExportToExcelAsync(estateMainUsageTypes, distributedCache, exportService, cancellationToken);
  }
}
