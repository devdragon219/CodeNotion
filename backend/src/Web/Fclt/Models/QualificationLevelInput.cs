namespace RealGimm.Web.Fclt.Models;

public record QualificationLevelInput
{
  public string Name { get; set; } = default!;
  public string InternalCode { get; set; } = default!;
  public int Ordering { get; set; }
}
