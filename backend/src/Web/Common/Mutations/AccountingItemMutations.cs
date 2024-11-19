using Ardalis.Result;
using RealGimm.Core;
using RealGimm.Core.Common.AccountingItemAggregate;
using RealGimm.Core.IAM;
using RealGimm.Core.Shared.Interfaces;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Web.Common.Models;
using RealGimm.WebCommons.Extensions;
using RealGimm.WebCommons;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Common.Mutations;

public sealed class AccountingItemMutations : MutationsBase
{
  [BackOfficePermission(Features.COMMON_ACCOUNTINGITEMS, Permission.Create)]
  public async Task<Result<AccountingItem>> Add(
    AccountingItemInput input,
    [Service] IRepository<AccountingItem> repository,
    [Service] IMapper mapper,
    CancellationToken cancellationToken = default)
  {
    AccountingItem? accountingItem;

    try
    {
      accountingItem = await mapper.MapAsync<AccountingItemInput, AccountingItem>(input, cancellationToken);
    }
    catch (MappingException exception)
    {
      return Result<AccountingItem>.Invalid(exception.ValidationErrors.ToList());
    }

    if (accountingItem is null)
    {
      return Result<AccountingItem>.Error();
    }

    await repository.AddAsync(accountingItem, cancellationToken);
    return accountingItem;
  }


  [BackOfficePermission(Features.COMMON_ACCOUNTINGITEMS, Permission.Update)]
  public async Task<Result<AccountingItem>> Update(
    int id,
    AccountingItemInput input,
    [Service] IRepository<AccountingItem> repository,
    [Service] IMapper mapper,
    CancellationToken cancellationToken = default)
  {
    var accountingItem = await repository.SingleOrDefaultAsync(new GetByIdSpec<AccountingItem>(id), cancellationToken);
    if (accountingItem is null)
    {
      return Result.NotFound();
    }

    try
    {
      await mapper.MapAsync(input, accountingItem, cancellationToken);
    }
    catch (MappingException exception)
    {
      return Result<AccountingItem>.Invalid(exception.ValidationErrors.ToList());
    }

    await repository.UpdateAsync(accountingItem, cancellationToken);

    return accountingItem;
  }


  [BackOfficePermission(Features.COMMON_ACCOUNTINGITEMS, Permission.Delete)]
  public Task<Result> Delete(
    int id,
    [Service] IRepository<AccountingItem> repository,
    [Service] IDeleteRestrictionChecker<AccountingItem> deleteRestrictionChecker,
    CancellationToken cancellationToken = default)
    => DeleteAsync(
        new GetByIdSpec<AccountingItem>(id),
        repository,
        deleteRestrictionChecker.HasRestrictionsAsync,
        cancellationToken);

  [BackOfficePermission(Features.COMMON_ACCOUNTINGITEMS, Permission.Delete)]
  public Task<Result> DeleteRange(
    int[] ids,
    [Service] IRepository<AccountingItem> repository,
    [Service] IDeleteRestrictionChecker<AccountingItem> deleteRestrictionChecker,
    CancellationToken cancellationToken = default)
    => DeleteRangeAsync(
        new GetByIdsSpec<AccountingItem>(ids),
        repository,        
        deleteRestrictionChecker.HasRestrictionsAsync,
        cancellationToken);
}
