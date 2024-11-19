using RealGimm.Core.Nrgy.UtilityTypeAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Nrgy.UtilityTypeTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class CanUseInternalCodeTests : BaseCanUseInternalCodeTests<UtilityType>
{
  public CanUseInternalCodeTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
