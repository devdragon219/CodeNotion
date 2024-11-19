using RealGimm.Core.Asst.CatalogueCategoryAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Asst.CatalogueCategoryTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class CanUseInternalCodeTests : BaseCanUseInternalCodeTests<CatalogueCategory>
{
  public CanUseInternalCodeTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
