using RealGimm.Core.Asst.FunctionAreaAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Asst.FunctionAreaTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class ListTests : BasePageableListTests<FunctionArea>
{
  protected override string EntityFragment => GraphQLHelper.Asst.FunctionAreaFragment();

  public ListTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
