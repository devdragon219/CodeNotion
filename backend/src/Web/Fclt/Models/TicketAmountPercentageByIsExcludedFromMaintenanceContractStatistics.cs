namespace RealGimm.Web.Fclt.Models;

public record TicketAmountPercentageByIsExcludedFromMaintenanceContractStatistics
{
  public required double ExcludedAmountPercentage { get; set; }
  public required double NonExcludedAmountPercentage { get; set; }
}
