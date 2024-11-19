using Ardalis.Specification;
using ClosedXML.Excel;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Localization;
using MigraDoc.DocumentObjectModel;
using MigraDoc.DocumentObjectModel.Tables;
using MigraDoc.Rendering;
using PdfSharp.Pdf;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Asst.AssetTaxCalculationAggregate;
using RealGimm.Core.Asst.CadastralUnitAggregate.Specifications;
using RealGimm.Core.Common.CityAggregate;
using RealGimm.Core.CrossModule;
using RealGimm.Core.Reports.Generators.Shared;
using RealGimm.Core.Shared.Specifications;
using RealGimm.SharedKernel;


namespace RealGimm.Core.Reports.Generators;

public class IMURateRecapByCityReportGenerator : ReportGenerator
{
  private readonly IReadRepository<AssetTaxCalculation> _calcRepository;
  private readonly IReadRepository<Subject> _subjectRepository;
  private readonly IRepository<City> _cities;
  private readonly IStringLocalizer _globalLocalizer;
  private readonly IStringLocalizer<IMURateRecapByCityReportGenerator> _localizer;

  private readonly IQueryable<AssetTaxCalculation> _taxCalculators;

  public override Guid Id => StaticId;
  public override string Name => _localizer["ReportTitle"].Value;
  public override ReportFormat[] SupportedFormats { get; } = [ReportFormat.Excel, ReportFormat.Pdf];
  public override ReportGeneratorFilterField[][] FilterFields { get; }

  public static Guid StaticId => Guid.Parse("e0b33664-16ad-400d-b876-68c06ceb87dd");

  internal const string FilterManagementSubjectId = "ManagementSubjectId";
  internal const string FilterEstateId = "EstateId";
  internal const string FilterFromYear = "FromYear";
  internal const string FilterToYear = "ToYear";
  internal const string FilterCityName = "CityName";
  internal const string FilterCadastralCategoryId = "CadastralCategoryId";

  public IMURateRecapByCityReportGenerator(
    IConfiguration configuration,
    IReadRepository<AssetTaxCalculation> calcRepository,
    IReadRepository<Subject> subjectRepository,
    IRepository<City> cities,
    IStringLocalizer<IMURateRecapByCityReportGenerator> localizer,
    IStringLocalizer globalLocalizer)
    : base(configuration)
  {
    _calcRepository = calcRepository;
    _subjectRepository = subjectRepository;
    _cities = cities;
    _localizer = localizer;
    _globalLocalizer = globalLocalizer;

    _taxCalculators = _calcRepository
      .AsQueryable(new AssetTaxCalculationIncludeAllSpec())
      .Where(e => e.TaxCalculator.Equals("IMU") && e.CadastralUnit.EstateUnit != null);

    var filtersList = new
    {
      Estates = _taxCalculators
        .Select(e => e.CadastralUnit.EstateUnit!.Estate).Select(e => new { e.Id, e.Name })
        .Distinct()
        .OrderBy(e => e.Name)
        .ToDictionary(e => e.Id.ToString(), e => e.Name!),

      Cities = _taxCalculators
        .Where(e => !string.IsNullOrEmpty(e.CadastralUnit.EstateUnit!.Address.CityName))
        .Select(e => e.CadastralUnit.EstateUnit!.Address.CityName)
        .Distinct()
        .OrderBy(e => e)
        .ToDictionary(e => e!, e => e!),

      CadastralCategories = _taxCalculators
        .Where(e => e.CadastralUnit.Income.CadastralCategory != null)
        .Select(e => e.CadastralUnit.Income.CadastralCategory)
        .ToDictionary(e => e!.Id.ToString(), e => e!.Description),

      ManagementSubjects = _subjectRepository
        .AsQueryable(
          new GetByIdsSpec<Subject>(_taxCalculators.Select(e => e.CadastralUnit.EstateUnit!.ManagementSubjectId).ToArray()))
        .ToDictionary(e => e.Id.ToString(), e => e.Name)
    };

    FilterFields =
    [
      [
        new ReportGeneratorFilterField(FilterManagementSubjectId, _globalLocalizer[$"ReportFilter.{FilterManagementSubjectId}"], IsMandatory: true, CustomFieldType.SingleItemFromList, ValidValues: filtersList.ManagementSubjects),
        new ReportGeneratorFilterField(FilterEstateId, _globalLocalizer[$"ReportFilter.{FilterEstateId}"], IsMandatory: false, CustomFieldType.SingleItemFromList, ValidValues: filtersList.Estates),
        new ReportGeneratorFilterField(FilterFromYear, _globalLocalizer[$"ReportFilter.{FilterFromYear}"], IsMandatory: false, CustomFieldType.SimpleNumber),
        new ReportGeneratorFilterField(FilterToYear, _globalLocalizer[$"ReportFilter.{FilterToYear}"], IsMandatory: false, CustomFieldType.SimpleNumber),
        new ReportGeneratorFilterField(FilterCityName, _globalLocalizer[$"ReportFilter.{FilterCityName}"], IsMandatory: false, CustomFieldType.SingleItemFromList, ValidValues: filtersList.Cities),
        new ReportGeneratorFilterField(FilterCadastralCategoryId, _globalLocalizer[$"ReportFilter.{FilterCadastralCategoryId}"], IsMandatory: false, CustomFieldType.SingleItemFromList, ValidValues: filtersList.CadastralCategories),
      ]
    ];
  }
  
