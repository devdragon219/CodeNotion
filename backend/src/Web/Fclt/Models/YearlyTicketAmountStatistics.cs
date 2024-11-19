using RealGimm.Core.Shared;

namespace RealGimm.Web.Fclt.Models;

public record YearlyTicketAmountStatistics
{
  public required decimal TotalAmount { get; set; }
  public required Trend TotalAmountTrend { get; set; }
  public required decimal ExcludedAmount { get; set; }
  public required Trend ExcludedAmountTrend { get; set; }
  public required decimal NonExcludedAmount { get; set; }
  public required Trend NonExcludedAmountTrend { get; set; }
}
