using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using HotChocolate;
using RealGimm.SharedKernel;
using RealGimm.SharedKernel.Attributes;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Prop.ContractAggregate;

public class SecurityDeposit : EntityBase, IDateOnlyRanged
{
  public int? SubjectId { get; private set; }
  public SecurityDepositType Type { get; private set; }
  public DateOnly? Since { get; private set; }
  public DateOnly? Until { get; private set; }
  public decimal BaseAmount { get; private set; }
  public bool IsInterestCalculated { get; private set; }
  public DateOnly? InterestCalculationStartDate { get; private set; }
  public DateOnly? InterestCalculationEndDate { get; private set; }
  public DateOnly? TakeoverDate { get; private set; }
  public int? SuretySubjectId { get; private set; }
  public bool IsSuretyRenewable { get; private set; }
  public int? BankAccountId { get; private set; }

  [MaxLength(StrFieldSizes.NOTES), FuzzySearchable]
  public string? Notes { get; private set; }
  [GraphQLIgnore, NotMapped]
  public bool IsModified { get; private set; }

  public NullSafeCollection<SecurityDepositInterestRow> InterestRows { get; private set; } = new();

  public void SetSubjectId(int? subjectId) => SubjectId = subjectId;

  public void SetType(SecurityDepositType type)
  {
    if (!IsModified && Type != type)
    {
      IsModified = true;
    }
    Type = type;
  }

  public void SetSince(DateOnly? since)
  {
    if (!IsModified && !NullableComparer.Equals(Since, since))
    {
      IsModified = true;
    }
    Since = since;
  }

  public void SetUntil(DateOnly? until)
  {
    if (!IsModified && !NullableComparer.Equals(Until, until))
    {
      IsModified = true;
    }
    Until = until;
  }

  public void SetBaseAmount(decimal amount)
  {
    if (!IsModified && BaseAmount != amount)
    {
      IsModified = true;
    }
    BaseAmount = amount;
  }

  public void SetTakeoverDate(DateOnly? takeoverDate)
  {
    if (!IsModified
      && !NullableComparer.Equals(TakeoverDate, takeoverDate))
    {
      IsModified = true;
    }

    TakeoverDate = takeoverDate;
  }

  public void SetBankingAccountId(int? bankingId) => BankAccountId = bankingId;

  public void SetNotes(string? notes) => Notes = notes;

  public void SetCashData(bool calculateInterest, DateOnly? calculationStart, DateOnly? calculationEnd)
  {
    if (!IsModified && (
      IsInterestCalculated != calculateInterest
      || !NullableComparer.Equals(InterestCalculationStartDate, calculationStart)
      || !NullableComparer.Equals(InterestCalculationEndDate, calculationEnd)
    ))
    {
      IsModified = true;
    }
    IsInterestCalculated = calculateInterest;
    InterestCalculationStartDate = calculationStart;
    InterestCalculationEndDate = calculationEnd;
  }

  public void SetSuretyData(bool renewable, int? suretySubjectId)
  {
    SuretySubjectId = suretySubjectId;
    IsSuretyRenewable = renewable;
  }
}
