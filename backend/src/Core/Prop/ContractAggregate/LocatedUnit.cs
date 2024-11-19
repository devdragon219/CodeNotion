namespace RealGimm.Core.Prop.ContractAggregate;

public class LocatedUnit : EntityBase
{
  public int? EstateSubUnitId { get; private set; }
  public int EstateUnitId { get; private set; }
  public bool IsMainUnit { get; private set; }
  public bool IsRegistryUpdateEnabled { get; private set; }
  public bool IsPartialLocation { get; private set; }
  public int? SurfaceSqM { get; private set; }

  public void SetEstateUnit(int estateUnitId, int? estateSubUnitId)
  {
    EstateUnitId = estateUnitId;
    EstateSubUnitId = estateSubUnitId;
  }

  public void SetIsMainUnit(bool mainUnit) => IsMainUnit = mainUnit;

  public void SetIsRegistryUpdateEnabled(bool registryUpdateEnabled)
      => IsRegistryUpdateEnabled = registryUpdateEnabled;

  public void SetIsPartialLocation(bool partialLocation) => IsPartialLocation = partialLocation;

  public void SetSurfaceSqM(int? surfaceSqM) => SurfaceSqM = surfaceSqM;
}
