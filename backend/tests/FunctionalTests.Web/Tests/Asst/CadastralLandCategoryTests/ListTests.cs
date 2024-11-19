using RealGimm.Core.Asst.CadastralLandCategoryAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Asst.CadastralLandCategoryTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public sealed class ListTests : BasePageableListTests<CadastralLandCategory>
{
  protected override string EntityFragment => GraphQLHelper.Asst.CadastralLandCategoryFragment();
  protected override string MethodName => "cadastralLandCategories";

  public ListTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
