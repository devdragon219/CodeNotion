namespace RealGimm.Plugin.Import.Asst.Models;

public record StairDTO
{
  public string Id { get; set; } = default!;
  public string Name { get; set; } = default!;
  public string? EstateId { get; set; }
}
