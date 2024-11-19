using RealGimm.Core.Fclt.PriceListAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.PriceListTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class GetTests : BaseGetTests<PriceList>
{
  protected override string EntityFragment => GraphQLHelper.Fclt.PriceListFragment();

  public GetTests(SeededDbWebFactory factory) : base(factory)
  {
  } 
}
