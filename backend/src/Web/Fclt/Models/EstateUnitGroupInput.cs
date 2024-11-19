namespace RealGimm.Web.Fclt.Models;

public record EstateUnitGroupInput
{
  public string Name { get; set; } = default!;
  public string InternalCode { get; set; } = default!;
  public int ManagementSubjectId { get; set; }
  public int[] EstateUnitIds { get; set; } = default!;
}
