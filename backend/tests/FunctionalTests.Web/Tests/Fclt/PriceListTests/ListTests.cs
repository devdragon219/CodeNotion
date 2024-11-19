using RealGimm.Core.Fclt.PriceListAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.PriceListTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public sealed class ListTests : BasePageableListTests<PriceList>
{
  protected override string EntityFragment => GraphQLHelper.Fclt.PriceListFragment();

  public ListTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
