namespace RealGimm.Plugin.Import.Prop.Models;

public class LocatedUnitDTO
{
  public string Id { get; set; } = default!;
  public string ContractId { get; set; } = default!;
  public string EstateSubUnitId { get; set; } = default!;
  public string? EstateUnitId { get; set; }
  public bool IsMainUnit { get; set; }
  public bool IsPartiallyLocated { get; set; }
  public bool IsRegistryUpdated { get; set; }
  public int? SurfaceSqM { get; private set; }
}
