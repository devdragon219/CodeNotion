using System.ComponentModel.DataAnnotations;
using Ardalis.Result;
using HotChocolate;
using RealGimm.Core.Prop.AdministrationTermAggregate;
using RealGimm.Core.Prop.BillItemTypeAggregate;
using RealGimm.Core.Prop.ContractAggregate;
using RealGimm.SharedKernel.Attributes;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Prop.BillAggregate;

public class BillRow : EntityBase, IDateOnlyRanged
{
  public Bill Bill { get; private set; } = default!;
  public BillItemType ItemType { get; private set; } = default!;
  public int VATRateId { get; private set; }
  public decimal Amount { get; private set; }
  public DateOnly? Since { get; private set; }
  public DateOnly? Until { get; private set; }

  [MaxLength(StrFieldSizes.NOTES), FuzzySearchable]
  public string? Notes { get; private set; }

  public RecurringAddition? RecurringAdditionSource { get; private set; }
  public OneshotAddition? OneshotAdditionSource { get; private set; }
  public TermInstallment? TermInstallmentSource { get; private set; }

  public void SetBillItemType(BillItemType billItemType) => ItemType = billItemType;  

  public void SetVATRateId(int vatRateId) => VATRateId = vatRateId;

  public void SetAmount(decimal amount) => Amount = amount;

  public void SetSince(DateOnly? since) => Since = since;

  public void SetUntil(DateOnly? until) => Until = until;

  public void SetNotes(string? notes) => Notes = notes;

  public void SetSource(RecurringAddition? recurringAdditionSource,
    OneshotAddition? oneshotAdditionSource,
    TermInstallment? termInstallmentSource)
  {
    RecurringAdditionSource = recurringAdditionSource;
    OneshotAdditionSource = oneshotAdditionSource;
    TermInstallmentSource = termInstallmentSource;
  }

  [GraphQLIgnore]
  public IEnumerable<ValidationError> Validate()
  {
    if (Amount <= 0)
    {
      yield return ErrorCode.BillRowAmountIsLessThanOrEqualToZero.ToValidationError();
    }
  }
}
