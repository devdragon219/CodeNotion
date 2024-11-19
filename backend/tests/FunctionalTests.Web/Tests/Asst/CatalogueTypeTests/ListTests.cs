using RealGimm.Core.Asst.CatalogueTypeAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Asst.CatalogueTypeTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public sealed class ListTests : BasePageableListTests<CatalogueType>
{
  protected override string EntityFragment => GraphQLHelper.Asst.CatalogueTypeFragment();

  public ListTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
