using System.Globalization;
using ClosedXML.Excel;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Localization;
using RealGimm.Core.Asst.CatalogueTypeAggregate;
using RealGimm.Core.Fclt.PriceListAggregate;
using RealGimm.Core.Fclt.PriceListArticleAggregate;
using RealGimm.Core.Fclt.PriceListMeasurementUnitAggregate;
using RealGimm.Core.Shared.Specifications;
using RealGimm.SharedKernel;
using RealGimm.SharedKernel.Exceptions;

namespace RealGimm.Core.Fclt.Services;

public sealed class PriceListArticleImportService
{
  private const string TemplateLocalizerKey = "Template";

  public readonly IStringLocalizer<PriceListArticleImportService> _localizer;
  public readonly IStringLocalizer<ErrorCode> _errorCodeLocalizer;
  public readonly IConfiguration _configuration;
  public readonly IRepository<PriceList> _priceListRepository;
  public readonly IRepository<PriceListMeasurementUnit> _priceListMeasurementUnitRepository;
  public readonly IRepository<PriceListArticle> _priceListArtileRepository;
  public readonly IRepository<CatalogueType> _catalogueTypeRepository;

  public PriceListArticleImportService(
    IStringLocalizer<PriceListArticleImportService> localizer,
    IStringLocalizer<ErrorCode> errorCodeLocalizer,
    IConfiguration configuration,
    IRepository<PriceList> priceListRepository,
    IRepository<PriceListMeasurementUnit> priceListMeasurementUnitRepository,
    IRepository<PriceListArticle> priceListArtileRepository,
    IRepository<CatalogueType> catalogueTypeRepository)
  {
    _localizer = localizer;
    _errorCodeLocalizer = errorCodeLocalizer;
    _configuration = configuration;
    _priceListRepository = priceListRepository;
    _priceListMeasurementUnitRepository = priceListMeasurementUnitRepository;
    _priceListArtileRepository = priceListArtileRepository;
    _catalogueTypeRepository = catalogueTypeRepository;
  }

  public FileCacheEntry GenerateTemplate()
  {
    using var workbook = GenerateTemplateWorkbook();

    var sharedCacheFilename = Guid.NewGuid().ToString();
    var fileName = _localizer[$"{TemplateLocalizerKey}.DownloadFileName"];
    var fileEntry = new FileCacheEntry(fileName, MimeTypes.OO_SPREADSHEET, sharedCacheFilename);

    using var stream = File.OpenWrite(Path.Combine(_configuration.CachePath(), sharedCacheFilename));
    workbook.SaveAs(stream);

    return fileEntry;
  }

