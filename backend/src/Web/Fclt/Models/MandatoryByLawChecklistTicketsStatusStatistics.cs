namespace RealGimm.Web.Fclt.Models;

public record MandatoryByLawChecklistTicketsStatusStatistics
{
  public required double DonePercentage { get; set; }
  public required double ExpiredPercentage { get; set; }
  public required double ScheduledPercentage { get; set; }
}
