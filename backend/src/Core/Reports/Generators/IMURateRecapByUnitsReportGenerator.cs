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
using RealGimm.Core.Asst.AssetTaxCalculationAggregate.Models;
using RealGimm.Core.Asst.CadastralUnitAggregate;
using RealGimm.Core.Asst.CadastralUnitAggregate.Specifications;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Core.Asst.Services;
using RealGimm.Core.CrossModule;
using RealGimm.Core.Extensions;
using RealGimm.Core.Reports.Generators.Shared;
using RealGimm.Core.Resources;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Core.Taxes;
using RealGimm.Core.Taxes.ItaIMU;
using RealGimm.SharedKernel;
using Address = RealGimm.Core.Asst.EstateAggregate.Address;
using Table = MigraDoc.DocumentObjectModel.Tables.Table;

namespace RealGimm.Core.Reports.Generators;

public class IMURateRecapByUnitsReportGenerator : ReportGenerator
{
  private readonly IReadRepository<AssetTaxCalculation> _assetTaxCalculationRepository;
  private readonly IReadRepository<Subject> _subjectRepository;
  private readonly TaxCalculatorService _taxCalculatorService;
  private readonly IStringLocalizer _globalLocalizer;
  private readonly IStringLocalizer<SharedResources> _sharedLocalizer;
  private readonly IStringLocalizer<AssetTaxDetailRowExportService> _excelLocalizer;
  private readonly IStringLocalizer<IMURateRecapByUnitsReportGenerator> _pdfLocalizer;

  private readonly IQueryable<AssetTaxCalculation> _assetTaxCalculationQuery;

  public override Guid Id => StaticId;
  public override string Name => _pdfLocalizer["ReportTitle"].Value;
  public override ReportFormat[] SupportedFormats { get; } = [ReportFormat.Excel, ReportFormat.Pdf];
  public override ReportGeneratorFilterField[][] FilterFields { get; }

  public static Guid StaticId => Guid.Parse("bad2494e-4652-4fac-b3a1-6fb8ef14a589");

  internal const string FilterManagementSubjectId = "ManagementSubjectId";
  internal const string FilterEstateId = "EstateId";
  internal const string FilterFromYear = "FromYear";
  internal const string FilterToYear = "ToYear";
  internal const string FilterCityName = "CityName";
  internal const string FilterIncomeType = "IncomeType";
  internal const string FilterUsageTypeId = "UsageTypeId";
  internal const string FilterCadastralCategoryId = "CadastralCategoryId";

