using Ardalis.Result;
using HotChocolate;
using RealGimm.Core.CrossModule;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Prop.ContractAggregate;

public class Transactor : EntityBase, IDateOnlyRanged
{
  public int SubjectId { get; private set; }
  public int AddressId { get; private set; }
  public int InvoiceAddressId { get; private set;}
  public double TransactionSharePercent { get; private set; }
  public bool IsInvoiced { get; private set; }
  public DateOnly Since { get; private set; }
  public DateOnly? Until { get; private set; }
  public PaymentType Type { get; private set; }

  DateOnly? IDateOnlyRanged.Since => Since;

  public void SetSubjectId(int subjectId) => SubjectId = subjectId;

  public void SetSince(DateOnly since) => Since = since;

  public void SetUntil(DateOnly? until) => Until = until;

  public void SetAddressId(int addressId) => AddressId = addressId;

  public void SetInvoiceAddressId(int invoiceAddressId) => InvoiceAddressId = invoiceAddressId;

  public void SetIsInvoiced(bool isInvoiced) => IsInvoiced = isInvoiced;

  public void SetTransactionSharePercent(double transactionSharePercent)
    => TransactionSharePercent = transactionSharePercent;

  public void SetPaymentType(PaymentType paymentType) => Type = paymentType;

  [GraphQLIgnore]
  public IEnumerable<ValidationError> Validate()
  {
    if (TransactionSharePercent is <= 0 or > 100)
    {
      yield return ErrorCode.TransactorTransactionSharePercentMustBeGreaterThanZeroAndLessOrEqualToOneHundred.ToValidationError();
    }
  }
}
