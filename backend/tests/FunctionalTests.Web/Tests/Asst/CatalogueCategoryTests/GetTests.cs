using RealGimm.Core.Asst.CatalogueCategoryAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Asst.CatalogueCategoryTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class GetTests : BaseGetTests<CatalogueCategory>
{
  protected override string EntityFragment { get; } = GraphQLHelper.Asst.CatalogueCategoryFragment(includeCatalogueTypes: true);

  public GetTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
