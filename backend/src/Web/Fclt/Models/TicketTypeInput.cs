namespace RealGimm.Web.Fclt.Models;

public record TicketTypeInput
{
  public string Description { get; set; } = default!;
  public string InternalCode { get; set; } = default!;
  public int Ordering { get; set; }
}
