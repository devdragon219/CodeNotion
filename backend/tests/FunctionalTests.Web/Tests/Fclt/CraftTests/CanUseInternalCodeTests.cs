using RealGimm.Core.Fclt.CraftAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.CraftTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class CanUseInternalCodeTests : BaseCanUseInternalCodeTests<Craft>
{
  public CanUseInternalCodeTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
