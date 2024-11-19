using RealGimm.Core.Shared.Charts;

namespace RealGimm.Web.Fclt.Models;

public record IssuesExcludedFromMaintenanceContractLineChartDataPoint : ILineChartDataPoint<IssuesExcludedFromMaintenanceContractLineChartDataPoint>
{
  public required int ExcludedCount { get; init; }
  public required int NonExcludedCount { get; init; }

  public static IssuesExcludedFromMaintenanceContractLineChartDataPoint Zero { get; } = new()
  {
    ExcludedCount = 0,
    NonExcludedCount = 0
  };

  public static IssuesExcludedFromMaintenanceContractLineChartDataPoint operator +(
    IssuesExcludedFromMaintenanceContractLineChartDataPoint left,
    IssuesExcludedFromMaintenanceContractLineChartDataPoint right)
  {
    return new()
    {
      ExcludedCount = left.ExcludedCount + right.ExcludedCount,
      NonExcludedCount = left.NonExcludedCount + right.NonExcludedCount
    };
  }
}
