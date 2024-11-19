namespace RealGimm.Core.Nrgy.CostChargeAnalysisAggregate;

public record CostChargeAnalysisValue
{
  public required decimal TotalConsumption { get; init; }
  public required decimal? ConsumptionPerGrossSurface { get; init; }
  public required decimal? ConsumptionPerHeatingCoolingSurface { get; init; }
  public required decimal TotalCost { get; init; }
  public required decimal? CostPerGrossSurface { get; init; }
  public required decimal? CostPerHeatingCoolingSurface { get; init; }
}
