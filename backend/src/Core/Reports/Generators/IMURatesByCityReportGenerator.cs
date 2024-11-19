using ClosedXML.Excel;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Localization;
using MigraDoc.DocumentObjectModel;
using MG = MigraDoc.DocumentObjectModel.Tables;
using MigraDoc.Rendering;
using PdfSharp.Pdf;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Common.CityAggregate;
using RealGimm.Core.Common.CityAggregate.Specifications;
using RealGimm.Core.CrossModule;
using RealGimm.Core.Taxes;
using RealGimm.Core.Taxes.ItaIMU;
using RealGimm.Core.Taxes.SubTables;
using RealGimm.Core.Taxes.Tables;
using RealGimm.SharedKernel;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Core.Reports.Generators.Shared;


namespace RealGimm.Core.Reports.Generators;

public class IMURatesByCityReportGenerator : ReportGenerator
{
  private readonly IReadRepository<City> _cities;
  private readonly IReadRepository<EstateUnit> _euRepository;
  private readonly TaxCalculatorService _taxCalculatorService;
  private readonly IReadRepository<Subject> _subjectRepository;
  private readonly IStringLocalizer _globalLocalizer;
  private readonly IStringLocalizer<IMURatesByCityReportGenerator> _localizer;

  private readonly IQueryable<EstateUnit> _estateUnits;

  public override Guid Id => StaticId;
  public override string Name => _localizer["ReportTitle"].Value;
  public override ReportFormat[] SupportedFormats { get; } = [ReportFormat.Excel, ReportFormat.Pdf];
  public override ReportGeneratorFilterField[][] FilterFields { get; }

  public static Guid StaticId => Guid.Parse("930246d8-eeb1-4b64-9387-375cb13ec535");

  internal const string FilterManagementSubjectId = "ManagementSubjectId";
  internal const string FilterYear = "Year";
  internal const string FilterCityName = "CityName";

  public IMURatesByCityReportGenerator(
    IConfiguration configuration,
    IReadRepository<City> cities,
    IReadRepository<EstateUnit> euRepository,
    TaxCalculatorService taxCalculatorService,
    IReadRepository<Subject> subjectRepository,
    IStringLocalizer<IMURatesByCityReportGenerator> localizer,
    IStringLocalizer globalLocalizer)
    : base(configuration)
  {
    _cities = cities;
    _localizer = localizer;
    _euRepository = euRepository;
    _subjectRepository = subjectRepository;
    _taxCalculatorService = taxCalculatorService;
    _globalLocalizer = globalLocalizer;

    _estateUnits = _euRepository.AsQueryable().Include(e => e.Address);

    var filterLists = new
    {
      ManagementSubjects = _subjectRepository
        .AsQueryable(new GetByIdsSpec<Subject>(_estateUnits.Select(e => e.ManagementSubjectId).ToArray()))
        .ToDictionary(e => e.Id.ToString(), e => e.Name),

      Cities = _estateUnits
        .Where(e => !string.IsNullOrEmpty(e.Address.CityName))
        .Select(e => e.Address.CityName)
        .Distinct()
        .OrderBy(e => e)
        .ToDictionary(e => e!, e => e!),
    };

    FilterFields =
    [
      [
        new ReportGeneratorFilterField(FilterManagementSubjectId, _globalLocalizer[$"ReportFilter.{FilterManagementSubjectId}"], IsMandatory: true, CustomFieldType.SingleItemFromList, ValidValues: filterLists.ManagementSubjects),
        new ReportGeneratorFilterField(FilterYear, _globalLocalizer[$"ReportFilter.{FilterYear}"], IsMandatory: false, CustomFieldType.SimpleNumber),
        new ReportGeneratorFilterField(FilterCityName, _globalLocalizer[$"ReportFilter.{FilterCityName}"], IsMandatory: false, CustomFieldType.SingleItemFromList, ValidValues: filterLists.Cities),
      ]
    ];
  }

  protected override string GetReportFileNameWithoutExtension() => _localizer["ReportFileName"].Value;

