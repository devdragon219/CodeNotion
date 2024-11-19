using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Core.Asst.EstateMainUsageTypeAggregate;
using RealGimm.Core.Asst.EstateUsageTypeAggregate;
using RealGimm.FunctionalTests.Web.Tests.Asst.EstateUnitTests;
using RealGimm.Infrastructure;

namespace RealGimm.FunctionalTests.Web.Fakers.Asst;

public sealed class EstateFaker : BaseSeededFaker<Estate>
{
  public required int ManagementSubjectId { get; init; }
  public required IEnumerable<EstateUsageType> UsageTypes { get; init; }
  public required IEnumerable<EstateMainUsageType> MainUsageTypes { get; init; }

  public EstateFaker() : base(seed: 1)
  {
    // TODO: replace old static method call with actual generation logic
    CustomInstantiator(faker => EstateUnitMutationTest
      .CreateEstate(id: default,
        ManagementSubjectId,
        faker.PickRandom(UsageTypes),
        faker.PickRandom(MainUsageTypes)));
  }
}
