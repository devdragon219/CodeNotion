namespace RealGimm.Web.Prop.Models;

public record BillStateStatisticsOutput(
  int FinalBillsCount,
  double FinalBillsPercentage,
  int TemporaryBillsCount,
  double TemporaryBillsPercentage);
