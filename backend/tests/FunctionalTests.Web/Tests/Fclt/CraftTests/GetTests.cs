using RealGimm.Core.Fclt.CraftAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.CraftTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class GetTests : BaseGetTests<Craft>
{
  protected override string EntityFragment => GraphQLHelper.Fclt.CraftFragment();

  public GetTests(SeededDbWebFactory factory) : base(factory)
  {
  } 
}
