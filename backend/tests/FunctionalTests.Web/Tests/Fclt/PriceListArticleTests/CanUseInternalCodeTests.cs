using RealGimm.Core.Fclt.PriceListArticleAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.PriceListArticleTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class CanUseInternalCodeTests : BaseCanUseInternalCodeTests<PriceListArticle>
{
  public CanUseInternalCodeTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
