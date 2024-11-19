using RealGimm.Core;
using RealGimm.Core.Fclt.PriceListArticleAggregate;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Web.Fclt.Models;
using RealGimm.WebCommons.Mapping;
using RealGimm.WebCommons.Extensions;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Fclt.PriceListMeasurementUnitAggregate;
using RealGimm.Core.Fclt.PriceListAggregate;
using RealGimm.Core.Asst.CatalogueTypeAggregate;

namespace RealGimm.Web.Fclt.Mapping;

public class UpdatePriceListArticleMapper : IMapper<UpdatePriceListArticleInput, PriceListArticle>
{
  private readonly IMapper _mapper;
  private readonly IReadRepository<PriceListMeasurementUnit> _priceListMeasurementUnitRepository;
  private readonly IReadRepository<PriceList> _priceListRepository;
  private readonly IReadRepository<CatalogueType> _catalogueTypeRepository;

  public UpdatePriceListArticleMapper(
    IMapper mapper,
    IReadRepository<PriceListMeasurementUnit> priceListMeasurementUnitRepository,
    IReadRepository<PriceList> priceListRepository,
    IReadRepository<CatalogueType> catalogueTypeRepository)
  {
    _mapper = mapper;
    _priceListMeasurementUnitRepository = priceListMeasurementUnitRepository;
    _priceListRepository = priceListRepository;
    _catalogueTypeRepository = catalogueTypeRepository;
  }

  public async Task<PriceListArticle?> MapAsync(
    UpdatePriceListArticleInput? from,
    PriceListArticle? into = null,
    CancellationToken cancellationToken = default)
  {
    if (from is null)
    {
      return null;
    }

    if (into is null)
    {
      throw new NotSupportedException();
    }

    var priceListArticle = into;
    priceListArticle.SetInternalCode(from.InternalCode);
    priceListArticle.SetName(from.Name);

    await EnsureCatalogueTypesExistAsync(from.CatalogueTypeIds);
    priceListArticle.SetCatalogueTypeIds(from.CatalogueTypeIds);

    var measurementUnit = await LoadMeasurementUnitAsync(from.MeasurementUnitId, cancellationToken);
    priceListArticle.SetMeasurementUnit(measurementUnit);

    var priceList = await LoadPriceListAsync(from.PriceListId, cancellationToken);
    priceListArticle.SetPriceList(priceList);

    await _mapper.UpdateCollectionAsync(from.PricePeriods, priceListArticle.PricePeriods, cancellationToken);

    return priceListArticle;
  }

  private async Task<PriceListMeasurementUnit> LoadMeasurementUnitAsync(
    int measurementUnitId,
    CancellationToken cancellationToken)
    => await _priceListMeasurementUnitRepository
        .SingleOrDefaultAsync(new GetByIdSpec<PriceListMeasurementUnit>(measurementUnitId), cancellationToken)
        ?? throw new MappingException(ErrorCode.PriceListMeasurementUnitNotFound.ToValidationError());

  private async Task<PriceList> LoadPriceListAsync(int priceListId, CancellationToken cancellationToken)
    => await _priceListRepository
        .SingleOrDefaultAsync(new GetByIdSpec<PriceList>(priceListId), cancellationToken)
        ?? throw new MappingException(ErrorCode.PriceListNotFound.ToValidationError());

  private async Task EnsureCatalogueTypesExistAsync(int[] catalogueTypes)
  {
    var catalogueTypesCount = await _catalogueTypeRepository
      .AsQueryable(new GetByIdsSpec<CatalogueType>(catalogueTypes))
      .CountAsync();

    if (catalogueTypesCount != catalogueTypes.Length)
    {
      throw new MappingException(ErrorCode.CatalogueTypeNotFound.ToValidationError());
    }
  }
}
