using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.FunctionalTests.Web.Tests.Asst.EstateUnitTests;
using RealGimm.Infrastructure;

namespace RealGimm.FunctionalTests.Web.Fakers.Asst;

public sealed class EstateUnitFaker : BaseSeededFaker<EstateUnit>
{
  public required IEnumerable<Estate> Estates { get; init; }

  public EstateUnitFaker()
  {
    // TODO: replace old static method call with actual generation logic
    CustomInstantiator(faker =>
      EstateUnitMutationTest.CreateEstateUnit(
        id: default,
        faker.PickRandom(Estates),
        EstateUnitMutationTest.CreateAddress("1"),
        Array.Empty<Floor>()));
  }
}