  public IMURateRecapByUnitsReportGenerator(
    IConfiguration configuration,
    IReadRepository<AssetTaxCalculation> assetTaxCalculationRepository,
    IReadRepository<Subject> subjectRepository,
    TaxCalculatorService taxCalculatorService,
    IStringLocalizer<SharedResources> sharedLocalizer,
    IStringLocalizer<AssetTaxDetailRowExportService> excelLocalizer,
    IStringLocalizer<IMURateRecapByUnitsReportGenerator> pdfLocalizer,
    IStringLocalizer globalLocalizer)
    : base(configuration)
  {
    _assetTaxCalculationRepository = assetTaxCalculationRepository;
    _subjectRepository = subjectRepository;
    _taxCalculatorService = taxCalculatorService;
    _sharedLocalizer = sharedLocalizer;
    _excelLocalizer = excelLocalizer;
    _pdfLocalizer = pdfLocalizer;
    _globalLocalizer = globalLocalizer;

    _assetTaxCalculationQuery = _assetTaxCalculationRepository
      .AsQueryable(new AssetTaxCalculationIncludeAllSpec())
      .Where(e => e.TaxCalculatorId == ItaIMU.CalculatorGuid && e.CadastralUnit.EstateUnit != null);

    var filtersList = new
    {
      Estates = _assetTaxCalculationQuery
        .Select(e => e.CadastralUnit.EstateUnit!.Estate).Select(e => new { e.Id, e.Name })
        .Distinct()
        .OrderBy(e => e.Name)
        .ToDictionary(e => e.Id.ToString(), e => e.Name!),

      UsageTypes = _assetTaxCalculationQuery
        .Select(e => e.CadastralUnit.EstateUnit!.UsageType).Select(e => new { e.Id, e.Name })
        .Distinct()
        .OrderBy(e => e.Name)
        .ToDictionary(e => e.Id.ToString(), e => e.Name!),

      Cities = _assetTaxCalculationQuery
        .Where(e => !string.IsNullOrEmpty(e.CadastralUnit.EstateUnit!.Address.CityName))
        .Select(e => e.CadastralUnit.EstateUnit!.Address.CityName).Distinct()
        .OrderBy(e => e)
        .ToDictionary(e => e!, e => e!),

      CadastralCategories = _assetTaxCalculationQuery
        .Where(e => e.CadastralUnit.Income.CadastralCategory != null)
        .Select(e => e.CadastralUnit.Income.CadastralCategory)
        .ToDictionary(e => e!.Id.ToString(), e => e!.Description),

      IncomeTypes = Enum
        .GetValues(typeof(IncomeType)).Cast<IncomeType>()
        .ToDictionary(incomeType => incomeType.ToString(), incomeType => _sharedLocalizer.LocalizeEnumValue(incomeType).Value),

      ManagementSubjects = _subjectRepository
        .AsQueryable(new GetByIdsSpec<Subject>(_assetTaxCalculationQuery.Select(e => e.CadastralUnit.EstateUnit!.ManagementSubjectId).ToArray()))
        .ToDictionary(e => e.Id.ToString(), e => e.Name)
    };

    FilterFields =
    [
      [
        new ReportGeneratorFilterField(FilterManagementSubjectId, _globalLocalizer[$"ReportFilter.{FilterManagementSubjectId}"], IsMandatory: true, CustomFieldType.SingleItemFromList, ValidValues: filtersList.ManagementSubjects),
        new ReportGeneratorFilterField(FilterEstateId, _globalLocalizer[$"ReportFilter.{FilterEstateId}"], IsMandatory: false, CustomFieldType.SingleItemFromList, ValidValues: filtersList.Estates),
        new ReportGeneratorFilterField(FilterFromYear, _globalLocalizer[$"ReportFilter.{FilterFromYear}"], IsMandatory: false, CustomFieldType.SimpleNumber),
        new ReportGeneratorFilterField(FilterToYear, _globalLocalizer[$"ReportFilter.{FilterToYear}"], IsMandatory: false, CustomFieldType.SimpleNumber)
      ],
      [
        new ReportGeneratorFilterField(FilterCityName, _globalLocalizer[$"ReportFilter.{FilterCityName}"], IsMandatory: false, CustomFieldType.SingleItemFromList, ValidValues: filtersList.Cities),
        new ReportGeneratorFilterField(FilterIncomeType, _globalLocalizer[$"ReportFilter.{FilterIncomeType}"], IsMandatory: false, CustomFieldType.SingleItemFromList, ValidValues: filtersList.IncomeTypes),
        new ReportGeneratorFilterField(FilterUsageTypeId, _globalLocalizer[$"ReportFilter.{FilterUsageTypeId}"], IsMandatory: false, CustomFieldType.SingleItemFromList, ValidValues: filtersList.UsageTypes),
        new ReportGeneratorFilterField(FilterCadastralCategoryId, _globalLocalizer[$"ReportFilter.{FilterCadastralCategoryId}"], IsMandatory: false, CustomFieldType.SingleItemFromList, ValidValues: filtersList.CadastralCategories),
      ]
    ];
  }

  protected override string GetReportFileNameWithoutExtension() => _pdfLocalizer["ReportFileName"].Value;

