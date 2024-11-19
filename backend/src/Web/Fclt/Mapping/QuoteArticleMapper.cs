using RealGimm.Core;
using RealGimm.Core.Fclt.PriceListArticleAggregate;
using RealGimm.Core.Fclt.PriceListMeasurementUnitAggregate;
using RealGimm.Core.Fclt.TicketAggregate;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Web.Fclt.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Fclt.Mapping;

public class QuoteArticleMapper : IMapper<QuoteArticleInput, QuoteArticle>
{
  private readonly IReadRepository<PriceListArticle> _priceListArticleRepository;
  private readonly IReadRepository<PriceListMeasurementUnit> _measurementUnitRepository;

  public QuoteArticleMapper(
    IReadRepository<PriceListArticle> priceListArticleRepository,
    IReadRepository<PriceListMeasurementUnit> measurementUnitRepository)
  {
    _priceListArticleRepository = priceListArticleRepository;
    _measurementUnitRepository = measurementUnitRepository;
  }

  public async Task<QuoteArticle?> MapAsync(
    QuoteArticleInput? from,
    QuoteArticle? into = null,
    CancellationToken cancellationToken = default)
  {
    if (from is null)
    {
      return null;
    }

    var quoteArticle = into ?? new QuoteArticle() { Id = from.Id.GetValueOrDefault() };
    quoteArticle.SetSourceArticle(from.SourceArticleId.HasValue ? await LoadSourceArticleAsync(from.SourceArticleId.Value) : null);
    quoteArticle.SetInternalCode(from.InternalCode);
    quoteArticle.SetName(from.Name);
    quoteArticle.SetQuantity(from.Quantity);
    quoteArticle.SetOrdering(from.Ordering);
    quoteArticle.SetMeasurementUnit(await LoadMeasurementUnitAsync(from.MeasurementUnitId));
    quoteArticle.SetUnitPrice(from.UnitPrice);
    quoteArticle.SetIsExcluded(from.IsExcluded);

    return quoteArticle;
  }

  private async Task<PriceListArticle> LoadSourceArticleAsync(int articleId)
    => await _priceListArticleRepository
      .SingleOrDefaultAsync(new GetByIdSpec<PriceListArticle>(articleId))
      ?? throw new MappingException(ErrorCode.SourceArticleNotFound.ToValidationError());

  private async Task<PriceListMeasurementUnit> LoadMeasurementUnitAsync(int measurementUnitId)
    => await _measurementUnitRepository
      .SingleOrDefaultAsync(new GetByIdSpec<PriceListMeasurementUnit>(measurementUnitId))
      ?? throw new MappingException(ErrorCode.MeasurementUnitNotFound.ToValidationError());
}
