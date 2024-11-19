using Microsoft.EntityFrameworkCore;
using RealGimm.Core;
using RealGimm.Core.Prop.BillItemTypeAggregate;
using RealGimm.Core.Prop.ContractAggregate;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Web.Prop.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Prop.Mapping;

public sealed class OneshotAdditionMapper : IMapper<OneshotAdditionInput, OneshotAddition>
{
  public required IReadRepository<BillItemType> BillItemTypeRepository { get; init; }

  async Task<OneshotAddition?> IMapper<OneshotAdditionInput, OneshotAddition>.MapAsync(
    OneshotAdditionInput? from,
    OneshotAddition? into,
    CancellationToken cancellationToken)
  {
    if (from is null)
    {
      return null;
    }

    var oneshotAddition = into ?? new OneshotAddition();
    oneshotAddition.SetBillItemType(
      await BillItemTypeRepository
        .AsQueryable(new GetByIdSpec<BillItemType>(from.BillItemTypeId))
        .FirstAsync(cancellationToken));
    oneshotAddition.SetStartDate(from.StartDate);
    oneshotAddition.SetAccountingItemId(from.AccountingItemId);
    oneshotAddition.SetVATRateId(from.VATRateId);
    oneshotAddition.SetIsRentalRateVariation(from.IsRentalRateVariation);
    oneshotAddition.SetAmount(from.Amount);
    oneshotAddition.SetInstallments(from.Installments);
    oneshotAddition.SetIsBoundToTermDay(from.IsBoundToTermDay);
    oneshotAddition.SetTermStartDate(from.TermStartDate);
    oneshotAddition.SetTermEndDate(from.TermEndDate);
    oneshotAddition.SetNotes(from.Notes);

    if (into is null && from.Id.GetValueOrDefault() != default)
    {
      oneshotAddition.Id = from.Id!.Value;
    }

    return oneshotAddition;
  }
}
