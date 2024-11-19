using HotChocolate.Resolvers;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.IAM;
using RealGimm.Core.Shared.Interfaces;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Web.Common.Queries.Filters;
using RealGimm.Web.Common.Queries.Sorting;
using RealGimm.Core;
using RealGimm.SharedKernel.Interfaces;
using Microsoft.Extensions.Caching.Distributed;
using RealGimm.Core.Prop.BillItemTypeAggregate;
using RealGimm.WebCommons;
using RealGimm.WebCommons.Models;
using RealGimm.WebCommons.Extensions;

namespace RealGimm.Web.Common.Queries;
public class BillItemTypeQueries : QueriesBase
{
  [BackOfficePermission(Features.COMMON_BILLITEMTYPES, Permission.Read)]
  public async Task<BillItemType?> Get(
    int id,
    [Service] IReadRepository<BillItemType> repository,
    CancellationToken cancellationToken = default)
    => await repository.AsQueryable(
        new GetByIdSpec<BillItemType>(id))
      .SingleOrDefaultAsync(cancellationToken);

  [BackOfficePermission(Features.COMMON_BILLITEMTYPES, Permission.Read)]
  [UsePaging(IncludeTotalCount = true, MaxPageSize = 100)]
  [UseFiltering(typeof(BillItemTypeFilterType))]
  [UseSorting(typeof(BillItemTypeSortInputType))]
  public Task<IQueryable<BillItemType>> ListBillItemTypes(
    [Service] IReadRepository<BillItemType> repository,
    [SchemaService] IResolverContext resolverContext)
    => repository.AsQueryable().MaterializeIfRequiredAsync(resolverContext);

  [BackOfficePermission(Features.COMMON_BILLITEMTYPES, Permission.Read)]
  [UseFiltering(typeof(BillItemTypeFilterType))]
  [UseSorting(typeof(BillItemTypeSortInputType))]
  public async Task<FileUrlOutput> ExportToExcel(
    [SchemaService] IResolverContext resolverContext,
    [Service] IReadRepository<BillItemType> repository,
    [Service] IDistributedCache distributedCache,
    [Service] IExportService<BillItemType> exportService,
    CancellationToken cancellationToken = default)
  {
    var query = await repository.AsQueryable().MaterializeIfRequiredAsync(resolverContext);
    var billItemTypes = await query.ToListAsync(cancellationToken);

    return await ExportToExcelAsync(billItemTypes, distributedCache, exportService, cancellationToken);
  }

  [BackOfficePermission(Features.COMMON_BILLITEMTYPES, Permission.Read)]
  public Task<bool> CanUseInternalCode(
    string internalCode,
    int? currentBillItemTypeId,
    [Service] IReadRepository<BillItemType> repository,
    CancellationToken cancellationToken = default)
    => base.CanUseInternalCode(internalCode, currentBillItemTypeId, repository, cancellationToken);

  [BackOfficePermission(Features.COMMON_BILLITEMTYPES, Permission.Read)]
  public Task<string?> ProposeNewInternalCode([Service] ICodeSuggestor<BillItemType> codeSuggestor)
    => codeSuggestor.SuggestNextCode(null, partialEntity: null);
}
