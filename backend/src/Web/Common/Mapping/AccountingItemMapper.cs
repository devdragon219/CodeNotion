using RealGimm.Core.Common.AccountingItemAggregate;
using RealGimm.Web.Common.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Common.Mapping;

public sealed class AccountingItemMapper : IMapper<AccountingItemInput, AccountingItem>
{
  public AccountingItem? Map(AccountingItemInput? from, AccountingItem? into)
  {
    if (from is null)
    {
      return null;
    }

    var accountingItem = into ?? new AccountingItem();
    accountingItem.SetDescription(from.Description);
    accountingItem.SetCodes(from.InternalCode, from.ExternalCode);

    if (into is null && from.Id.GetValueOrDefault() != default)
    {
      accountingItem.Id = from.Id!.Value;
    }

    return accountingItem;
  }

  Task<AccountingItem?> IMapper<AccountingItemInput, AccountingItem>.MapAsync(
    AccountingItemInput? from,
    AccountingItem? into,
    CancellationToken cancellationToken)
    => Task.FromResult(Map(from, into));
}
