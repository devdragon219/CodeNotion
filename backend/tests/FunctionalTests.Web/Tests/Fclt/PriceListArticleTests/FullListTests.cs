using RealGimm.Core.Fclt.PriceListArticleAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.PriceListArticleTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public sealed class FullListTests : BaseFullListTests<PriceListArticle>
{
  protected override string EntityFragment => GraphQLHelper.Fclt.PriceListArticleFragment();

  public FullListTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
