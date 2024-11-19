using RealGimm.Web.Fclt.Models;
using RealGimm.WebCommons.Mapping;
using RealGimm.Core.Fclt.PriceListArticleAggregate;

namespace RealGimm.Web.Fclt.Mapping;

public class ArticlePricePeriodMapper : IMapper<ArticlePricePeriodInput, ArticlePricePeriod>
{
  public ArticlePricePeriod? MapAsync(ArticlePricePeriodInput? from, ArticlePricePeriod? into = null)
  {
    if (from is null)
    {
      return null;
    }

    var articlePricePeriod = into ?? new ArticlePricePeriod() { Id = from.Id.GetValueOrDefault() };
    articlePricePeriod.SetPrice(from.Price);
    articlePricePeriod.SetSince(from.Since);
    articlePricePeriod.SetUntil(from.Until);

    return articlePricePeriod;
  }

  Task<ArticlePricePeriod?> IMapper<ArticlePricePeriodInput, ArticlePricePeriod>.MapAsync(
    ArticlePricePeriodInput? from,
    ArticlePricePeriod? into,
    CancellationToken cancellationToken)
    => Task.FromResult(MapAsync(from, into));
}