  protected override async Task<PdfDocument> GeneratePdfReportAsync(Dictionary<string, ReportGeneratorFilter> filters)
  {
    var data = await GetInnerData(filters);

    var document = new Document();
    var lastSection = document.LastSection;

    ReportGeneratorUtils.StyleSection(lastSection, PageFormat.A4, Orientation.Portrait, 1.5);

    if (data is not null && data.Any())
    {
      ReportGeneratorUtils.StyleParagraph
      (
        lastSection.AddParagraph(_localizer["ReportTitle"].Value),
        fontSize: 25,
        bold: true,
        spaceAfter: 0.25,
        spaceBefore: 0.5,
        centered: true
      );
      
      ReportGeneratorUtils.StyleParagraph
      (
        lastSection.AddParagraph($"{_localizer["SubjectName"].Value}: {data!.First().ManagementSubjectName}"),
        fontSize: 11,
        bold: true,
        spaceAfter: 0.25,
        spaceBefore: 0.25
      );

      var table = new MG.Table();

      AddColumns(table);

      var tableRow = table.AddRow();
      tableRow.Borders.Visible = false;

      AddHeaders(tableRow);
      ReportGeneratorUtils.StyleDefaultHeader(tableRow);

      lastSection.Add(table);

      if (data is not null)
      {
        foreach (var row in data)
        {
          tableRow = table.AddRow();
          tableRow.Borders.Visible = false;

          if (row == data.First())
          {
            tableRow.TopPadding = ReportGeneratorUtils.GetUnit(0.2);
          }

          tableRow.Cells[0].AddParagraph(row.Year.ToString());
          tableRow.Cells[1].AddParagraph(row.CityName);

          tableRow.Cells[2].Format.Alignment = ParagraphAlignment.Right;
          tableRow.Cells[2].AddParagraph(ReportGeneratorUtils.FormatCurrency(row.TaxRate));

          tableRow.Cells[3].AddParagraph(row.TaxRateDescription);

          tableRow.BottomPadding = ReportGeneratorUtils.GetUnit(0.4);
        }
      }

      table.SetEdge(0, 0, table.Columns.Count, table.Rows.Count, MG.Edge.Box, BorderStyle.Single, 1, Colors.Black);
    }
    else
    {
      ReportGeneratorUtils.StyleParagraph
      (
        lastSection.AddParagraph(_localizer["NoData"].Value),
        fontSize: 25,
        bold: true,
        spaceAfter: 0.25,
        spaceBefore: 0.5,
        centered: true
      );
    }

    PdfDocumentRenderer pdfRenderer = new PdfDocumentRenderer
    {
      Document = document
    };

    pdfRenderer.RenderDocument();
    return pdfRenderer.PdfDocument;
  }

