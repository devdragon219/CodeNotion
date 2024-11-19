using Ardalis.Specification;

namespace RealGimm.Core.Fclt.PriceListArticleAggregate.Specifications;

public class PriceListArticleIncludeForListSpec : Specification<PriceListArticle>
{
  public PriceListArticleIncludeForListSpec()
  {
    Query
      .Include(article => article.PriceList)
      .Include(article => article.PricePeriods)
      .Include(article => article.MeasurementUnit);
  }
}
