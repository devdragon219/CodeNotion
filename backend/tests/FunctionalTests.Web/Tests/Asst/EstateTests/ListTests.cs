using RealGimm.Core.Asst.EstateAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Asst.EstateTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class ListTests : BasePageableListTests<Estate>
{
  protected override string EntityFragment => GraphQLHelper.Asst.EstateFragment();

  public ListTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
