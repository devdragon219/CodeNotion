using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Ardalis.Result;
using HotChocolate;
using RealGimm.Core.Common;
using RealGimm.Core.Common.VATRateAggregate;
using RealGimm.Core.CrossModule;
using RealGimm.Core.Prop.BillAggregate;
using RealGimm.Core.Prop.BillItemTypeAggregate;
using RealGimm.Core.Prop.ContractAggregate.Events;
using RealGimm.Core.Prop.ContractTypeAggregate;
using RealGimm.Core.Prop.RegistrationPaymentAggregate;
using RealGimm.Core.Prop.RegistryCommunicationAggregate;
using RealGimm.Core.Shared;
using RealGimm.SharedKernel.Attributes;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Prop.ContractAggregate;

public class Contract : EntityBase, IAggregateRoot, IInternallyCoded
{
  public EntryStatus Status { get; private set; }

  [MaxLength(StrFieldSizes.INTERNAL_CODE), Required, FuzzySearchable]
  public string InternalCode { get; private set; } = default!;

  [MaxLength(StrFieldSizes.EXTERNAL_CODE), FuzzySearchable]
  public string? ExternalCode { get; private set; }

  [MaxLength(StrFieldSizes.EXTERNAL_CODE), FuzzySearchable]
  public string? PreviousCode { get; private set; }

  public int ManagementSubjectId { get; private set; }
  public ContractType Type { get; private set; } = default!;
  public Reason Reason { get; private set; }
  public DateOnly AgreementDate { get; private set; }
  public DateOnly EffectStartDate { get; private set; }
  public DateOnly LastRenewalStartDate { get; private set; }
  public int? FirstTermDurationMonths { get; private set; }
  public int? SecondTermDurationMonths { get; private set; }
  public DateOnly? FirstTermExpirationDate { get; private set; }
  public DateOnly? SecondTermExpirationDate { get; private set; }
  public int? AnytimeTerminationWarningMonths { get; private set; }
  public int? NonRenewalWarningMonths { get; private set; }
  public DateOnly BillingStartDate { get; private set; }
  public bool BillingAfterTerm { get; private set; }
  public bool RecoverBillsAfterSuspension { get; private set; }
  public bool BillingAlignedToCalendarYear { get; private set; }
  public bool BillingAppliesBaseFee { get; private set; }
  public decimal? BillingBaseFee { get; private set; }
  public BillItemType? BillingBaseFeeBillItemType { get; private set; } 
  public VATRateType? BillingVATRateType { get; private set; }
  public BillingPeriod? BillingPeriod { get; private set; }
  public bool BillingWithSplitPayment { get; private set; }
  public AutomaticBoolean? BillingWithStampTax { get; private set; }

  [MaxLength(StrFieldSizes.NOTES), FuzzySearchable]
  public string? Notes { get; private set; }

  [MaxLength(StrFieldSizes.NOTES), FuzzySearchable]
  public string? BillingNotes { get; private set; }
  public ReleaseReason? ReleaseReason { get; private set; }
  public DateOnly? ReleaseDate { get; private set; }
  public bool IsReleased => ReleaseDate.HasValue || ReleaseReason.HasValue || IsOccupiedWithoutRight.HasValue;
  public DateOnly? TerminationDate { get; private set; }
  public ContractTerminator? Terminator { get; private set; }
  public bool? IsOccupiedWithoutRight { get; private set; }
  public DateOnly? BillingEndDate { get; private set; }
  public Contract? SublocatedContract { get; private set; }
  public RegistrationTax? RegistrationTaxData { get; private set; }
  public Revaluation? RevaluationData { get; private set; }
  public NullSafeCollection<Contract> SubLocations { get; private set; } = new();
  public NullSafeCollection<LocatedUnit> LocatedUnits { get; private set; } = new();
  public NullSafeCollection<Counterpart> Counterparts { get; private set; } = new();
  public NullSafeCollection<Transactor> Transactors { get; private set; } = new();
  private readonly List<SecurityDeposit> _securityDeposits = new();
  public IReadOnlyList<SecurityDeposit> SecurityDeposits => _securityDeposits.AsReadOnly();
  public NullSafeCollection<Takeover> Takeovers { get; private set; } = new();
  public NullSafeCollection<RegistrationPayment> RegistrationPayments { get; private set; } = new();
  public NullSafeCollection<BillingPause> BillingPauses { get; private set; } = new();
  public NullSafeCollection<RatePlan> RatePlans { get; private set; } = new();
  public NullSafeCollection<RevaluationHistory> RevaluationHistories { get; private set; } = new();
  public NullSafeCollection<OneshotAddition> OneshotAdditions { get; private set; } = new();
  public NullSafeCollection<RecurringAddition> RecurringAdditions { get; private set; } = new();
  public NullSafeCollection<Bill> Bills { get; private set; } = new();
  public NullSafeCollection<RegistryCommunication> RegistryCommunications { get; private set; } = new();

