using RealGimm.Core.Shared.Charts;

namespace RealGimm.Web.Fclt.Models;

public record TicketsAmountChartDataPoint : ILineChartDataPoint<TicketsAmountChartDataPoint>
{
  public required decimal ExcludedAmount { get; init; }
  public required decimal NonExcludedAmount { get; init; }

  public static TicketsAmountChartDataPoint Zero { get; } = new()
  {
    ExcludedAmount = 0,
    NonExcludedAmount = 0
  };

  public static TicketsAmountChartDataPoint operator +(
    TicketsAmountChartDataPoint left,
    TicketsAmountChartDataPoint right)
  {
    return new()
    {
      ExcludedAmount = left.ExcludedAmount + right.ExcludedAmount,
      NonExcludedAmount = left.NonExcludedAmount + right.NonExcludedAmount
    };
  }
}
