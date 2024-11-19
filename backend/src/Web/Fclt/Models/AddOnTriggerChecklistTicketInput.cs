namespace RealGimm.Web.Fclt.Models;

public record AddOnTriggerChecklistTicketInput
{
  public int ContractId { get; set; }
  public int TicketChecklistId { get; set; }
  public int CatalogueItemId { get; set; }
}
