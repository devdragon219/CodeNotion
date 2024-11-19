using RealGimm.Core.Shared.Charts;

namespace RealGimm.Web.Fclt.Models;

public record IssuesStatusLineChartDataPoint : ILineChartDataPoint<IssuesStatusLineChartDataPoint>
{
  public required int NewCount { get; set; }
  public required int AssignedCount { get; set; }
  public required int InProgressCount { get; set; }
  public required int ResolvedCount { get; set; }
  public required int CompletedCount { get; set; }

  public static IssuesStatusLineChartDataPoint Zero { get; } = new()
  {
    NewCount = 0,
    AssignedCount = 0,
    InProgressCount = 0,
    ResolvedCount = 0,
    CompletedCount = 0
  };

  public static IssuesStatusLineChartDataPoint operator +(
    IssuesStatusLineChartDataPoint left,
    IssuesStatusLineChartDataPoint right)
  {
    return new()
    {
      NewCount = left.NewCount + right.NewCount,
      AssignedCount = left.AssignedCount + right.AssignedCount,
      InProgressCount = left.InProgressCount + right.InProgressCount,
      ResolvedCount = left.ResolvedCount + right.ResolvedCount,
      CompletedCount = left.CompletedCount + right.CompletedCount
    };
  }
}