  public async Task<int> ImportAsync(XLWorkbook workbook, CancellationToken cancellationToken = default)
  {
    ArgumentNullException.ThrowIfNull(workbook);

    if (workbook.Worksheets.Count != 1)
    {
      throw new ValidationException(ErrorCode.WorkbookShouldContainOnlyOneWorksheet.ToValidationError());
    }

    var worksheet = workbook.Worksheet(1);
    var rows = worksheet.RowsUsed().Skip(1).ToArray();

    if (rows.Length == 0)
    {
      throw new ValidationException(ErrorCode.WorkbookShouldContainOnlyOneWorksheet.ToValidationError());
    }

    var articlesData = rows
      .Select(row =>
      {
        try
        {
          return ParseArticleData(row);
        }
        catch
        {
          throw new ValidationException(ErrorCode.InvalidRowFormat.ToValidationError(_errorCodeLocalizer, row.RowNumber()));
        }
      })
      .ToArray();

    var newArticleInternalCodes = articlesData
      .Select(articleData => articleData.InternalCode)
      .ToArray();

    if (newArticleInternalCodes.Length != newArticleInternalCodes.Distinct().Count())
    {
      var duplicateInternalCodes = newArticleInternalCodes
        .GroupBy(internalCode => internalCode)
        .Where(group => group.Count() > 1)
        .Select(group => group.Key)
        .ToArray();

      throw new ValidationException(
        ErrorCode.DuplicateInternalCodes.ToValidationError(
          _errorCodeLocalizer,
          string.Join(", ", duplicateInternalCodes)));
    }

    var occupiedInternalCodeArticles = await _priceListArtileRepository
      .AsQueryable(new GetByInternalCodesSpec<PriceListArticle>(newArticleInternalCodes))
      .Select(article => article.InternalCode)
      .ToListAsync(cancellationToken);

    if (occupiedInternalCodeArticles.Count != 0)
    {
      throw new ValidationException(
        ErrorCode.InternalCodesAlredyInUse.ToValidationError(
          _errorCodeLocalizer,
          string.Join(", ", occupiedInternalCodeArticles)));
    }

    var priceLists = await _priceListRepository
      .AsQueryable(
        new GetByInternalCodesSpec<PriceList>(
          articlesData
            .Select(articleData => articleData.PriceListInternalCode)
            .Distinct()))
      .ToDictionaryAsync(priceList => priceList.InternalCode, cancellationToken);

    var measurementUnits = await _priceListMeasurementUnitRepository
      .AsQueryable(
        new GetByInternalCodesSpec<PriceListMeasurementUnit>(
          articlesData
            .Select(articleData => articleData.MeasurementUnitInternalCode)
            .Distinct()))
      .ToDictionaryAsync(measurementUnit => measurementUnit.InternalCode, cancellationToken);

    var catalogueTypes = await _catalogueTypeRepository
      .AsQueryable(
        new GetByInternalCodesSpec<CatalogueType>(
          articlesData
            .SelectMany(articleData => articleData.CatalogueTypeInternalCodes)
            .Distinct()))
      .ToDictionaryAsync(catalogueType => catalogueType.InternalCode, cancellationToken);

    var newArticles = articlesData
      .Select(data => CreateArticle(data, priceLists, measurementUnits, catalogueTypes))
      .ToList();

    await _priceListArtileRepository.AddRangeAsync(newArticles, cancellationToken);

    return newArticles.Count;
  }

  private XLWorkbook GenerateTemplateWorkbook()
  {
    var workbook = new XLWorkbook();

    var worksheet = workbook.AddWorksheet(_localizer[$"{TemplateLocalizerKey}.WorksheetName"]);
    worksheet.Cell(1, 1).Value = _localizer[$"{TemplateLocalizerKey}.ListCode"].Value;
    worksheet.Cell(1, 2).Value = _localizer[$"{TemplateLocalizerKey}.ArticleCode"].Value;
    worksheet.Cell(1, 3).Value = _localizer[$"{TemplateLocalizerKey}.Name"].Value;
    worksheet.Cell(1, 4).Value = _localizer[$"{TemplateLocalizerKey}.ValidationStartDate"].Value;
    worksheet.Cell(1, 5).Value = _localizer[$"{TemplateLocalizerKey}.UnitCode"].Value;
    worksheet.Cell(1, 6).Value = _localizer[$"{TemplateLocalizerKey}.Price"].Value;
    worksheet.Cell(1, 7).Value = _localizer[$"{TemplateLocalizerKey}.CatalogueTypesCodes"].Value;

    for (int i = 1; i <= 5; i++)
    {
      var row = worksheet.Row(i + 1);
      row.Cell(1).Value = (i <= 4 ? "LS0001" : "LS0002");
      row.Cell(2).Value = $"AR00{i}";
      row.Cell(3).Value = _localizer[$"{TemplateLocalizerKey}.Article", i].Value;
      row.Cell(4).Value = new DateOnly(2024, 01, 01).ToString(CultureInfo.InvariantCulture);
      row.Cell(5).Value = (i <= 2 ? "UL01" : "UL02");      
      row.Cell(6).Value = 100m.ToString("0.00", CultureInfo.InvariantCulture);
      row.Cell(7).Value = string.Join(",", ["TO00001", "TO00002"]);
    }

    worksheet.Columns().AdjustToContents();

    var headerRow = worksheet.Row(1).CellsUsed();
    headerRow.Style.Fill.BackgroundColor = XLColor.FromColor(Constants.LIGHTGRAY);
    headerRow.Style.Border.OutsideBorder = XLBorderStyleValues.Thin;
    headerRow.Style.Font.Bold = true;

    return workbook;
  }

