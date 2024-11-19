using RealGimm.Core.Fclt.PriceListArticleAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.PriceListArticleTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class GetTests : BaseGetTests<PriceListArticle>
{
  protected override string EntityFragment
  {
    get => GraphQLHelper.Fclt.PriceListArticleFragment();
  }

  public GetTests(SeededDbWebFactory factory) : base(factory)
  {
  } 
}
