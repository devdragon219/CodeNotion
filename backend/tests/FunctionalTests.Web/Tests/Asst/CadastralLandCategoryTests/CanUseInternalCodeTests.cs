using RealGimm.Core.Asst.CadastralLandCategoryAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Asst.CadastralLandCategoryTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class CanUseInternalCodeTests : BaseCanUseInternalCodeTests<CadastralLandCategory>
{
  public CanUseInternalCodeTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
