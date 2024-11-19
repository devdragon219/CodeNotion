using RealGimm.Core.Asst.EstateSubUnitAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.Asst.EstateUsageTypeAggregate;

namespace RealGimm.Infrastructure.Asst.Data.Fakers;

public sealed class EstateSubUnitFaker : BaseSeededFaker<EstateSubUnit>
{
  private int _generatedEstateSubUnitsCount = 0;

  public required IEnumerable<EstateUnit> EstatesUnits { get; init; }
  public required IEnumerable<EstateUsageType> UsageTypes { get; init; }

  public EstateSubUnitFaker()
  {
    CustomInstantiator(faker =>
    {
      var estateUnit = faker.PickRandom(EstatesUnits);
      var internalCode = $"{estateUnit.InternalCode}SU{(_generatedEstateSubUnitsCount + 1).ToString().PadLeft(3, '0')}";

      var estateSubUnit = new EstateSubUnit(internalCode);
      estateSubUnit.SetEstateUnit(estateUnit);
      estateSubUnit.SetSurface(faker.Random.Bool() ? faker.Random.Int(15, 200) : null);
      estateSubUnit.SetOccupancy(OccupantType.CommonArea, null, null);
      estateSubUnit.SetUsageType(faker.Random.Bool() ? faker.PickRandom(UsageTypes) : null);
      estateSubUnit.SetNotes(faker.Random.Bool() ? faker.Lorem.Sentence(10, 5) : null);

      return estateSubUnit;
    });

    FinishWith((_, _) => _generatedEstateSubUnitsCount++);
  }
}
