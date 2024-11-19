using RealGimm.Core.Shared.Charts;

namespace RealGimm.Web.Fclt.Models;

public record TicketsTotalAmountChartDataPoint : ILineChartDataPoint<TicketsTotalAmountChartDataPoint>
{
  public required decimal TotalAmount { get; init; }

  public static TicketsTotalAmountChartDataPoint Zero { get; } = new()
  {
    TotalAmount = 0
  };

  public static TicketsTotalAmountChartDataPoint operator +(
    TicketsTotalAmountChartDataPoint left,
    TicketsTotalAmountChartDataPoint right)
  {
    return new()
    {
      TotalAmount = left.TotalAmount + right.TotalAmount
    };
  }
}
