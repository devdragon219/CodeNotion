namespace RealGimm.Core.Prop.ContractAggregate.Models;

public sealed record ContractYearlyStatisticsOutput(
  int Month,
  int TotalActiveContractsCount,
  int TotalPassiveContractsCount,
  decimal TotalActiveContractsRevenue,
  decimal TotalPassiveContractsRevenue);
