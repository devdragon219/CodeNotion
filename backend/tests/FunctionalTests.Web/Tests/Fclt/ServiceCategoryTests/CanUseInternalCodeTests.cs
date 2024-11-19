using RealGimm.Core.Fclt.ServiceCategoryAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.ServiceCategoryTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class CanUseInternalCodeTests : BaseCanUseInternalCodeTests<ServiceCategory>
{
  public CanUseInternalCodeTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
