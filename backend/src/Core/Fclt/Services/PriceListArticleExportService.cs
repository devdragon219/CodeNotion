using ClosedXML.Excel;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Asst.CatalogueTypeAggregate;
using RealGimm.Core.Fclt.PriceListArticleAggregate;
using RealGimm.Core.Shared.Services;
using RealGimm.Core.Shared.Specifications;

namespace RealGimm.Core.Fclt.Services;

public sealed partial class PriceListArticleExportService : ExportService<PriceListArticle, PriceListArticleExportService.Data, PriceListArticleExportService>
{
  private readonly IReadRepository<CatalogueType> _catalogueTypeRepository;

  public PriceListArticleExportService(IReadRepository<CatalogueType> catalogueTypeRepository)
  {
    _catalogueTypeRepository = catalogueTypeRepository;
  }

  protected override Dictionary<string, Func<Data, XLCellValue>> CreateExcelDataSelector()
    => new Dictionary<string, Func<Data, XLCellValue>>()
    {
      [nameof(Data.InternalCode)] = data => data.InternalCode,
      [nameof(Data.Name)] = data => data.Name,
      [nameof(Data.CatalogueTypes)] = data => data.CatalogueTypes,
      [nameof(Data.PriceList)] = data => data.PriceList,
      [nameof(Data.Since)] = data => data.Since,
      [nameof(Data.Until)] = data => data.Until,
      [nameof(Data.MeasurementUnit)] = data => data.MeasurementUnit,
      [nameof(Data.Price)] = data => data.Price
    };

  protected override async Task<IList<Data>> SelectItemsAsync(
    IEnumerable<PriceListArticle> articles,
    CancellationToken cancellationToken = default)
  {
    var catalogueTypes = await _catalogueTypeRepository
      .AsQueryable(new GetByIdsSpec<CatalogueType>(articles.SelectMany(article => article.CatalogueTypeIds).Distinct()))
      .Select(catalogueType => new
      {
        catalogueType.Id,
        catalogueType.Name,
        SubCategoryName = catalogueType.SubCategory!.Name,
        CategoryName = catalogueType.SubCategory.Category.Name
      })
      .ToDictionaryAsync(catalogueType => catalogueType.Id, cancellationToken);

    return articles
      .Select(article =>
      {
        var catalogueTypeLines = article.CatalogueTypeIds
          .Select(id => catalogueTypes[id])
          .Select(catalogueType => $"{catalogueType.CategoryName} - {catalogueType.SubCategoryName} - {catalogueType.Name}");

        return new Data
        {
          InternalCode = article.InternalCode,
          Name = article.Name,
          CatalogueTypes = string.Join(Environment.NewLine, catalogueTypeLines),
          PriceList = article.PriceList.Name,
          Since = article.ActualPriceSince?.ToShortDateString() ?? "-",
          Until = article.ActualPriceUntil?.ToShortDateString() ?? "-",
          MeasurementUnit = article.MeasurementUnit.Name,
          Price = article.ActualPrice
        };
      })
      .ToArray();
  }
}
