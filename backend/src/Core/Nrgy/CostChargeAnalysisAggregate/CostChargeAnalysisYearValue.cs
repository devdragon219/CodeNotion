namespace RealGimm.Core.Nrgy.CostChargeAnalysisAggregate;

public record CostChargeYearlyAnalysis(CostChargeAnalysisValue Value, Dictionary<int, CostChargeAnalysisValue>? PerMonth);
