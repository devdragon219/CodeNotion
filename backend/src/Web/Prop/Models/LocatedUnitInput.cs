using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Web.Prop.Models;

public sealed record LocatedUnitInput : IMaybeIdentifiable
{
  public int? Id { get; set; }
  public int? EstateSubUnitId { get; set; }
  public int? EstateUnitId { get; set; }
  public bool IsMainUnit { get; set; }
  public bool IsRegistryUpdateEnabled { get; set; }
  public bool IsPartialLocation { get; set; }
  public int? SurfaceSqM { get; set; }
}
