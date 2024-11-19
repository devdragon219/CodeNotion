using Bogus;
using RealGimm.Core.Prop.ContractAggregate;

namespace RealGimm.Infrastructure.Prop.Data.Fakers;

public sealed class LocatedUnitFaker : BaseSeededFaker<LocatedUnit>
{
  public required Dictionary<int, IEnumerable<int>> EstateSubUnitsByUnitsIds { get; init; } 
  public required bool IsActiveContract { get; init; }

  public LocatedUnitFaker()
  {
    CustomInstantiator(faker =>
    {
      var locatedUnit = new LocatedUnit();

      var (estateUnitId, estateSubUnitId) = GenerateEstateUnit(faker, EstateSubUnitsByUnitsIds!, IsActiveContract);
      locatedUnit.SetEstateUnit(estateUnitId, estateSubUnitId);

      locatedUnit.SetIsRegistryUpdateEnabled(GenerateSetIsRegistryUpdateEnabled(faker));
      locatedUnit.SetIsPartialLocation(GenerateSetIsPartialLocation(faker));
      locatedUnit.SetSurfaceSqM(GenerateSetSurfaceSqM(faker));

      return locatedUnit;
    });
  }

  public static (int EstateUnitId, int? EstateSubUnitId) GenerateEstateUnit(
    Faker faker,
    IReadOnlyDictionary<int, IEnumerable<int>> estateSubUnitsIds,
    bool isActiveContract)
  {
    var estateUnitId = isActiveContract
      ? faker.PickRandom(estateSubUnitsIds.Where(pair => pair.Value.Any()).Select(pair => pair.Key))
      : faker.PickRandom(estateSubUnitsIds.Keys);

    var estateSubUnitId = isActiveContract
      ? faker.PickRandom(estateSubUnitsIds[estateUnitId])
      : (int?)null;

    return (estateUnitId, estateSubUnitId);
  }
  
  public static bool GenerateSetIsRegistryUpdateEnabled(Faker faker) => faker.Random.Bool();
  
  public static bool GenerateSetIsPartialLocation(Faker faker) => faker.Random.Bool();

  public static int? GenerateSetSurfaceSqM(Faker faker)
    => faker.Random.Bool()
      ? faker.Random.Int(10, 1000)
      : null;
}
