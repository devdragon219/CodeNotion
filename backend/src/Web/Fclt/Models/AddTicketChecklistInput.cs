namespace RealGimm.Web.Fclt.Models;

public record AddTicketChecklistInput
{
  public string InternalCode { get; set; } = default!;
  public int ContractId { get; set; }
  public int EstateUnitId { get; set; }
  public int TicketChecklistTemplateId { get; set; }
}
