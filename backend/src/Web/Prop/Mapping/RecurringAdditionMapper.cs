using Microsoft.EntityFrameworkCore;
using RealGimm.Core;
using RealGimm.Core.Prop.BillItemTypeAggregate;
using RealGimm.Core.Prop.ContractAggregate;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Web.Prop.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Prop.Mapping;

public sealed class RecurringAdditionMapper : IMapper<RecurringAdditionInput, RecurringAddition>
{
  public required IReadRepository<BillItemType> BillItemTypeRepository { get; init; }

  async Task<RecurringAddition?> IMapper<RecurringAdditionInput, RecurringAddition>.MapAsync(
    RecurringAdditionInput? from,
    RecurringAddition? into,
    CancellationToken cancellationToken)
  {
    if (from is null)
    {
      return null;
    }

    var recurringAddition = into ?? new RecurringAddition();
    recurringAddition.SetBillItemType(
      await BillItemTypeRepository.AsQueryable(new GetByIdSpec<BillItemType>(
      from.BillItemTypeId)).FirstAsync(cancellationToken));
    recurringAddition.SetAccountingItemId(from.AccountingItemId);
    recurringAddition.SetVATRateId(from.VATRateId);
    recurringAddition.SetAmountPerInstallment(from.AmountPerInstallment);
    recurringAddition.SetExcludeStartMonth(from.ExcludeStartMonth);
    recurringAddition.SetExcludeEndMonth(from.ExcludeEndMonth);
    recurringAddition.SetNotes(from.Notes);

    if (into is null && from.Id.GetValueOrDefault() != default)
    {
      recurringAddition.Id = from.Id!.Value;
    }

    return recurringAddition;
  }
}
