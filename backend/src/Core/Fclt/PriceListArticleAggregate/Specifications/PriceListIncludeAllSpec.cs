using Ardalis.Specification;

namespace RealGimm.Core.Fclt.PriceListArticleAggregate.Specifications;

public class PriceListArticleIncludeAllSpec : Specification<PriceListArticle>
{
  public PriceListArticleIncludeAllSpec()
  {
    Query
      .Include(article => article.PriceList)
      .Include(article => article.PricePeriods)
      .Include(article => article.MeasurementUnit);
  }
}
