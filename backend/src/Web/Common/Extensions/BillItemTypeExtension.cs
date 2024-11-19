using RealGimm.Core.Common.AccountingItemAggregate;
using RealGimm.Core.Common.CityAggregate;
using RealGimm.Core.Common.VATRateAggregate;
using RealGimm.Core.CrossModule;
using RealGimm.Core.Prop.BillItemTypeAggregate;
using RealGimm.Web.Common.DataLoaders;

namespace RealGimm.Web.Common.Extensions;

[ExtendObjectType(typeof(BillItemType))]
public sealed class BillItemTypeExtension
{
  public async Task<VATRate> GetActiveSubjectVR(
    [Parent] BillItemType billItemType,
    [Service] VATRateDataLoader dataLoader,
    CancellationToken cancellationToken = default)
    => await dataLoader.LoadAsync(billItemType.ActiveSubjectVRId, cancellationToken);

  public async Task<VATRate> GetActiveNonTaxableVR(
    [Parent] BillItemType billItemType,
    [Service] VATRateDataLoader dataLoader,
    CancellationToken cancellationToken = default)
    => await dataLoader.LoadAsync(billItemType.ActiveNonTaxableVRId, cancellationToken);

  public async Task<VATRate> GetActiveExemptVR(
    [Parent] BillItemType billItemType,
    [Service] VATRateDataLoader dataLoader,
    CancellationToken cancellationToken = default)
    => await dataLoader.LoadAsync(billItemType.ActiveExemptVRId, cancellationToken);

  public async Task<VATRate> GetPassiveSubjectVR(
    [Parent] BillItemType billItemType,
    [Service] VATRateDataLoader dataLoader,
    CancellationToken cancellationToken = default)
    => await dataLoader.LoadAsync(billItemType.PassiveSubjectVRId, cancellationToken);

  public async Task<VATRate> GetPassiveNonTaxableVR(
    [Parent] BillItemType billItemType,
    [Service] VATRateDataLoader dataLoader,
    CancellationToken cancellationToken = default)
    => await dataLoader.LoadAsync(billItemType.PassiveNonTaxableVRId, cancellationToken);

  public async Task<VATRate> GetPassiveExemptVR(
    [Parent] BillItemType billItemType,
    [Service] VATRateDataLoader dataLoader,
    CancellationToken cancellationToken = default)
    => await dataLoader.LoadAsync(billItemType.PassiveExemptVRId, cancellationToken);
  
  public async Task<AccountingItem?> GetDefaultAccountingItem(
    [Parent] BillItemType billItemType,
    [Service] AccountingItemDataLoader dataLoader,
    CancellationToken cancellationToken = default)
    => billItemType.DefaultAccountingItemId is null
    ? null
    : await dataLoader.LoadAsync(billItemType.DefaultAccountingItemId.Value, cancellationToken);

  public async Task<VATRate> GetAdministrationVR(
    [Parent] BillItemType billItemType,
    [Service] VATRateDataLoader dataLoader,
    CancellationToken cancellationToken = default)
    => await dataLoader.LoadAsync(billItemType.AdministrationVRId, cancellationToken);
}