  protected override string GetReportFileNameWithoutExtension() => _localizer["ReportFileName"].Value;

  protected override async Task<XLWorkbook> GenerateExcelReportAsync(Dictionary<string, ReportGeneratorFilter> filters)
  {
    var workbook = new XLWorkbook();
    var worksheet = workbook.AddWorksheet(_localizer["ReportTitle"].Value);

    var data = await GetInnerDataAsync(filters);

    var rowIndex = 1;
    worksheet.Cell(rowIndex, 1).Value = _localizer["ManagementSubject"].Value;
    worksheet.Cell(rowIndex, 2).Value = _localizer[nameof(RowByCity.CityName)].Value;
    worksheet.Cell(rowIndex, 3).Value = _localizer[nameof(RowByCity.CityCadastralCode)].Value;
    worksheet.Cell(rowIndex, 4).Value = _localizer[nameof(RowByCity.EstateUnitsCount)].Value;
    worksheet.Cell(rowIndex, 5).Value = _localizer[nameof(RowByCity.Value)].Value;
    rowIndex++;

    foreach (var mainRow in data)
    {
      foreach (var subRow in mainRow.SubRows)
      {
        worksheet.Cell(rowIndex, 1).Value = mainRow.ManagementSubject?.Name;
        worksheet.Cell(rowIndex, 2).Value = subRow.CityName;
        worksheet.Cell(rowIndex, 3).Value = subRow.CityCadastralCode;
        worksheet.Cell(rowIndex, 4).Value = subRow.EstateUnitsCount;
        
        worksheet.Cell(rowIndex, 5).Value = subRow.Value;
        worksheet.Cell(rowIndex, 5).Style.NumberFormat.Format = Constants.EXPORT_NUMBERFORMAT_CURRENCY;
        
        rowIndex++;
      }
    }

    worksheet.Columns().AdjustToContents();
    var header = worksheet.Row(1).CellsUsed();
    header.Style.Fill.BackgroundColor = XLColor.FromColor(Constants.LIGHTGRAY);
    header.Style.Border.OutsideBorder = XLBorderStyleValues.Thin;
    header.Style.Font.Bold = true;

    return workbook;
  }

