using System.ComponentModel.DataAnnotations;
using RealGimm.Core.Prop.BillItemTypeAggregate;
using RealGimm.SharedKernel.Attributes;

namespace RealGimm.Core.Prop.ContractAggregate;

public class RecurringAddition : EntityBase
{
  public BillItemType BillItemType { get; private set; } = default!;
  public int AccountingItemId { get; private set; }
  public int VATRateId { get; private set; }
  public decimal AmountPerInstallment { get; private set; }
  public int? ExcludeStartMonth { get; private set; }
  public int? ExcludeEndMonth { get; private set; }

  [MaxLength(StrFieldSizes.NOTES), FuzzySearchable]
  public string? Notes { get; private set; }

  public void SetBillItemType(BillItemType billItemType) => BillItemType = billItemType; 

  public void SetAccountingItemId(int accountingItemId) => AccountingItemId = accountingItemId;

  public void SetVATRateId(int vatRateId) => VATRateId = vatRateId;

  public void SetAmountPerInstallment(decimal amountPerInstallment)
    => AmountPerInstallment = amountPerInstallment;

  public void SetExcludeStartMonth(int? excludeStartMonth) => ExcludeStartMonth = excludeStartMonth;

  public void SetExcludeEndMonth(int? excludeEndMonth) => ExcludeEndMonth = excludeEndMonth;

  public void SetNotes(string? notes) => Notes = notes;

}
