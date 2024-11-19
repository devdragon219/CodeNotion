using RealGimm.Core.Fclt.TicketChecklistAggregate;

namespace RealGimm.Web.Fclt.Models;

public record UpdateTicketChecklistInput
{
  public string InternalCode { get; set; } = default!;
  public string Name { get; set; } = default!;
  public decimal RawWorkCost { get; set; }
  public decimal SafetyCost { get; set; }
  public CostBaseFactor CostBaseFactor { get; set; }
  public PlannedPeriod? PreventativePlannedPeriod { get; set; }
  public DayOfWeek[]? PreventativeDaysOfWeek { get; set; }
  public int? PreventativeToleranceDays { get; set; }
  public int[]? PreventativeActivityIds { get; set; } = [];
  public int[]? OnTriggerActivityIds { get; set; } = [];
}
