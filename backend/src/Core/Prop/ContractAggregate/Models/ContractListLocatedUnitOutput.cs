using RealGimm.Core.Asst.EstateAggregate;

namespace RealGimm.Core.Prop.ContractAggregate.Models;

public sealed record ContractListLocatedUnitOutput
{
  public string? EstateUnitOrSubUnitInternalCode { get; set; }
  public string? EstateUnitName { get; set; }
  public Address? EstateUnitAddress { get; set; }
  public bool IsMainUnit { get; set; }
  public bool IsRegistryUpdateEnabled { get; set; }
  public bool IsPartialLocation { get; set; }
  public int? SurfaceSqM { get; set; }
}