  protected override async Task<PdfDocument> GeneratePdfReportAsync(Dictionary<string, ReportGeneratorFilter> filters)
  {
    var data = await GetInnerDataAsync(filters);

    var document = new Document();
    var lastSection = document.LastSection;

    ReportGeneratorUtils.StyleSection(lastSection, PageFormat.A4, Orientation.Portrait);

    ReportGeneratorUtils.StyleParagraph
    (
      lastSection.AddParagraph(_localizer["ReportTitle"].Value),
      fontSize: 25,
      bold: true,
      spaceAfter: 0.25,
      spaceBefore: 0.5,
      centered: true
    );

    string subTitle = _localizer["ReportSubTitle"].Value;
    ReportGeneratorFilter? fromYearFilter, toYearFilter;

    filters.TryGetValue(FilterFromYear, out fromYearFilter);
    filters.TryGetValue(FilterToYear, out toYearFilter);

    if (fromYearFilter?.NumberValue is not null && toYearFilter?.NumberValue is not null)
      subTitle = string.Format(_localizer["ReportSubTitleFromToYear"].Value, fromYearFilter.NumberValue, toYearFilter.NumberValue);

    else if (fromYearFilter?.NumberValue is not null && toYearFilter?.NumberValue is null)
      subTitle = string.Format(_localizer["ReportSubTitleFromYear"].Value, fromYearFilter.NumberValue);

    else if (fromYearFilter?.NumberValue is null && toYearFilter?.NumberValue is not null)
      subTitle = string.Format(_localizer["ReportSubTitleToYear"].Value, toYearFilter.NumberValue);

    ReportGeneratorUtils.StyleParagraph
    (
      lastSection.AddParagraph(subTitle),
      fontSize: 15,
      bold: true,
      spaceAfter: 0.25,
      spaceBefore: 0.5,
      centered: true
    );

    ReportGeneratorUtils.StyleSection(lastSection, PageFormat.A4, Orientation.Portrait, leftMargin: 0.7);

    foreach (var item in data)
    {
      ReportGeneratorUtils.StyleParagraph
      (
        lastSection.AddParagraph($"{_localizer["ManagementSubject"].Value}: {item.ManagementSubject?.Name}"),
        fontSize: 11,
        bold: true,
        spaceAfter: 0.25,
        spaceBefore: 1
      );

      var table = new Table();

      AddColumns(table);

      var tableRow = table.AddRow();
      tableRow.Borders.Visible = false;

      AddHeaders(tableRow);
      ReportGeneratorUtils.StyleDefaultHeader(tableRow);

      lastSection.Add(table);

      int totalCitiesCount = 0, totalEstatesCount = 0;
      decimal totalValue = default;

      foreach (var subRow in item.SubRows)
      {
        tableRow = table.AddRow();
        tableRow.Borders.Visible = false;

        tableRow.Cells[0].AddParagraph(subRow.CityName ?? string.Empty);
        tableRow.Cells[1].AddParagraph(subRow.CityCadastralCode ?? string.Empty);

        tableRow.Cells[2].Format.Alignment = ParagraphAlignment.Right;
        tableRow.Cells[2].AddParagraph(subRow.EstateUnitsCount.ToString());

        tableRow.Cells[3].Format.Alignment = ParagraphAlignment.Right;
        tableRow.Cells[3].AddParagraph(ReportGeneratorUtils.FormatCurrency(subRow.Value));

        totalCitiesCount++;
        totalValue += subRow.Value;
        totalEstatesCount += subRow.EstateUnitsCount;
      }

      tableRow = table.AddRow();
      ReportGeneratorUtils.StyleDefaultFooter(tableRow, spaceBefore: 0.75);

      tableRow.Cells[0].AddParagraph($"{_localizer["TotalCities"].Value}: {totalCitiesCount}");

      tableRow.Cells[2].Format.Alignment = ParagraphAlignment.Right;
      tableRow.Cells[2].VerticalAlignment = VerticalAlignment.Center;
      tableRow.Cells[2].AddParagraph($"{_localizer["TotalEstates"].Value}: {totalEstatesCount}");

      tableRow.Cells[3].Format.Alignment = ParagraphAlignment.Right;
      tableRow.Cells[3].AddParagraph(ReportGeneratorUtils.FormatCurrency(totalValue));

      table.SetEdge(0, 0, table.Columns.Count, table.Rows.Count, Edge.Box, BorderStyle.Single, 1, Colors.Black);
    }

    PdfDocumentRenderer pdfRenderer = new PdfDocumentRenderer
    {
      Document = document
    };

    pdfRenderer.RenderDocument();
    return pdfRenderer.PdfDocument;
  }

