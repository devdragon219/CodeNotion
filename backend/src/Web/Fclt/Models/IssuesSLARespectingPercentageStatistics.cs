namespace RealGimm.Web.Fclt.Models;

public record IssuesSLARespectingPercentageStatistics
{
  public required double RespectingPercentage { get; set; }
  public required double NotRespectingPercentage { get; set; }
}
