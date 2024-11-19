namespace RealGimm.Core.Nrgy.CostChargeAnalysisAggregate;

public record CostChargeAnalysisFilters(
  int[]? EstateIds,
  int[]? UtilityTypesIds,
  string[]? UtilityContractCodes,
  string? CityName,
  string? CountyName,
  string? Toponymy);
