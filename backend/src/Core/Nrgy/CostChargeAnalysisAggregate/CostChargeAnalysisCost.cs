using RealGimm.Core.Extensions;

namespace RealGimm.Core.Nrgy.CostChargeAnalysisAggregate;

public record CostChargeAnalysisCost(decimal CurrentYearValue, decimal PreviousYearValue)
{
  public decimal Difference => (CurrentYearValue - PreviousYearValue).Round2();
  public decimal? DifferencePercentage => (PreviousYearValue == 0) ? null : (Difference / PreviousYearValue * 100).Round2();
}
