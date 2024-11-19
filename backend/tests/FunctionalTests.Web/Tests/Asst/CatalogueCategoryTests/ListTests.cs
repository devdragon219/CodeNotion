using RealGimm.Core.Asst.CatalogueCategoryAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Asst.CatalogueCategoryTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class ListTests : BasePageableListTests<CatalogueCategory>
{
  protected override string EntityFragment => GraphQLHelper.Asst.CatalogueCategoryFragment();

  public ListTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
