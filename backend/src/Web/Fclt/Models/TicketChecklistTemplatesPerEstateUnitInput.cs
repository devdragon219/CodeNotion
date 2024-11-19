namespace RealGimm.Web.Fclt.Models;

public record TicketChecklistTemplatesPerEstateUnitInput
{
  public int EstateUnitId { get; set; }
  public int[] TemplateIds { get; set; } = [];
}
