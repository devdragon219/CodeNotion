namespace RealGimm.Web.Fclt.Models;

public record IssuesPercentageByPriorityStatistics
{
  public required double MinorStatusPercentage { get; set; }
  public required double NormalStatusPercentage { get; set; }
  public required double MajorStatusPercentage { get; set; }
  public required double CriticalStatusPercentage { get; set; }
}
