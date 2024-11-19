using HotChocolate.Resolvers;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using RealGimm.Core.IAM;
using RealGimm.Core.Shared.Interfaces;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Web.Common.Queries.Filters;
using RealGimm.Web.Common.Queries.Sorting;
using RealGimm.WebCommons;
using RealGimm.WebCommons.Models;
using RealGimm.Core.Common.AccountingItemAggregate;
using RealGimm.Core;
using RealGimm.SharedKernel.Interfaces;
using Microsoft.Extensions.Caching.Distributed;

namespace RealGimm.Web.Common.Queries;
public class AccountingItemQueries : QueriesBase
{
  [BackOfficePermission(Features.COMMON_ACCOUNTINGITEMS, Permission.Read)]
  public async Task<AccountingItem?> Get(
    int id,
    [Service] IReadRepository<AccountingItem> repository,
    CancellationToken cancellationToken = default)
    => await repository.SingleOrDefaultAsync(new GetByIdSpec<AccountingItem>(id), cancellationToken);

  [BackOfficePermission(Features.COMMON_ACCOUNTINGITEMS, Permission.Read)]
  [UsePaging(IncludeTotalCount = true, MaxPageSize = 100)]
  [UseFiltering(typeof(AccountingItemFilterType))]
  [UseSorting(typeof(AccountingItemSortInputType))]
  public IQueryable<AccountingItem> ListAccountingTypes([Service] IReadRepository<AccountingItem> repository)
    => repository.AsQueryable();

  [BackOfficePermission(Features.COMMON_ACCOUNTINGITEMS, Permission.Read)]
  [UseFiltering(typeof(AccountingItemFilterType))]
  [UseSorting(typeof(AccountingItemSortInputType))]
  public async Task<FileUrlOutput> ExportToExcel(
    [SchemaService] IResolverContext resolverContext,
    [Service] IReadRepository<AccountingItem> repository,
    [Service] IDistributedCache distributedCache,
    [Service] IExportService<AccountingItem> exportService,
    CancellationToken cancellationToken = default)
  {
    var accountingItems = await repository
      .AsQueryable()
      .Filter(resolverContext)
      .Sort(resolverContext)
      .ToListAsync(cancellationToken);

    return await ExportToExcelAsync(accountingItems, distributedCache, exportService, cancellationToken);
  }

  [BackOfficePermission(Features.COMMON_ACCOUNTINGITEMS, Permission.Read)]
  public Task<bool> CanUseInternalCode(
    string internalCode,
    int? currentAccountingItemId,
    [Service] IReadRepository<AccountingItem> repository,
    CancellationToken cancellationToken = default)
    => base.CanUseInternalCode(internalCode, currentAccountingItemId, repository, cancellationToken);

  [BackOfficePermission(Features.COMMON_ACCOUNTINGITEMS, Permission.Read)]
  public Task<string?> ProposeNewInternalCode([Service] ICodeSuggestor<AccountingItem> codeSuggestor)
    => codeSuggestor.SuggestNextCode(null, partialEntity: null);
}
