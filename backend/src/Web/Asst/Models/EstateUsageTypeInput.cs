namespace RealGimm.Web.Asst.Models;

public record EstateUsageTypeInput
{
  public string Name { get; set; } = default!;
  public string InternalCode { get; set; } = default!;
  public bool IsForEstate { get; set; }
  public bool IsForEstateUnit { get; set; }
  public bool IsForEstateSubUnit { get; set; }
  public bool IsForContracts { get; set; }
  public int Ordering { get; set; }
}
