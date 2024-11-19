using RealGimm.Core.Asst.CadastralLandCategoryAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Asst.CadastralLandCategoryTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class GetTests : BaseGetTests<CadastralLandCategory>
{
  protected override string EntityFragment => GraphQLHelper.Asst.CadastralLandCategoryFragment();

  public GetTests(SeededDbWebFactory factory) : base(factory)
  {
  } 
}
