namespace RealGimm.Core.Nrgy.CostChargeAnalysisAggregate;

public record CostChargeAnalysis(
  string MeasurementUnit,
  CostChargeAnalysisSurface Surface,
  CostChargeAnalysisConsumption Consumption,
  CostChargeAnalysisCost Cost,
  Dictionary<int, CostChargeYearlyAnalysis> PerYear);
