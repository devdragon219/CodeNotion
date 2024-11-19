using RealGimm.Core.Asst.CatalogueItemAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Asst.CatalogueItemTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class GetTests : BaseGetTests<CatalogueItem>
{
  protected override string EntityFragment { get; } = GraphQLHelper.Asst.CatalogueItemFragment(includeFields: true, includeCatalogueType: true);

  public GetTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
