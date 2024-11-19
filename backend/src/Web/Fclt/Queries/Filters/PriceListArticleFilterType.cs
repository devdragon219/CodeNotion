using System.Linq.Expressions;
using HotChocolate.Data.Filters;
using RealGimm.Core;
using RealGimm.Core.Fclt.PriceListArticleAggregate;

namespace RealGimm.Web.Fclt.Queries.Filters;

public class PriceListArticleFilterType : FilterInputType<PriceListArticle>
{
  protected override void Configure(IFilterInputTypeDescriptor<PriceListArticle> descriptor)
  {
    descriptor.BindFieldsImplicitly();

    descriptor
      .Field(CreateActualPriceExpression())
      .Name("actualPrice");

    descriptor
      .Field(CreateActualPriceSinceExpression())
      .Name("actualPriceSince");

    descriptor
      .Field(CreateActualPriceUntilExpression())
      .Name("actualPriceUntil");
  }

  private static Expression<Func<PriceListArticle, decimal?>> CreateActualPriceExpression()
  {
    var today = DateTime.Now.ToDateOnly();

    return article =>
      article.PricePeriods.OrderByDescending(period => period.Since).Any(period => today >= period.Since)
        ? article.PricePeriods.OrderByDescending(period => period.Since).First(period => today >= period.Since).Price
        : null;
  }

  private static Expression<Func<PriceListArticle, DateOnly?>> CreateActualPriceSinceExpression()
  {
    var today = DateTime.Now.ToDateOnly();

    return article =>
      article.PricePeriods.OrderByDescending(period => period.Since).Any(period => today >= period.Since)
        ? article.PricePeriods.OrderByDescending(period => period.Since).First(period => today >= period.Since).Since
        : null;
  }

  private static Expression<Func<PriceListArticle, DateOnly?>> CreateActualPriceUntilExpression()
  {
    var today = DateTime.Now.ToDateOnly();

    return article =>
      article.PricePeriods.OrderByDescending(period => period.Since).Any(period => today >= period.Since)
        ? article.PricePeriods.OrderByDescending(period => period.Since).First(period => today >= period.Since).Until
        : null;
  }
}
