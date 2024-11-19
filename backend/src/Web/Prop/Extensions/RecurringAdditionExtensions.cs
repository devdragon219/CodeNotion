using RealGimm.Core.Common.AccountingItemAggregate;
using RealGimm.Core.Common.VATRateAggregate;
using RealGimm.Core.Prop.BillItemTypeAggregate;
using RealGimm.Core.Prop.ContractAggregate;
using RealGimm.Web.Common.DataLoaders;

namespace RealGimm.Web.Prop.Extensions;

[ExtendObjectType(typeof(RecurringAddition))]
public class RecurringAdditionExtensions
{
  public Task<VATRate> GetVATRate(
    [Parent] RecurringAddition recurringAddition,
    [Service] VATRateDataLoader dataLoader,
    CancellationToken cancellationToken = default)
    => dataLoader.LoadAsync(recurringAddition.VATRateId, cancellationToken);

  public Task<AccountingItem> GetAccountingItem(
    [Parent] RecurringAddition recurringAddition,
    [Service] AccountingItemDataLoader dataLoader,
    CancellationToken cancellationToken = default)
    => dataLoader.LoadAsync(recurringAddition.AccountingItemId, cancellationToken);
}
