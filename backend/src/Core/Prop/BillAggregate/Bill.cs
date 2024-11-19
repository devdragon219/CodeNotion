using System.ComponentModel.DataAnnotations;
using Ardalis.Result;
using HotChocolate;
using RealGimm.Core.Prop.ContractAggregate;
using RealGimm.SharedKernel.Attributes;
using RealGimm.SharedKernel.Interfaces;
using RealGimm.Core.CrossModule;
using RealGimm.Core.Prop.AdministrationTermAggregate;
using RealGimm.Core.Shared;

namespace RealGimm.Core.Prop.BillAggregate;

public class Bill : EntityBase, IAggregateRoot, IDateOnlyRanged, IInternallyCoded
{
  [MaxLength(StrFieldSizes.INTERNAL_CODE), FuzzySearchable]
  public string InternalCode { get; private set; } = default!;
  
  [MaxLength(StrFieldSizes.EXTERNAL_CODE), FuzzySearchable]
  public string? ExternalSourceCode { get; set; }

  [MaxLength(StrFieldSizes.EXTERNAL_CODE), FuzzySearchable]
  public string? ExternalExportCode { get; set; }

  public bool IsTemporary => !FinalDate.HasValue;
  public int Year { get; private set; }
  public int TransactorSubjectId { get; private set; }
  public int MainCounterpartSubjectId { get; private set; }
  public int? EstateUnitId { get; private set; }
  public int? InvoiceId { get; private set; }
  public bool IsOccupiedWithoutRight { get; private set; }
  public bool IsInvoiced { get; private set; }
  public PaymentType TransactorPaymentType { get; private set; }
  public Contract? Contract { get; private set; }
  public DateOnly Date { get; private set; }
  public DateOnly? Since { get; private set; }
  public DateOnly? Until { get; private set; }
  public DateTime? FinalDate { get; private set; }
  public BillEmissionType EmissionType { get; private set; }
  public BillingPeriod ContractBillingPeriod { get; private set; }
  public decimal TotalAmount { get; private set; }
  public NullSafeCollection<BillRow> BillRows { get; private set; } = [];

  public void SetExternalSourceCode(string externalSourceCode) => ExternalSourceCode = externalSourceCode;
  public void SetExternalExportCode(string externalExportCode) => ExternalExportCode = externalExportCode;
  public void SetInternalCode(string internalCode) => InternalCode = internalCode;

  public void SetYear(int year) => Year = year;

  public void SetTransactorSubjectId(int transactorSubjectId) => TransactorSubjectId = transactorSubjectId;

  public void SetMainCounterpartSubjectId(int mainCounterpartSubjectId) => MainCounterpartSubjectId = mainCounterpartSubjectId;

  public void SetEstateUnitId(int estateUnitId) => EstateUnitId = estateUnitId;

  public void SetIsOccupiedWithoutRight(bool isOccupiedWithoutRight) => IsOccupiedWithoutRight = isOccupiedWithoutRight;

  public void SetIsInvoiced(bool isInvoiced) => IsInvoiced = isInvoiced;

  public void SetTransactorPaymentType(PaymentType transactorPaymentType) => TransactorPaymentType = transactorPaymentType;

  public void SetContract(Contract contract) => Contract = contract;

  public void SetDate(DateOnly date) => Date = date;

  public void SetSince(DateOnly? since) => Since = since;

  public void SetUntil(DateOnly? until) => Until = until;

  public void SetFinalDate(DateTime? finalDate) => FinalDate = finalDate;

  public void SetEmissionType(BillEmissionType emissionType) => EmissionType = emissionType;

  public void SetContractBillingPeriod(BillingPeriod contractBillingPeriod) => ContractBillingPeriod = contractBillingPeriod;

  public void SetTotalAmount(decimal totalAmount) => TotalAmount = totalAmount;


  [GraphQLIgnore]
  public IEnumerable<ValidationError> Validate()
  {
    if (string.IsNullOrWhiteSpace(InternalCode))
    {
      yield return ErrorCode.BillInternalCodeIsNullOrEmptyString.ToValidationError();
    }

    if (TotalAmount <= 0)
    {
      yield return ErrorCode.BillTotalAmountIsLessThanOrEqualToZero.ToValidationError();
    }

    foreach (var billRow in BillRows)
    {
      foreach (var validationError in billRow.Validate())
      {
        yield return validationError;
      }
    }
  }
}