  private async Task<IEnumerable<MainRowByCity>> GetInnerDataAsync(Dictionary<string, ReportGeneratorFilter> filters)
  {
    if (int.TryParse(filters[FilterManagementSubjectId].StringValue, out int managementSubjectId))
    {
      var taxCalculators = _taxCalculators.Where(
        e => e.CadastralUnit.EstateUnit!.ManagementSubjectId == managementSubjectId);

      if (filters.TryGetValue(FilterFromYear, out var fromYearFilter) &&
        fromYearFilter.NumberValue is not null)
      {
        taxCalculators = taxCalculators.Where(e => e.Year >= fromYearFilter.NumberValue);
      }

      if (filters.TryGetValue(FilterToYear, out var toYearFilter) &&
        toYearFilter.NumberValue is not null)
      {
        taxCalculators = taxCalculators.Where(e => e.Year <= toYearFilter.NumberValue);
      }

      if (filters.TryGetValue(FilterCityName, out var cityNameFilter) &&
        cityNameFilter.StringValue is not null)
      {
        taxCalculators = taxCalculators.Where(e =>
          e.CadastralUnit.EstateUnit != null &&
          e.CadastralUnit.EstateUnit!.Address.CityName!.Equals(cityNameFilter.StringValue));
      }

      if (filters.TryGetValue(FilterEstateId, out var estateFilter) &&
        estateFilter.NumberValue is not null)
      {
        taxCalculators = taxCalculators.Where(e =>
          e.CadastralUnit.EstateUnit != null && 
          e.CadastralUnit.EstateUnit.Estate.Id == estateFilter.NumberValue);
      }

      if (filters.TryGetValue(FilterCadastralCategoryId, out var cadastralCategoryFilter) &&
        cadastralCategoryFilter.NumberValue is not null)
      {
        taxCalculators = taxCalculators.Where(e =>
          e.CadastralUnit.Income.CadastralCategory != null &&
          e.CadastralUnit.Income.CadastralCategory.Id == cadastralCategoryFilter.NumberValue);
      }

      var taxCalculatorList = await taxCalculators.ToListAsync();
      
      var citiesNames = _cities
        .AsQueryable()
        .Where(c => taxCalculatorList.Select(e => e.CadastralUnit.EstateUnit!.Address.CityName).Contains(c.Name));
      
      var managementSubjects = _subjectRepository
        .AsQueryable(new GetByIdsSpec<Subject>(taxCalculatorList.Select(e => e.CadastralUnit.EstateUnit!.ManagementSubjectId)));

      var grouped = taxCalculatorList.GroupBy(e => e.CadastralUnit.EstateUnit!.ManagementSubjectId);

      var results = grouped
        .Select(main => new MainRowByCity(
          managementSubjects
            .Where(mnmg => mnmg.Id == main.First().CadastralUnit.EstateUnit!.ManagementSubjectId)
            .First(),
          main
            .GroupBy(eu => new { eu.CadastralUnit.EstateUnit, eu.CadastralUnit.EstateUnit!.Address.CityName })
            .Select(sub => new RowByCity(
                sub.First().CadastralUnit.EstateUnit!.Address.CityName,
                citiesNames
                  .Where(c => c.Name.Equals(sub.First().CadastralUnit.EstateUnit!.Address.CityName))
                  .FirstOrDefault()?
                  .CadastralCode,
                sub.Count(),
                sub.Select(inst => inst.Installments.Sum(x => x.AmountPaid)).Sum()))));

      return results;
    }
    
    throw CreateFilterFormatException(FilterManagementSubjectId);
  }

  private void AddHeaders(Row row)
  {
    row.Cells[0].AddParagraph(_localizer[nameof(RowByCity.CityName)].Value);
    row.Cells[1].AddParagraph(_localizer[nameof(RowByCity.CityCadastralCode)].Value);

    row.Cells[2].Format.Alignment = ParagraphAlignment.Right;
    row.Cells[2].AddParagraph(_localizer[nameof(RowByCity.EstateUnitsCount)].Value);

    row.Cells[3].Format.Alignment = ParagraphAlignment.Right;
    row.Cells[3].AddParagraph(_localizer[nameof(RowByCity.Value)].Value);
  }

  private void AddColumns(Table table)
  {
    table.AddColumn(ReportGeneratorUtils.GetUnit(5));
    table.AddColumn(ReportGeneratorUtils.GetUnit(5));
    table.AddColumn(ReportGeneratorUtils.GetUnit(5));
    table.AddColumn(ReportGeneratorUtils.GetUnit(5));
  }
}
