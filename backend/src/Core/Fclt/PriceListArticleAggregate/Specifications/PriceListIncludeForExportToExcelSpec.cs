using Ardalis.Specification;

namespace RealGimm.Core.Fclt.PriceListArticleAggregate.Specifications;

public class PriceListArticleIncludeForExportToExcelSpec : Specification<PriceListArticle>
{
  public PriceListArticleIncludeForExportToExcelSpec()
  {
    Query
      .Include(article => article.PriceList)
      .Include(article => article.PricePeriods)
      .Include(article => article.MeasurementUnit);
  }
}
