using RealGimm.Core.Asst.CatalogueItemAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Asst.CatalogueItemTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public sealed class ListTests : BasePageableListTests<CatalogueItem>
{
  protected override string EntityFragment => GraphQLHelper.Asst.CatalogueItemFragment();

  public ListTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
