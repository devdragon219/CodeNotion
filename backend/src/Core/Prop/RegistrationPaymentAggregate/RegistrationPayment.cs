using System.ComponentModel.DataAnnotations;
using RealGimm.Core.Prop.ContractAggregate;
using RealGimm.SharedKernel.Attributes;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Prop.RegistrationPaymentAggregate;

public class RegistrationPayment : EntityBase, IAggregateRoot
{
  public Contract Contract { get; private set; } = default!;
  public RegistrationPaymentType PaymentType { get; private set; }
  public int PaymentYear { get; private set; }

  [Required, MaxLength(StrFieldSizes.EXTERNAL_CODE), FuzzySearchable]
  public string PaymentCode { get; private set; } = default!;

  public DateOnly ValueDate { get; private set; }
  public decimal TaxAmount { get; private set; }
  public decimal SanctionAmount { get; private set; }
  public decimal TotalAmount { get; private set; }
  public NullSafeCollection<RegistrationPaymentRow> Rows { get; private set; } = [];

  public void SetContract(Contract contract) => Contract = contract;

  public void SetPaymentType(RegistrationPaymentType paymentType)
    => PaymentType = paymentType;

  public void SetPaymentYear(int paymentYear) => PaymentYear = paymentYear;

  public void SetPaymentCode(string paymentCode) => PaymentCode = paymentCode;

  public void SetValueDate(DateOnly valueDate) => ValueDate = valueDate;

  public void SetTaxAmount(decimal taxAmount) => TaxAmount = taxAmount;

  public void SetSanctionAmount(decimal sanctionAmount) => SanctionAmount = sanctionAmount;

  public void SetTotalAmount(decimal totalAmount) => TotalAmount = totalAmount;
}