  [NotMapped, GraphQLIgnore]
  public bool IsRevaluationModified { get; private set; }

  [NotMapped]
  public int DurationYears {
    get {
      var endDate = LastRenewalStartDate;
      if(FirstTermDurationMonths is not null)
      {
        endDate = endDate.AddMonths(FirstTermDurationMonths.Value);
      } else if (FirstTermExpirationDate is not null)
      {
        endDate = FirstTermExpirationDate.Value;
      }

      if(SecondTermDurationMonths is not null)
      {
        endDate = endDate.AddMonths(SecondTermDurationMonths.Value);
      } else if (SecondTermExpirationDate is not null)
      {
        endDate = SecondTermExpirationDate.Value;
      }

      return (int)Math.Round((endDate.DayNumber - EffectStartDate.DayNumber) / 365.0);
    }
  }

  public void SetStatus(EntryStatus status) => Status = status;

  public void SetInternalCode(string internalCode) => InternalCode = internalCode;

  public void SetExternalCode(string? externalCode) => ExternalCode = externalCode;

  public void SetPreviousCode(string? previousCode) => PreviousCode = previousCode;

  public void SetManagementSubjectId(int managementSubjectId)
    => ManagementSubjectId = managementSubjectId;

  public void SetType(ContractType type) => Type = type;

  public void SetReason(Reason reason) => Reason = reason;

  public void SetAgreementDate(DateOnly agreementDate) => AgreementDate = agreementDate;

  public void SetEffectStartDate(DateOnly effectStartDate)
    => EffectStartDate = effectStartDate;

  public void SetLastRenewalStartDate(DateOnly lastRenewalStartDate)
    => LastRenewalStartDate = lastRenewalStartDate;

  public void SetFirstTermDetails(int? firstTermDurationMonths, DateOnly? firstTermExpirationDate)
  {
    FirstTermDurationMonths = firstTermDurationMonths;
    FirstTermExpirationDate = firstTermExpirationDate;
  }

  public void SetSecondTermDetails(int? secondTermDurationMonths, DateOnly? secondTermExpirationDate)
  {
    SecondTermDurationMonths = secondTermDurationMonths;
    SecondTermExpirationDate = secondTermExpirationDate;
  }

  public void SetWarningMonths(int? anytimeTerminationWarningMonths, int? nonRenewalWarningMonths)
  {
    AnytimeTerminationWarningMonths = anytimeTerminationWarningMonths;
    NonRenewalWarningMonths = nonRenewalWarningMonths;
  }

  public void SetBillingStartDate(DateOnly billingStartDate) => BillingStartDate = billingStartDate;

  public void SetBillingAfterTerm(bool billingAfterTerm) => BillingAfterTerm = billingAfterTerm;

  public void SetBillingVATRateType(VATRateType? billingVatRateType) => BillingVATRateType = billingVatRateType;

  public void SetRecoverBillsAfterSuspension(bool recoverBillsAfterSuspension)
    => RecoverBillsAfterSuspension = recoverBillsAfterSuspension;

  public void SetBillingAlignedToCalendarYear(bool billingAlignedToCalendarYear)
    => BillingAlignedToCalendarYear = billingAlignedToCalendarYear;

  public void SetBillingBaseFee(
    bool billingAppliesBaseFee,
    decimal? billingBaseFee,
    BillItemType? billingBaseFeeBillItemType)
  {
    BillingAppliesBaseFee = billingAppliesBaseFee;
    BillingBaseFee = billingBaseFee;
    BillingBaseFeeBillItemType = billingBaseFeeBillItemType;
  }

  public void SetBillingPeriod(BillingPeriod? billingPeriod) => BillingPeriod = billingPeriod;

  public void SetBillingWithSplitPayment(bool billingWithSplitPayment)
    => BillingWithSplitPayment = billingWithSplitPayment;

  public void SetBillingWithStampTax(AutomaticBoolean? billingWithStampTax)
    => BillingWithStampTax = billingWithStampTax;

  public void SetBillingNotes(string? billingNotes) => BillingNotes = billingNotes;

