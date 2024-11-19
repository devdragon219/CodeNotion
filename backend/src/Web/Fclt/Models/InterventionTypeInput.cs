namespace RealGimm.Web.Fclt.Models;

public record InterventionTypeInput
{
  public string Name { get; set; } = default!;
  public string InternalCode { get; set; } = default!;
}
