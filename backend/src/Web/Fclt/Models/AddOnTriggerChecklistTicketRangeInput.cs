namespace RealGimm.Web.Fclt.Models;

public record AddOnTriggerChecklistTicketRangeInput
{
  public int ContractId { get; set; }
  public int TicketChecklistId { get; set; }
  public int[] CatalogueItemIds { get; set; } = [];
}