  public void SetNotes(string? notes) => Notes = notes;

  public void SetReleaseDetails(ReleaseReason? releaseReason, DateOnly? releaseDate, bool? isOccupiedWithoutRight)
  {
    ReleaseReason = releaseReason;
    ReleaseDate = releaseDate;
    IsOccupiedWithoutRight = isOccupiedWithoutRight;
  }

  public void SetTerminationData(ContractTerminator? contractTerminator, DateOnly? terminationDate)
  {
    Terminator = contractTerminator;
    TerminationDate = terminationDate;
  }

  public void SetTerminationDate(DateOnly? terminationDate) => TerminationDate = terminationDate;

  public void SetTerminator(ContractTerminator? terminator) => Terminator = terminator;

  public void SetBillingEndDate(DateOnly? billingUpToDate) => BillingEndDate = billingUpToDate;

  public void AddSecurityDeposit(SecurityDeposit sd)
  {
    if (!HasDomainEvent<ContractDepositUpdatedEvent>())
    {
      RegisterDomainEvent(new ContractDepositUpdatedEvent(Id));
    }
    _securityDeposits.Add(sd);
  }

  public void RemoveSecurityDeposit(SecurityDeposit sd)
  {
    _securityDeposits.Remove(sd);
  }

  public void SetSublocatedContract(Contract? sublocatedContract) => SublocatedContract = sublocatedContract;

  public void SetRegistrationTaxData(RegistrationTax? registrationTaxData)
    => RegistrationTaxData = registrationTaxData;

  public void SetRevaluationData(Revaluation? revaluationData)
  {
    if (revaluationData is null ^ RevaluationData is null)
    {
      IsRevaluationModified = true;
    }

    RevaluationData = revaluationData;
  }

  [GraphQLIgnore]
  public virtual IEnumerable<ValidationError> Validate()
  {
    if (!Counterparts.Any())
    {
      yield return ErrorCode.ContractCounterpartsAreRequired.ToValidationError();
    }
    else
    {
      if (double.Round(Counterparts.Sum(counterpart => counterpart.ContractSharePercent)) != 100)
      {
        yield return ErrorCode.ContractCounterpartsSharePercentSumShouldBe100.ToValidationError();
      }

      if (Counterparts.Count(counterpart => counterpart.IsMainCounterpart) != 1)
      {
        yield return ErrorCode.ContractShouldHaveOneMainCounterpart.ToValidationError();
      }

      foreach (var counterpart in Counterparts)
      {
        foreach (var validationError in counterpart.Validate())
        {
          yield return validationError;
        }
      }
    }

    if (!Transactors.Any())
    {
      yield return ErrorCode.ContractTransactorsAreRequired.ToValidationError();
    }
    else
    {
      if (double.Round(Transactors.Sum(counterpart => counterpart.TransactionSharePercent)) != 100)
      {
        yield return ErrorCode.ContractTransactorsSharePercentSumShouldBe100.ToValidationError();
      }

      foreach (var transactor in Transactors)
      {
        foreach (var validationError in transactor.Validate())
        {
          yield return validationError;
        }
      }
    }

    if (!LocatedUnits.Any())
    {
      yield return ErrorCode.ContractLocatedUnitsAreRequired.ToValidationError();
    }
    else
    {
      if (LocatedUnits.Count(locatedUnit => locatedUnit.IsMainUnit) != 1)
      {
        yield return ErrorCode.ContractShouldHaveOneMainLocatedUnit.ToValidationError();
      }
    }

    foreach (var pause in BillingPauses)
    {
      foreach (var validationError in pause.Validate())
      {
        yield return validationError;
      }
    }

    if (BillingPauses.ContainsOverlaps())
    {
      yield return ErrorCode.ContractBillingPausesContainsOverlaps.ToValidationError();
    }

    if (IsOccupiedWithoutRight.HasValue && ReleaseDate is null && ReleaseReason is null)
    {
      yield return ErrorCode.ContractReleaseDataIsNotFull.ToValidationError();
    }
  }

  public override void UpdateDomainEventsBeforeSave()
  {
    if (!HasDomainEvent<ContractDepositUpdatedEvent>()
      && _securityDeposits.Any(sd => sd.IsModified))
    {
      RegisterDomainEvent(new ContractDepositUpdatedEvent(Id));
    }

    if(IsRevaluationModified || (RevaluationData?.IsModified ?? false))
    {
      RegisterDomainEvent(new ContractRevaluationUpdatedEvent(Id));
    }
  }
}