  private static ArticleData ParseArticleData(IXLRow row)
    => new()
    {
      RowNumber = row.RowNumber(),
      PriceListInternalCode = row.Cell(1).Value.ToString(),
      InternalCode = row.Cell(2).Value.ToString(),
      Name = row.Cell(3).Value.ToString(),
      PricePeriodSince = DateOnly.Parse(row.Cell(4).Value.ToString(), CultureInfo.InvariantCulture),
      MeasurementUnitInternalCode = row.Cell(5).Value.ToString(),
      Price = decimal.Parse(row.Cell(6).Value.ToString(), CultureInfo.InvariantCulture),
      CatalogueTypeInternalCodes = row.Cell(7).Value.ToString().Split(',')
    };

  private PriceListArticle CreateArticle(
    ArticleData articleData,
    Dictionary<string, PriceList> allPriceLists,
    Dictionary<string, PriceListMeasurementUnit> allMeasurementUnits,
    Dictionary<string, CatalogueType> allCatalogueTypes)
  {
    if (!allPriceLists.TryGetValue(articleData.PriceListInternalCode, out var priceList))
    {
      throw new ValidationException(
        ErrorCode.ImportErrorsInRow.ToValidationError(
          _errorCodeLocalizer,
          articleData.RowNumber,
          string.Join(", ", ErrorCode.PriceListNotFound.ToValidationError(_errorCodeLocalizer).ErrorMessage)));
    }

    if (!allMeasurementUnits.TryGetValue(articleData.MeasurementUnitInternalCode, out var measurementUnit))
    {
      throw new ValidationException(
        ErrorCode.ImportErrorsInRow.ToValidationError(
          _errorCodeLocalizer,
          articleData.RowNumber,
          string.Join(", ", ErrorCode.MeasurementUnitNotFound.ToValidationError(_errorCodeLocalizer).ErrorMessage)));
    }

    var catalogueTypeIds = articleData.CatalogueTypeInternalCodes
      .Select(internalCode =>
      {
        if (!allCatalogueTypes.TryGetValue(internalCode, out var catalogueType))
        {
          throw new ValidationException(
            ErrorCode.ImportErrorsInRow.ToValidationError(
              _errorCodeLocalizer,
              articleData.RowNumber,
              string.Join(", ", ErrorCode.CatalogueTypeNotFound.ToValidationError(_errorCodeLocalizer).ErrorMessage)));
        }

        return catalogueType.Id;
      })
      .ToArray();

    var priceListArticle = new PriceListArticle();
    priceListArticle.SetInternalCode(articleData.InternalCode);
    priceListArticle.SetName(articleData.Name);
    priceListArticle.SetPriceList(priceList);
    priceListArticle.SetMeasurementUnit(measurementUnit);
    priceListArticle.SetCatalogueTypeIds(catalogueTypeIds);

    var pricePeriod = new ArticlePricePeriod();
    pricePeriod.SetSince(articleData.PricePeriodSince);
    pricePeriod.SetPrice(articleData.Price);

    priceListArticle.PricePeriods.Add(pricePeriod);

    if (priceListArticle.Validate().Any())
    {
      throw new ValidationException(
        ErrorCode.ImportErrorsInRow.ToValidationError(
          _errorCodeLocalizer,
          articleData.RowNumber,
          string.Join(", ", ErrorCode.InvalidaData.ToValidationError(_errorCodeLocalizer).ErrorMessage)));
    }

    return priceListArticle;
  }

  private record ArticleData
  {
    public required int RowNumber { get; init; }
    public required string PriceListInternalCode { get; init; }
    public required string InternalCode { get; init; }
    public required string Name { get; init; }
    public required DateOnly PricePeriodSince { get; init; }
    public required string MeasurementUnitInternalCode { get; init; }
    public required decimal Price { get; init; }
    public required string[] CatalogueTypeInternalCodes { get; init; }
  }
}
