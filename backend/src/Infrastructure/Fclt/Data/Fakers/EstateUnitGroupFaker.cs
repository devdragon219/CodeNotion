using RealGimm.Core.Fclt.EstateUnitGroupAggregate;

namespace RealGimm.Infrastructure.Fclt.Data.Fakers;

public sealed class EstateUnitGroupFaker : BaseSeededFaker<EstateUnitGroup>
{
  private int _generatedObjectsCount = 0;

  public required IEnumerable<int> EstateUnitIds { get; init; }
  public required IEnumerable<int> ManagementSubjectIds { get; init; }

  public EstateUnitGroupFaker()
  {
    CustomInstantiator(faker =>
    {
      var estateUnitGroup = new EstateUnitGroup();
      
      estateUnitGroup.SetData(
        name: faker.Company.CompanyName(),
        internalCode: $"L{(_generatedObjectsCount + 1).ToString().PadLeft(5, '0')}",
        managementSubjectId: faker.PickRandom(ManagementSubjectIds));

      estateUnitGroup.SetEstateUnitIds(faker.PickRandom(EstateUnitIds, faker.Random.Int(2, 10)).ToArray());

      return estateUnitGroup;
    });

    FinishWith((faker, estateUnitGroup) =>
    {
      EnsureValid(estateUnitGroup);
      _generatedObjectsCount++;
    });
  }
}
