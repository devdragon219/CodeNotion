namespace RealGimm.Web.Nrgy.Models;

public record CostChargeConsumptionInput
{
  public DateOnly Since { get; set; }
  public DateOnly Until { get; set; }
  public ReadingValueInput[] Values { get; set; } = Array.Empty<ReadingValueInput>();
}
