namespace RealGimm.Web.Fclt.Models;

public record IssuesExcludedFromMaintenanceContractStatistics
{
  public required double ExcludedPercentage { get; set; }
  public double NonExcludedPercentage => 100d - ExcludedPercentage;
}
