namespace RealGimm.Core.Nrgy.CostChargeAnalysisAggregate;

public record CostChargeAnalysisSurface(
  CostChargeAnalysisSurfaceValue? CurrentYear,
  CostChargeAnalysisSurfaceValue? PreviousYear);
