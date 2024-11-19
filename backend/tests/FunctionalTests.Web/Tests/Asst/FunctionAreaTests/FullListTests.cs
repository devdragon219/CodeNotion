using RealGimm.Core.Asst.FunctionAreaAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Asst.FunctionAreaTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class FullListTests : BaseFullListTests<FunctionArea>
{
  protected override string EntityFragment => GraphQLHelper.Asst.FunctionAreaFragment();

  public FullListTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
