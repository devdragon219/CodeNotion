namespace RealGimm.Web.Fclt.Models;

public record IssuesAverageResolutionDurationByStatusStatistics
{
  public required TimeSpan? NewDuration { get; set; }
  public required TimeSpan? AssignedDuration { get; set; }
  public required TimeSpan? InProgressDuration { get; set; }
  public required TimeSpan? ResolvedDuration { get; set; }
  public required TimeSpan? CompletedDuration { get; set; }
}
