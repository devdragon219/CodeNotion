using RealGimm.Core.Asst.CatalogueTypeAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Asst.CatalogueTypeTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class GetTests : BaseGetTests<CatalogueType>
{
  protected override string EntityFragment { get; } = GraphQLHelper.Asst.CatalogueTypeFragment();

  public GetTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
