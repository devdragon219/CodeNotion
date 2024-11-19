namespace RealGimm.Web.Nrgy.Models;

public record ReadingInput
{
  public int UtilityServiceId { get; set; }
  public string? Notes { get; set; }
  public DateTime ReadingTimestamp { get; set; }
  public bool IsEstimated { get; set; }
  public ReadingValueInput[] Values { get; set; } = Array.Empty<ReadingValueInput>();
}
