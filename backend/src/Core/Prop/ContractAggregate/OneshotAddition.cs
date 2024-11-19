using System.ComponentModel.DataAnnotations;
using RealGimm.Core.Prop.BillItemTypeAggregate;
using RealGimm.Core.Prop.RegistrationPaymentAggregate;
using RealGimm.SharedKernel.Attributes;

namespace RealGimm.Core.Prop.ContractAggregate;

public class OneshotAddition : EntityBase
{
  public BillItemType BillItemType { get; private set; } = default!;
  public DateOnly StartDate { get; private set; }
  public int AccountingItemId { get; private set; }
  public int VATRateId { get; private set; }
  public bool IsRentalRateVariation { get; private set; }
  public decimal Amount { get; private set; }
  public int? Installments { get; private set; }
  public bool IsBoundToTermDay { get; private set; }
  public DateOnly? TermStartDate { get; private set; }
  public DateOnly? TermEndDate { get; private set; }

  [MaxLength(StrFieldSizes.NOTES), FuzzySearchable]
  public string? Notes { get; private set; }
  public RegistrationPayment? RegistrationPayment { get; private set; }

  public void SetBillItemType(BillItemType billItemType) => BillItemType = billItemType; 

  public void SetStartDate(DateOnly startDate) => StartDate = startDate;

  public void SetAccountingItemId(int accountingItemId) => AccountingItemId = accountingItemId;

  public void SetVATRateId(int vatRateId) => VATRateId = vatRateId;

  public void SetIsRentalRateVariation(bool isRentalRateVariation)
      => IsRentalRateVariation = isRentalRateVariation;

  public void SetAmount(decimal amount) => Amount = amount;

  public void SetInstallments(int? installments) => Installments = installments;

  public void SetIsBoundToTermDay(bool isBoundToTermDay)
      => IsBoundToTermDay = isBoundToTermDay;

  public void SetTermStartDate(DateOnly? termStartDate) => TermStartDate = termStartDate;

  public void SetTermEndDate(DateOnly? termEndDate) => TermEndDate = termEndDate;

  public void SetNotes(string? notes) => Notes = notes;

  public void SetRegistrationPayment(RegistrationPayment? registrationPayment) => RegistrationPayment = registrationPayment;

}