  protected override async Task<XLWorkbook> GenerateExcelReportAsync(Dictionary<string, ReportGeneratorFilter> filters)
  {
    var workbook = new XLWorkbook();
    var worksheet = workbook.AddWorksheet(_localizer["ReportTitle"].Value);

    var data = await GetInnerData(filters);

    var rowIndex = 1;
    worksheet.Cell(rowIndex, 1).Value = _localizer[nameof(IMURateByCityRow.Year)].Value;
    worksheet.Cell(rowIndex, 2).Value = _localizer[nameof(IMURateByCityRow.CityName)].Value;
    worksheet.Cell(rowIndex, 3).Value = _localizer[nameof(IMURateByCityRow.TaxRate)].Value;
    worksheet.Cell(rowIndex, 4).Value = _localizer[nameof(IMURateByCityRow.TaxRateDescription)].Value;
    rowIndex++;

    if (data is not null)
    {
      foreach (var row in data)
      {
        worksheet.Cell(rowIndex, 1).Value = row.Year;
        worksheet.Cell(rowIndex, 2).Value = row.CityName;

        worksheet.Cell(rowIndex, 3).Value = row.TaxRate;
        worksheet.Cell(rowIndex, 3).Style.NumberFormat.Format = Constants.EXPORT_NUMBERFORMAT_CURRENCY;

        worksheet.Cell(rowIndex, 4).Value = row.TaxRateDescription;
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

  public async Task<List<IMURateByCityRow>?> GetInnerData(Dictionary<string, ReportGeneratorFilter> filters)
  {
    if (int.TryParse(filters[FilterManagementSubjectId].StringValue, out int managementSubjectId))
    {
      var managementSubject = _subjectRepository
        .AsQueryable()
        .FirstOrDefault(e => e.Id == managementSubjectId)
        ?? throw new ApplicationException("Subject not found");

      var euCities = _estateUnits
        .Where(e => e.ManagementSubjectId == managementSubjectId)
        .Select(e => e.Address.CityName).ToList();

      var taxCalculator = _taxCalculatorService.GetTaxCalculator(ItaIMU.CalculatorGuid)
        ?? throw new InvalidOperationException("Unable to retrieve calculator");

      var config = await taxCalculator.GetConfigurationAsync();

      var tableDefinition = config.AvailableMainTables.FirstOrDefault(table => table.Code == ItaIMUConfiguration.TBL_RATES_BY_CITY)
        ?? throw new InvalidOperationException("Not existing data");

      var subTableCode = config.AvailableSubTables.ContainsKey(tableDefinition.Code)
        ? config.AvailableSubTables[tableDefinition.Code].SingleOrDefault()?.Code
        : null;

      var values = (await config.GetTableValues(ItaIMUConfiguration.TBL_RATES_BY_CITY, default))
                                .Select(value => (
                                  Value: value,
                                  FilteredSubValues: value.SubValues.Where(subValue => subValue.SubTable == subTableCode),
                                  value.Year
                                ));

      if (filters.TryGetValue(FilterYear, out var filterYear) && filterYear.NumberValue is not null)
      {
        values = values.Where(e => e.Year == filterYear.NumberValue);
      }

      var citiesKeys = values.Select(value => value.Value.GroupingReference!.Value).Distinct().ToList();

      var cities = await _cities.AsQueryable(new CitiesByAnyGuidsSpec(citiesKeys)).ToListAsync(default);

      var getCity = (Guid? groupingReference) =>
      {
        if (groupingReference is null)
        {
          return null;
        }

        return cities.FirstOrDefault(
          city => city.Guid == groupingReference ||
          city.CountyGuid == groupingReference ||
          city.RegionGuid == groupingReference);
      };

      var results = values
        .Select(value => new TaxConfigGroupedRow<TaxConfigGroupedRateSubTableRow>(
          value.Value.Id,
          value.Value.Year,
          tableDefinition.Grouping,
          value.Value.GroupingReference,
          getCity(value.Value.GroupingReference),
          value.Value.GroupingName,
          value.Value.SubValues.Select(subValue => new TaxConfigColumn(subValue)).ToArray(),
          value.FilteredSubValues
            .Where(subValue => subValue.SubTable == subTableCode)
            .Select(subValue => new TaxConfigGroupedRateSubTableRow(
              value.Value,
              getCity(value.Value.GroupingReference),
              subValue))
            .OrderBy(row => row.Code)
            .ThenBy(row => row.Description)
            .ToArray()))
        .Cast<ITaxConfigMainTableRow>()
        .Cast<TaxConfigGroupedRow<TaxConfigGroupedRateSubTableRow>>()
        .SelectMany(row => row.SubRows)
        .Where(e => e.City != null && euCities.Contains(e.City.Name))
        .Select(e => new IMURateByCityRow(managementSubject.Name, e.TaxConfig.Year, e.City!.Name, e.Rate ?? 0, e.Description))
        .ToList();

      return results;
    }

    throw CreateFilterFormatException(FilterManagementSubjectId);
  }

  private void AddColumns(MG.Table table)
  {
    table.AddColumn(ReportGeneratorUtils.GetUnit(3));
    table.AddColumn(ReportGeneratorUtils.GetUnit(5));
    table.AddColumn(ReportGeneratorUtils.GetUnit(3));
    table.AddColumn(ReportGeneratorUtils.GetUnit(7));
  }

  private void AddHeaders(MG.Row row)
  {
    row.Cells[0].AddParagraph(_localizer[nameof(IMURateByCityRow.Year)].Value);
    row.Cells[1].AddParagraph(_localizer[nameof(IMURateByCityRow.CityName)].Value);
    row.Cells[2].AddParagraph(_localizer[nameof(IMURateByCityRow.TaxRate)].Value);
    row.Cells[3].AddParagraph(_localizer[nameof(IMURateByCityRow.TaxRateDescription)].Value);
  }
}
