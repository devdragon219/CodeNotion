using RealGimm.Core.Asst.CatalogueTypeAggregate;
using RealGimm.Core.Fclt.PriceListArticleAggregate;
using RealGimm.Web.Asst.DataLoaders;

namespace RealGimm.Web.Fclt.Extensions;

[ExtendObjectType(typeof(PriceListArticle))]
public sealed class PriceListArticleExtension
{
  public async Task<IEnumerable<CatalogueType>> GetCatalogueTypes(
    [Parent] PriceListArticle article,
    [Service] CatalogueTypeDataLoader loader,
    CancellationToken cancellationToken = default)
    => await loader.LoadAsync(article.CatalogueTypeIds, cancellationToken);
}
