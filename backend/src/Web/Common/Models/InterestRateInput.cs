namespace RealGimm.Web.Common.Models;

public record InterestRateInput
{
  public int? Id { get; set; }
  public decimal Rate { get; set; }
  public DateOnly Since { get; set; }
  public DateOnly? Until { get; set; }
}
