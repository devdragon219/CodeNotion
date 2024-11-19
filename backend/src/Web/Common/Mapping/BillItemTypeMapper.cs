using Microsoft.EntityFrameworkCore;
using RealGimm.Core;
using RealGimm.Core.Common.AccountingItemAggregate;
using RealGimm.Core.Common.VATRateAggregate;
using RealGimm.Core.Prop.BillItemTypeAggregate;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Web.Common.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Common.Mapping;

public sealed class BillItemTypeMapper : IMapper<BillItemTypeInput, BillItemType>
{
  private readonly IReadRepository<VATRate> _vatRates;
  private readonly IReadRepository<AccountingItem> _accountingItems;
  public BillItemTypeMapper(IReadRepository<VATRate> vatRates,
    IReadRepository<AccountingItem> accountingItems)
  {
    _vatRates = vatRates;
    _accountingItems = accountingItems;
  }

  async Task<BillItemType?> IMapper<BillItemTypeInput, BillItemType>.MapAsync(
    BillItemTypeInput? from,
    BillItemType? into,
    CancellationToken cancellationToken)
  {
    if (from is null)
    {
      return null;
    }

    var billItemType = into ?? new BillItemType();
    billItemType.SetData(from.Description,
      from.IsForContractFee,
      from.IsForContractCosts,
      from.IsForAdministration,
      from.IsPositive,
      from.IsForTax);

    billItemType.SetInternalCode(from.InternalCode);
    billItemType.SetDefaultAccountingItem(from.DefaultAccountingItemId is null
      ? null
      : await _accountingItems.GetByIdAsync(
        from.DefaultAccountingItemId.Value,
        cancellationToken));

    var vatRates = await _vatRates.AsQueryable(new GetByIdsSpec<VATRate>(
      new[] {
        from.ActiveSubjectVRId,
        from.ActiveExemptVRId,
        from.ActiveNonTaxableVRId,
        from.PassiveSubjectVRId,
        from.PassiveExemptVRId,
        from.PassiveNonTaxableVRId,
        from.AdministrationVRId
      }.Distinct()
      .ToArray()
    )).ToListAsync(cancellationToken: cancellationToken);

    billItemType.SetVatRates(
      vatRates.Single(vr => vr.Id == from.ActiveSubjectVRId),
      vatRates.Single(vr => vr.Id == from.ActiveExemptVRId),
      vatRates.Single(vr => vr.Id == from.ActiveNonTaxableVRId),
      vatRates.Single(vr => vr.Id == from.PassiveSubjectVRId),
      vatRates.Single(vr => vr.Id == from.PassiveExemptVRId),
      vatRates.Single(vr => vr.Id == from.PassiveNonTaxableVRId),
      vatRates.Single(vr => vr.Id == from.AdministrationVRId)
    );

    if (into is null && from.Id.GetValueOrDefault() != default)
    {
      billItemType.Id = from.Id!.Value;
    }

    return billItemType;
  }
}
