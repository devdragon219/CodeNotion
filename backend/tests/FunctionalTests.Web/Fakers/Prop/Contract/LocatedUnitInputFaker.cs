using RealGimm.Infrastructure.Prop.Data.Fakers;
using RealGimm.Infrastructure;
using RealGimm.Web.Prop.Models;

namespace RealGimm.FunctionalTests.Web.Fakers.Prop.Contract;

public sealed class LocatedUnitInputFaker : BaseSeededFaker<LocatedUnitInput>
{
  public required Dictionary<int, IEnumerable<int>> EstateSubUnitsByUnitsIds { get; init; }
  public required bool IsActiveContract { get; init; }

  public LocatedUnitInputFaker()
  {
    CustomInstantiator(faker =>
    {
      var input = new LocatedUnitInput();

      (input.EstateUnitId, input.EstateSubUnitId) = LocatedUnitFaker.GenerateEstateUnit(faker, EstateSubUnitsByUnitsIds!, IsActiveContract);
      input.IsRegistryUpdateEnabled = LocatedUnitFaker.GenerateSetIsRegistryUpdateEnabled(faker);
      input.IsPartialLocation = LocatedUnitFaker.GenerateSetIsPartialLocation(faker);
      input.SurfaceSqM = LocatedUnitFaker.GenerateSetSurfaceSqM(faker);

      return input;
    });
  }
}
