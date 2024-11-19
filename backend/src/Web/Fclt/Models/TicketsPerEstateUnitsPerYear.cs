namespace RealGimm.Web.Fclt.Models;

public record TicketsPerEstateUnitsPerYear
{
  public int RequestYear { get; set; }
  public TicketsPerEstateUnit[] Tickets { get; set; } = [];
}
