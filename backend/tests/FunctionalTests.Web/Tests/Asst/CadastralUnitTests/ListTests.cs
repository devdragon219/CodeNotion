using RealGimm.Core.Asst.CadastralUnitAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Asst.CadastralUnitTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class ListTests : BasePageableListTests<CadastralUnit>
{
  protected override string EntityFragment => GraphQLHelper.Asst.CadastralUnitFragment();

  public ListTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
