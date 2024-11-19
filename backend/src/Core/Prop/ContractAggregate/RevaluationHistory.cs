namespace RealGimm.Core.Prop.ContractAggregate;

public class RevaluationHistory : EntityBase
{
  public DateOnly Since { get; private set; }
  public decimal BaseYearlyRate { get; private set; }
  public decimal IndexPercent { get; private set; }
  public decimal RevaluationAmount { get; private set; }
  public decimal YearlyRateWithRevaluation { get; private set; }

  public void SetSince(DateOnly since) => Since = since;

  public void SetBaseYearlyRate(decimal baseYearlyRate) => BaseYearlyRate = baseYearlyRate;

  public void SetIndexPercent(decimal indexPercent) => IndexPercent = indexPercent;

  public void SetRevaluationAmount(decimal revaluationAmount) => RevaluationAmount = revaluationAmount;

  public void SetYearlyRateWithRevaluation(decimal yearlyRateWithRevaluation)
    => YearlyRateWithRevaluation = yearlyRateWithRevaluation;
}
