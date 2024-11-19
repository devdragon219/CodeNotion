using RealGimm.Core.Fclt.CraftAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.CraftTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public sealed class ListTests : BasePageableListTests<Craft>
{
  protected override string EntityFragment => GraphQLHelper.Fclt.CraftFragment();

  public ListTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
