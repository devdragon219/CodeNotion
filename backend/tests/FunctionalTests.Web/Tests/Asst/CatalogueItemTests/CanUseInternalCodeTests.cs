using RealGimm.Core.Asst.CatalogueItemAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Asst.CatalogueItemTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class CanUseInternalCodeTests : BaseCanUseInternalCodeTests<CatalogueItem>
{
  public CanUseInternalCodeTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
