namespace RealGimm.Web.Asst.Models;

public record EstateMainUsageTypeInput
{
  public string Name { get; set; } = default!;
  public string InternalCode { get; set; } = default!;
  public int Ordering { get; set; }
}
