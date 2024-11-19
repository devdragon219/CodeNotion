using RealGimm.Core.Nrgy.UtilityServiceAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Nrgy.UtilityServiceTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class CanUseInternalCodeTests : BaseCanUseInternalCodeTests<UtilityService>
{
  public CanUseInternalCodeTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
