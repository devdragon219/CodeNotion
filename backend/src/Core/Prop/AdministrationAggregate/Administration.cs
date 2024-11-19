using System.ComponentModel.DataAnnotations;
using Ardalis.Result;
using HotChocolate;
using RealGimm.Core.CrossModule;
using RealGimm.Core.Prop.AdministrationTermAggregate;
using RealGimm.SharedKernel.Attributes;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Prop.AdministrationAggregate;

public class Administration : EntityBase, IAggregateRoot, IDateOnlyRanged
{
  public int EstateId { get; private set; }
  public int AdministratorSubjectId { get; private set; }
  public int? AdministratorBankAccountId { get; private set; }
  [MaxLength(StrFieldSizes.EXTERNAL_CODE), FuzzySearchable]
  public string? ExternalCode { get; set; }
  public AdministrationType AdministrationType { get; private set; }
  public PaymentType PaymentType { get; private set; }
  public DateOnly Since { get; private set; }
  DateOnly? IDateOnlyRanged.Since => Since;
  public DateOnly? Until { get; private set; }
  public NullSafeCollection<AdministrationTerm> Terms { get; private set; } = new();

  [MaxLength(StrFieldSizes.NOTES), FuzzySearchable]
  public string? Notes { get; private set; }

  public bool IsPaymentDataIncluded { get; private set; }

  public void SetExternalCode(string externalCode) => ExternalCode = externalCode;

  public void SetEstateId(int estateId) => EstateId = estateId;

  public void SetAdministratorSubjectId(int administratorSubjectId) => AdministratorSubjectId = administratorSubjectId;

  public void SetAdministratorBankAccountId(int? administratorBankAccountId)
    => AdministratorBankAccountId = administratorBankAccountId;

  public void SetAdministrationType(AdministrationType administrationType) => AdministrationType = administrationType;

  public void SetPaymentType(PaymentType paymentType) => PaymentType = paymentType;

  public void SetSince(DateOnly since) => Since = since;

  public void SetUntil(DateOnly? until) => Until = until;

  public void SetNotes(string? notes) => Notes = notes;

  public void SetIsPaymentDataIncluded(bool isPaymentDataIncluded) => IsPaymentDataIncluded = isPaymentDataIncluded;

  [GraphQLIgnore]
  public IEnumerable<ValidationError> Validate()
  {
    if (Since >= Until)
    {
      yield return ErrorCode.AdministrationSinceMustBeLessThanUntil.ToValidationError();
    }
  }
}
