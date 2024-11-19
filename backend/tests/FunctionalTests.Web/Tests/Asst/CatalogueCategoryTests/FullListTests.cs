using RealGimm.Core.Asst.CatalogueCategoryAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Asst.CatalogueCategoryTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public sealed class FullListTests : BaseFullListTests<CatalogueCategory>
{
  protected override string EntityFragment => GraphQLHelper.Asst.CatalogueCategoryFragment(includeCatalogueTypes: true);

  public FullListTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
