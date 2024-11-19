namespace RealGimm.Core.Prop.ContractAggregate.Models;

public sealed record ContractStatisticsOutput(
  ContractMonthlyStatisticsOutput[] Monthly,
  ContractYearlyStatisticsOutput[] Yearly
);
