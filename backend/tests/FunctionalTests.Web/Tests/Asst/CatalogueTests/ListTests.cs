using RealGimm.Core.Asst.CatalogueItemAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Asst.CatalogueTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class ListTests : BasePageableListTests<CatalogueOutput>
{
  protected override string ModuleName => "catalogue";
  protected override string MethodName => "listCatalogues";
  protected override string EntityFragment => GraphQLHelper.Asst.CatalogueOutputFragment();

  public ListTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
