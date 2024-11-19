using RealGimm.Core.Asst.CatalogueTypeAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Asst.CatalogueTypeTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public sealed class FullListTests : BaseFullListTests<CatalogueType>
{
  protected override string EntityFragment => GraphQLHelper.Asst.CatalogueTypeFragment();

  public FullListTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
