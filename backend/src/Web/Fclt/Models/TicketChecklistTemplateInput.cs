using RealGimm.Core.Fclt.TicketChecklistAggregate;
using RealGimm.Core.Fclt.TicketChecklistTemplateAggregate;

namespace RealGimm.Web.Fclt.Models;

public record TicketChecklistTemplateInput
{
  public string InternalCode { get; set; } = default!;
  public string Name { get; set; } = default!;
  public int CatalogueTypeId { get; set; }
  public TicketChecklistTemplateType Type { get; set; }
  public decimal RawWorkCost { get; set; }
  public decimal SafetyCost { get; set; }
  public CostBaseFactor CostBaseFactor { get; set; }
  public PlannedPeriod? PreventativePlannedPeriod { get; set; }
  public DayOfWeek[]? PreventativeDaysOfWeek { get; set; }
  public int? PreventativeToleranceDays { get; set; }
  public int? PreventativeInterventionTypeId { get; set; }
  public int? PreventativeCraftId { get; set; }
  public int[]? PreventativeActivityIds { get; set; } = [];
  public int? OnTriggerInterventionTypeId { get; set; }
  public int? OnTriggerCraftId { get; set; }
  public int[]? OnTriggerActivityIds { get; set; } = [];
}
