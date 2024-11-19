using System.ComponentModel.DataAnnotations.Schema;
using HotChocolate;

namespace RealGimm.Core.Prop.ContractAggregate;

public class Revaluation
{
  public int RevaluationPeriodMonths { get; private set; }
  public bool IsAbsoluteRevaluationApplied { get; private set; }
  public bool IsRevaluationCalculated { get; private set; }
  public DateOnly ReferencePeriodStart { get; private set; }
  public DateOnly ReferencePeriodEnd { get; private set; }
  public decimal RevaluationSharePercent { get; private set; }
  public RevaluationRateType RateType { get; private set; }
  public decimal? BaseRevaluationRate { get; private set; }
  public DateOnly NextApplicationDate { get; private set; }
  public bool IsBackHistoryEnabled { get; private set; }

  [NotMapped, GraphQLIgnore]
  public bool IsModified { get; private set; }

  public void SetRevaluationPeriodMonths(int revaluationPeriodMonths)
  {
    if (!IsModified && RevaluationPeriodMonths != revaluationPeriodMonths) IsModified = true;
    RevaluationPeriodMonths = revaluationPeriodMonths;
  }

  public void SetIsAbsoluteRevaluationApplied(bool isAbsoluteRevaluationApplied)
  {
    if (!IsModified && IsAbsoluteRevaluationApplied != isAbsoluteRevaluationApplied) IsModified = true;
    IsAbsoluteRevaluationApplied = isAbsoluteRevaluationApplied;
  }

  public void SetIsRevaluationCalculated(bool isRevaluationCalculated)
  {
    if (!IsModified && IsRevaluationCalculated != isRevaluationCalculated) IsModified = true;
    IsRevaluationCalculated = isRevaluationCalculated;
  }

  public void SetReferencePeriodStart(DateOnly referencePeriodStart)
  {
    if (!IsModified && ReferencePeriodStart != referencePeriodStart) IsModified = true;
    ReferencePeriodStart = referencePeriodStart;
  }

  public void SetReferencePeriodEnd(DateOnly referencePeriodEnd)
  {
    if (!IsModified && ReferencePeriodEnd != referencePeriodEnd) IsModified = true;
    ReferencePeriodEnd = referencePeriodEnd;
  }

  public void SetRevaluationSharePercent(decimal revaluationSharePercent)
  {
    if (!IsModified && RevaluationSharePercent != revaluationSharePercent) IsModified = true;
    RevaluationSharePercent = revaluationSharePercent;
  }

  public void SetRateType(RevaluationRateType rateType)
  {
    if (!IsModified && RateType != rateType) IsModified = true;
    RateType = rateType;
  }

  public void SetBaseRevaluationRate(decimal? baseRevaluationRate)
  {
    if (!IsModified && BaseRevaluationRate != baseRevaluationRate) IsModified = true;
    BaseRevaluationRate = baseRevaluationRate;
  }

  public void SetNextApplicationDate(DateOnly nextApplicationDate)
  {
    if (!IsModified && NextApplicationDate != nextApplicationDate) IsModified = true;
    NextApplicationDate = nextApplicationDate;
  }

  public void SetIsBackHistoryEnabled(bool isBackHistoryEnabled)
  {
    if (!IsModified && IsBackHistoryEnabled != isBackHistoryEnabled) IsModified = true;
    IsBackHistoryEnabled = isBackHistoryEnabled;
  }
}
