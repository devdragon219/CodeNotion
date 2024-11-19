namespace RealGimm.Web.Fclt.Models;

public record IssuesPercentageByStatusStatistics
{
  public required double NewStatusPercentage { get; set; }
  public required double AssignedStatusPercentage { get; set; }
  public required double InProgressStatusPercentage { get; set; }
  public required double ResolvedStatusPercentage { get; set; }
  public required double CompletedStatusPercentage { get; set; }
}
