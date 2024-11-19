using RealGimm.Core.Fclt.PriceListAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.PriceListTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public sealed class FullListTests : BaseFullListTests<PriceList>
{
  protected override string EntityFragment => GraphQLHelper.Fclt.PriceListFragment();

  public FullListTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
