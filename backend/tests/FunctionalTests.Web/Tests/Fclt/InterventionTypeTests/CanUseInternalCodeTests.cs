using RealGimm.Core.Fclt.InterventionTypeAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.InterventionTypeTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class CanUseInternalCodeTests : BaseCanUseInternalCodeTests<InterventionType>
{
  public CanUseInternalCodeTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
