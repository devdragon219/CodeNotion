namespace RealGimm.Core.Prop.ContractAggregate.Models;

public sealed record ContractMonthlyStatisticsOutput(
  DateOnly Date,
  int TotalActiveContractsCount,
  int TotalPassiveContractsCount,
  decimal TotalActiveContractsRevenue,
  decimal TotalPassiveContractsRevenue);
