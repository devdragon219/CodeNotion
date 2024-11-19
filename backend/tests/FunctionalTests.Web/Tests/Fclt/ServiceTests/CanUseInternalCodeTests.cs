using RealGimm.Core.Fclt.ServiceAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.ServiceTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class CanUseInternalCodeTests : BaseCanUseInternalCodeTests<Service>
{
  public CanUseInternalCodeTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