  protected override async Task<XLWorkbook> GenerateExcelReportAsync(Dictionary<string, ReportGeneratorFilter> filters)
  {
    var workbook = new XLWorkbook();
    var worksheet = workbook.AddWorksheet(_pdfLocalizer["ReportTitle"].Value);

    var rows = await GetInnerDataAsync(filters);

    var rowIndex = 1;
    worksheet.Cell(rowIndex, 1).Value = _excelLocalizer[nameof(AssetTaxDetailEstateUnitItem.EstateUnitInternalCode)].Value;
    worksheet.Cell(rowIndex, 2).Value = _excelLocalizer["EstateUnitAddress"].Value;
    worksheet.Cell(rowIndex, 3).Value = _excelLocalizer[nameof(AssetTaxDetailEstateUnitItem.CadastralCoordinates)].Value;
    worksheet.Cell(rowIndex, 4).Value = _excelLocalizer[$"{nameof(AssetTaxDetailEstateUnitItem.CadastralUnitIncome)}.{nameof(CadastralUnitIncome.MacroCategory)}"].Value;
    worksheet.Cell(rowIndex, 5).Value = _excelLocalizer[$"{nameof(AssetTaxDetailEstateUnitItem.CadastralUnitIncome)}.{nameof(CadastralUnitIncome.MicroCategory)}"].Value;
    worksheet.Cell(rowIndex, 6).Value = _excelLocalizer[$"{nameof(AssetTaxDetailEstateUnitItem.CadastralUnitIncome)}.{nameof(CadastralUnitIncome.MetricAmount)}"].Value;
    worksheet.Cell(rowIndex, 7).Value = _excelLocalizer[nameof(AssetTaxDetailEstateUnitItem.ActualizedCadastralIncome)].Value;
    worksheet.Cell(rowIndex, 8).Value = _excelLocalizer[nameof(AssetTaxDetailEstateUnitItem.GrossCadastralIncome)].Value;
    worksheet.Cell(rowIndex, 9).Value = _excelLocalizer[$"{nameof(AssetTaxDetailEstateUnitItem.CadastralUnitIncome)}.{nameof(CadastralUnitIncome.Type)}"].Value;
    worksheet.Cell(rowIndex, 10).Value = _excelLocalizer[nameof(AssetTaxDetailEstateUnitItem.EstateUnitOwnershipPercent)].Value;
    worksheet.Cell(rowIndex, 11).Value = _excelLocalizer[nameof(AssetTaxDetailEstateUnitItem.BaseTaxableAmount)].Value;
    worksheet.Cell(rowIndex, 12).Value = _excelLocalizer[$"{nameof(AssetTaxDetailEstateUnitItem.CadastralUnitTaxConfig)}.{nameof(CadastralUnitTaxConfig.Value)}"].Value;
    worksheet.Cell(rowIndex, 13).Value = _excelLocalizer[nameof(AssetTaxDetailEstateUnitItem.AmountPaid)].Value;
    rowIndex++;

    foreach (var row in rows)
    {
      worksheet.Cell(rowIndex, 1).Value = row.EstateUnitInternalCode;
      worksheet.Cell(rowIndex, 2).Value = $"{row.Address.Toponymy}, {row.Address.CityName} - {row.Address.Numbering} - {row.Address.LocalPostCode} - {_sharedLocalizer.LocalizeCountry(row.Address.CountryISO!).Value}";
      worksheet.Cell(rowIndex, 3).Value = string.Join(Environment.NewLine, row.CadastralCoordinates.Select(c => $"{c.Level1} - {c.Level2} - {c.Level3} - {c.Level4} - {c.Level5}"));
      worksheet.Cell(rowIndex, 4).Value = row.CadastralUnitIncome?.MacroCategory ?? string.Empty;
      worksheet.Cell(rowIndex, 5).Value = row.CadastralUnitIncome?.MicroCategory ?? string.Empty;
      worksheet.Cell(rowIndex, 6).Value = row.CadastralUnitIncome?.MetricAmount;

      worksheet.Cell(rowIndex, 7).Value = row.ActualizedCadastralIncome;
      worksheet.Cell(rowIndex, 7).Style.NumberFormat.Format = Constants.EXPORT_NUMBERFORMAT_CURRENCY;

      worksheet.Cell(rowIndex, 8).Value = row.GrossCadastralIncome;
      worksheet.Cell(rowIndex, 8).Style.NumberFormat.Format = Constants.EXPORT_NUMBERFORMAT_CURRENCY;

      worksheet.Cell(rowIndex, 9).Value = row.CadastralUnitIncome is not null ? _sharedLocalizer.LocalizeEnumValue(row.CadastralUnitIncome.Type)!.Value : string.Empty;
      worksheet.Cell(rowIndex, 10).Value = row.EstateUnitOwnershipPercent;
      
      worksheet.Cell(rowIndex, 11).Value = row.BaseTaxableAmount;
      worksheet.Cell(rowIndex, 11).Style.NumberFormat.Format = Constants.EXPORT_NUMBERFORMAT_CURRENCY;
      
      worksheet.Cell(rowIndex, 12).Value = row.TaxRateDescription;
      
      worksheet.Cell(rowIndex, 13).Value = row.AmountPaid;
      worksheet.Cell(rowIndex, 13).Style.NumberFormat.Format = Constants.EXPORT_NUMBERFORMAT_CURRENCY;

      rowIndex++;
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
    var addressGroupedRows = await GetPdfData(filters);

    var document = new Document();
    var lastSection = document.LastSection;

    ReportGeneratorUtils.StyleSection(lastSection, PageFormat.A2, Orientation.Landscape);

    ReportGeneratorUtils.StyleParagraph
    (
      lastSection.AddParagraph(_pdfLocalizer["ReportTitle"].Value),
      fontSize: 25,
      bold: true,
      spaceAfter: 0.25,
      spaceBefore: 0.5,
      centered: true
    );

    string subTitle = _pdfLocalizer["ReportSubTitle"].Value;
    ReportGeneratorFilter? fromYearFilter, toYearFilter;

    filters.TryGetValue(FilterFromYear, out fromYearFilter);
    filters.TryGetValue(FilterToYear, out toYearFilter);

    if (fromYearFilter?.NumberValue is not null && toYearFilter?.NumberValue is not null)
      subTitle = string.Format(_pdfLocalizer["ReportSubTitleFromToYear"].Value, fromYearFilter.NumberValue, toYearFilter.NumberValue);

    else if (fromYearFilter?.NumberValue is not null && toYearFilter?.NumberValue is null)
      subTitle = string.Format(_pdfLocalizer["ReportSubTitleFromYear"].Value, fromYearFilter.NumberValue);

    else if (fromYearFilter?.NumberValue is null && toYearFilter?.NumberValue is not null)
      subTitle = string.Format(_pdfLocalizer["ReportSubTitleToYear"].Value, toYearFilter.NumberValue);

    ReportGeneratorUtils.StyleParagraph
    (
      lastSection.AddParagraph(subTitle),
      fontSize: 15,
      bold: true,
      spaceAfter: 0.25,
      spaceBefore: 0.5,
      centered: true
    );

    ReportGeneratorUtils.StyleSection(lastSection, PageFormat.A2, Orientation.Landscape, leftMargin: 5);

    foreach (var addressData in addressGroupedRows)
    {
      ReportGeneratorUtils.StyleParagraph
      (
        lastSection.AddParagraph($"{_pdfLocalizer["Year"].Value}: {addressData.Year}"),
        fontSize: 11,
        bold: true,
        spaceAfter: 0.25,
        spaceBefore: 0.5
      );

      ReportGeneratorUtils.StyleParagraph
      (
        lastSection.AddParagraph($"{_pdfLocalizer["City"].Value}: {addressData.CityName}"),
        fontSize: 11,
        bold: true,
        spaceAfter: 0.25
      );

      ReportGeneratorUtils.StyleParagraph
      (
        lastSection.AddParagraph($"{_pdfLocalizer["ManagementSubject"].Value}: {addressData.ManagementSubjectName}"),
        fontSize: 11,
        bold: true,
        spaceAfter: 0.25
      );

      var table = new Table();

      AddColumns(table);

      var row = table.AddRow();
      row.Borders.Visible = false;

      AddHeaders(row);
      ReportGeneratorUtils.StyleDefaultHeader(row);

      lastSection.Add(table);

      foreach (var estate in addressData.SubRows)
      {
        var tableRow = table.AddRow();
        tableRow.Borders.Visible = false;

        tableRow.Cells[0].AddParagraph(estate.EstateInternalCode ?? string.Empty);

        foreach (var estateUnit in estate.SubRows)
        {
          tableRow = table.AddRow();
          tableRow.Borders.Visible = false;

          tableRow.Cells[1].AddParagraph(estateUnit.EstateUnitInternalCode ?? string.Empty);
          tableRow.Cells[2].AddParagraph($"{estate.Address.Toponymy}, {estateUnit.Address.CityName} - {estateUnit.Address.Numbering} - {estateUnit.Address.LocalPostCode} - {_sharedLocalizer.LocalizeCountry(estateUnit.Address.CountryISO!).Value}");
          tableRow.Cells[3].AddParagraph(string.Join(Environment.NewLine, estateUnit.CadastralCoordinates.Select(c => $"{c.Level1} - {c.Level2} - {c.Level3} - {c.Level4} - {c.Level5}")));
          tableRow.Cells[4].AddParagraph(estateUnit.CadastralUnitIncome?.MacroCategory ?? string.Empty);
          tableRow.Cells[5].AddParagraph(estateUnit.CadastralUnitIncome?.MicroCategory ?? string.Empty);

          tableRow.Cells[6].Format.Alignment = ParagraphAlignment.Right;
          tableRow.Cells[6].AddParagraph(ReportGeneratorUtils.FormatDecimal(estateUnit.CadastralUnitIncome?.MetricAmount));

          tableRow.Cells[7].Format.Alignment = ParagraphAlignment.Right;
          tableRow.Cells[7].AddParagraph(ReportGeneratorUtils.FormatCurrency(estateUnit.ActualizedCadastralIncome));

          tableRow.Cells[8].Format.Alignment = ParagraphAlignment.Right;
          tableRow.Cells[8].AddParagraph(ReportGeneratorUtils.FormatCurrency(estateUnit.GrossCadastralIncome));

          tableRow.Cells[9].AddParagraph(estateUnit.CadastralUnitIncome is not null ? _sharedLocalizer.LocalizeEnumValue(estateUnit.CadastralUnitIncome.Type)!.Value : string.Empty);
          tableRow.Cells[10].AddParagraph(estateUnit.EstateUnitOwnershipPercent is not null ? estateUnit.EstateUnitOwnershipPercent.ToString()! : string.Empty);

          tableRow.Cells[11].Format.Alignment = ParagraphAlignment.Right;
          tableRow.Cells[11].AddParagraph(ReportGeneratorUtils.FormatCurrency(estateUnit.BaseTaxableAmount));

          tableRow.Cells[12].AddParagraph(estateUnit.TaxRateDescription ?? string.Empty);
          
          tableRow.Cells[13].Format.Alignment = ParagraphAlignment.Right;
          tableRow.Cells[13].AddParagraph(ReportGeneratorUtils.FormatCurrency(estateUnit.AmountPaid)).Format.SpaceAfter = ReportGeneratorUtils.GetUnit(0.25);
        }

        // estate totals
        tableRow = table.AddRow();
        tableRow.Format.Font.Size = 11;
        tableRow.Format.Font.Bold = true;
        tableRow.Borders.Visible = false;

        tableRow.Cells[3].AddParagraph($"Totale per lo stabile {estate.EstateInternalCode}:");
        tableRow.Cells[7].AddParagraph(ReportGeneratorUtils.FormatCurrency(estate.TotalActualizedCadastralIncome));
        tableRow.Cells[8].AddParagraph(ReportGeneratorUtils.FormatCurrency(estate.TotalGrossCadastralIncome));
        tableRow.Cells[11].AddParagraph(ReportGeneratorUtils.FormatCurrency(estate.TotalBaseTaxableAmount));
        tableRow.Cells[13].AddParagraph(ReportGeneratorUtils.FormatCurrency(estate.TotalAmountPaid)).Format.SpaceAfter = ReportGeneratorUtils.GetUnit(0.25);
      }

      table.SetEdge(0, 0, table.Columns.Count, table.Rows.Count, Edge.Box, BorderStyle.Single, 1, Colors.Black);
    }

    PdfDocumentRenderer pdfRenderer = new PdfDocumentRenderer
    {
      Document = document
    };

    pdfRenderer.RenderDocument();
    return pdfRenderer.PdfDocument;
  }

  private async Task<IEnumerable<PdfData>> GetPdfData(Dictionary<string, ReportGeneratorFilter> filters)
  {
    var data = await GetInnerDataAsync(filters);

    var managementSubjectIds = await _subjectRepository.ListAsync(
      new GetByIdsSpec<Subject>(data.Select(e => e.Estate.ManagementSubjectId)));

    var estateGrouped = data
      .GroupBy(e => new { e.Estate, e.Address, e.Year })
      .Select(x => new PdfDataRow
      {
        Year = x.First().Year,
        ManagementSubjectId = x.First().Estate.ManagementSubjectId,
        Address = x.First().Address,
        EstateInternalCode = x.First().Estate.InternalCode,
        TotalAmountPaid = x.Select(eu => eu.AmountPaid).Sum(),
        TotalBaseTaxableAmount = x.Select(eu => eu.BaseTaxableAmount).Sum(),
        TotalGrossCadastralIncome = x.Select(eu => eu.GrossCadastralIncome).Sum(),
        TotalActualizedCadastralIncome = x.Select(eu => eu.ActualizedCadastralIncome).Sum(),
        SubRows = x.ToList()
      });

    var addressGrouped = estateGrouped
      .GroupBy(e => new { e.Address, e.Year, e.ManagementSubjectId })
      .Select(x => new PdfData
      {
        Year = x.First().Year,
        CityName = x.First().Address.CityName,
        Address = x.First().Address,
        EstatesCount = x.Count(),
        EstateUnitsCount = x.First().SubRows.Count(),
        ManagementSubjectName = managementSubjectIds.FirstOrDefault(e => x.First().ManagementSubjectId == e.Id)?.Name,
        SubRows = x.ToList()
      });

    return addressGrouped;
  }

  private async Task<IEnumerable<Data>> GetInnerDataAsync(Dictionary<string, ReportGeneratorFilter> filters)
  {
    var managementSubjectId = int.Parse(filters[FilterManagementSubjectId].StringValue!);
    
    var assetTaxCalculationQuery = _assetTaxCalculationQuery.Where(assetTax =>
      assetTax.CadastralUnit.EstateUnit!.ManagementSubjectId == managementSubjectId);

    if (filters.TryGetValue(FilterFromYear, out var fromYearFilter))
    {
      var fromYear = fromYearFilter.NumberValue!.Value;
      assetTaxCalculationQuery = assetTaxCalculationQuery.Where(assetTax => assetTax.Year >= fromYear);
    }

    if (filters.TryGetValue(FilterToYear, out var toYearFilter))
    {
      var toYear = toYearFilter.NumberValue!.Value;
      assetTaxCalculationQuery = assetTaxCalculationQuery.Where(assetTax => assetTax.Year <= toYear);
    }

    if (filters.TryGetValue(FilterCityName, out var cityNameFilter))
    {
      var cityName = cityNameFilter.StringValue!;
      assetTaxCalculationQuery = assetTaxCalculationQuery.Where(assetTax => assetTax.CadastralUnit.EstateUnit!.Address.CityName == cityName);
    }

    if (filters.TryGetValue(FilterEstateId, out var estateIdFilter))
    {
      var estateId = estateIdFilter.NumberValue!.Value;
      assetTaxCalculationQuery = assetTaxCalculationQuery.Where(assetTax => assetTax.CadastralUnit.EstateUnit!.Estate.Id == estateId);
    }

    if (filters.TryGetValue(FilterIncomeType, out var incomeTypeFilter))
    {
      var incomeType = Enum.Parse<IncomeType>(incomeTypeFilter.StringValue!);
      assetTaxCalculationQuery = assetTaxCalculationQuery.Where(asssetTax => asssetTax.CadastralUnit.Income.Type == incomeType);
    }

    if (filters.TryGetValue(FilterUsageTypeId, out var usageTypeFilter))
    {
      var usageType = usageTypeFilter.NumberValue!.Value;

      assetTaxCalculationQuery = assetTaxCalculationQuery.Where(assetTax =>
        assetTax.CadastralUnit.EstateUnit!.Estate.UsageType.Id == usageType);
    }

    if (filters.TryGetValue(FilterCadastralCategoryId, out var cadastralCategoryFilter))
    {
      var cadastralCategoryId = cadastralCategoryFilter.NumberValue!.Value;

      assetTaxCalculationQuery = assetTaxCalculationQuery.Where(assetTax =>
        assetTax.CadastralUnit.Income.CadastralCategory!.Id == cadastralCategoryId);
    }

    var assetTaxCalculations = await assetTaxCalculationQuery.ToListAsync();

    return assetTaxCalculations
      .Where(assetTaxCalculation => assetTaxCalculation.Installments.Any())
      .Select(assetTaxCalculation =>
      {
        var cadastraUnitTaxConfig = assetTaxCalculation.CadastralUnit.TaxConfig
          .Where(taxConfig => taxConfig.Code == "imu-rate")
          .FirstOrDefault();

        var taxRateDescription = cadastraUnitTaxConfig?.Value;

        if (cadastraUnitTaxConfig != null)
        {
          var taxCalculator = _taxCalculatorService.GetTaxCalculator(cadastraUnitTaxConfig.TaxCalculator)!;
          var calculatorConfig = taxCalculator.GetCadastralUnitFormAsync(assetTaxCalculation.CadastralUnit).Result;
          var rateField = calculatorConfig.Form.SelectMany(fields => fields).Single(field => field.Name == "imu-rate");

          if (rateField.ValidValues!.ContainsKey(cadastraUnitTaxConfig.Value!))
          {
            taxRateDescription = rateField.ValidValues[cadastraUnitTaxConfig.Value!];
          }
        }

        return new Data
        {
          Year = assetTaxCalculation.Year,
          CadastralUnitIncome = assetTaxCalculation.CadastralUnit.Income,
          TaxRateDescription = taxRateDescription,
          Estate = assetTaxCalculation.CadastralUnit.EstateUnit!.Estate,
          Address = assetTaxCalculation.CadastralUnit.EstateUnit.Address,
          CadastralCoordinates = assetTaxCalculation.CadastralUnit.Coordinates,
          EstateUnitInternalCode = assetTaxCalculation.CadastralUnit.EstateUnit!.InternalCode,
          EstateUnitOwnershipPercent =  assetTaxCalculation.CadastralUnit.EstateUnit!.OwnershipPercent,
          AmountPaid = assetTaxCalculation.Installments.Select(installment => installment.AmountPaid).Sum(),
          BaseTaxableAmount = assetTaxCalculation.Installments.First().BaseTaxableAmount,
          GrossCadastralIncome = assetTaxCalculation.Installments.First().GrossCadastralIncome,
          ActualizedCadastralIncome = assetTaxCalculation.Installments.First().ActualizedCadastralIncome
        };
      });
  }

  private void AddColumns(Table table)
  {
    table.AddColumn(ReportGeneratorUtils.GetUnit());
    table.AddColumn(ReportGeneratorUtils.GetUnit());
    table.AddColumn(ReportGeneratorUtils.GetUnit(7));
    table.AddColumn(ReportGeneratorUtils.GetUnit(7));
    table.AddColumn(ReportGeneratorUtils.GetUnit());
    table.AddColumn(ReportGeneratorUtils.GetUnit());
    table.AddColumn(ReportGeneratorUtils.GetUnit());
    table.AddColumn(ReportGeneratorUtils.GetUnit(3));
    table.AddColumn(ReportGeneratorUtils.GetUnit());
    table.AddColumn(ReportGeneratorUtils.GetUnit(7));
    table.AddColumn(ReportGeneratorUtils.GetUnit());
    table.AddColumn(ReportGeneratorUtils.GetUnit());
    table.AddColumn(ReportGeneratorUtils.GetUnit());
    table.AddColumn(ReportGeneratorUtils.GetUnit());
  }

  private void AddHeaders(Row row)
  {
    row.Cells[0].AddParagraph(_pdfLocalizer["Estate"].Value);
    row.Cells[1].AddParagraph(_pdfLocalizer["EstateUnit"].Value);
    row.Cells[2].AddParagraph(_pdfLocalizer["Address"].Value);
    row.Cells[3].AddParagraph(_pdfLocalizer["CadastralCoordinates"].Value);
    row.Cells[4].AddParagraph(_pdfLocalizer["MacroCategory"].Value);
    row.Cells[5].AddParagraph(_pdfLocalizer["MicroCategory"].Value);
    row.Cells[6].AddParagraph(_pdfLocalizer["MetricAmount"].Value);
    row.Cells[7].AddParagraph(_pdfLocalizer["ActualizedCadastralIncome"].Value);
    row.Cells[8].AddParagraph(_pdfLocalizer["GrossCadastralIncome"].Value);
    row.Cells[9].AddParagraph(_pdfLocalizer["CadastralUnitIncomeType"].Value);
    row.Cells[10].AddParagraph(_pdfLocalizer["EstateUnitOwnershipPercent"].Value);
    row.Cells[11].AddParagraph(_pdfLocalizer["BaseTaxableAmount"].Value);
    row.Cells[12].AddParagraph(_pdfLocalizer["CadastralUnitTaxConfig"].Value);
    row.Cells[13].AddParagraph(_pdfLocalizer["AmountPaid"].Value);
  }

  private sealed record Data
  {
    public int Year { get; set; }
    public CadastralUnitIncome? CadastralUnitIncome { get; set; }
    public string? TaxRateDescription { get; init; } = default!;
    public Estate Estate { get; set; } = default!;
    public Address Address { get; set; } = default!;
    public NullSafeCollection<CadastralCoordinates> CadastralCoordinates { get; set; } = default!;
    public string? EstateUnitInternalCode { get; set; }
    public double? EstateUnitOwnershipPercent { get; set; }
    public decimal AmountPaid { get; set; }
    public decimal BaseTaxableAmount { get; set; }
    public decimal GrossCadastralIncome { get; set; }
    public decimal ActualizedCadastralIncome { get; set; }
  }

  private sealed record PdfData
  {
    public int Year { get; set; }
    public string? CityName { get; set; }
    public Address Address { get; set; } = default!;
    public int EstatesCount { get; set; }
    public int EstateUnitsCount { get; set; }
    public string? ManagementSubjectName { get; set; }
    public List<PdfDataRow> SubRows { get; set; } = new();
  }

  private sealed record PdfDataRow
  {
    public int Year { get; set; }
    public int ManagementSubjectId { get; set; }
    public Address Address { get; set; } = default!;
    public string? EstateInternalCode { get; set; }
    public decimal TotalAmountPaid { get; set; }
    public decimal TotalBaseTaxableAmount { get; set; }
    public decimal TotalGrossCadastralIncome { get; set; }
    public decimal TotalActualizedCadastralIncome { get; set; }
    public List<Data> SubRows { get; set; } = new();
  }
}
