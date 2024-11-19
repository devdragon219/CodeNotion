using RealGimm.Core.Common.AccountingItemAggregate;
using RealGimm.Core.Common.VATRateAggregate;
using RealGimm.Core.Prop.BillItemTypeAggregate;
using RealGimm.Core.Prop.ContractAggregate;
using RealGimm.Web.Common.DataLoaders;

namespace RealGimm.Web.Prop.Extensions;

[ExtendObjectType(typeof(OneshotAddition))]
public class OneshotAdditionExtensions
{
  public Task<VATRate> GetVATRate(
    [Parent] OneshotAddition oneshotAddition,
    [Service] VATRateDataLoader dataLoader,
    CancellationToken cancellationToken = default)
    => dataLoader.LoadAsync(oneshotAddition.VATRateId, cancellationToken);
  
  public Task<AccountingItem> GetAccountingItem(
    [Parent] OneshotAddition oneshotAddition,
    [Service] AccountingItemDataLoader dataLoader,
    CancellationToken cancellationToken = default)
    => dataLoader.LoadAsync(oneshotAddition.AccountingItemId, cancellationToken);
}
