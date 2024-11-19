namespace RealGimm.Plugin.Import.Asst.Models;

public class FloorDTO
{
  public string Id { get; set; } = default!;
  public string? Name { get; set; }
  public float? Ordering { get; set; }
  public Guid? TemplateId { get; set; }
}
