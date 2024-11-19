namespace RealGimm.Core.Shared.RevaluationCalculation;

public interface IRevaluationCalculator
{
  public Task<RevaluationStep[]> CalculateRevaluations(Dictionary<DateOnly, decimal> baseAmounts,
    DateOnly startDate,
    DateOnly endDate,
    decimal incrementFactor,
    bool useRoundedPercent,
    int periodDurationMonths,
    string countryIso3);
}
