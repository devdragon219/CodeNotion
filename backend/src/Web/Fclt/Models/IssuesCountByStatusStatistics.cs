namespace RealGimm.Web.Fclt.Models;

public record IssuesCountByStatusStatistics
{
  public required int NewStatusCount { get; set; }
  public required int AssignedStatusCount { get; set; }
  public required int InProgressStatusCount { get; set; }
  public required int ResolvedStatusCount { get; set; }
  public required int CompletedStatusCount { get; set; }
}
