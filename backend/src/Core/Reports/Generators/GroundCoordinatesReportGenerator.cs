using ClosedXML.Excel;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Localization;
using MigraDoc.DocumentObjectModel;
using MigraDoc.DocumentObjectModel.Tables;
using MigraDoc.Rendering;
using PdfSharp.Pdf;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Asst.CadastralUnitAggregate;
using RealGimm.Core.Asst.CadastralUnitAggregate.Specifications;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.CrossModule;
using RealGimm.Core.Extensions;
using RealGimm.Core.Reports.Generators.Shared;
using RealGimm.Core.Resources;
using RealGimm.Core.Shared.Specifications;
using RealGimm.SharedKernel;

namespace RealGimm.Core.Reports.Generators;

public class GroundCoordinatesReportGenerator : ReportGenerator
{
  private readonly IReadRepository<CadastralUnit> _cuRepository;
  private readonly IStringLocalizer _globalLocalizer;
  private readonly IStringLocalizer<GroundCoordinatesReportGenerator> _localizer;
  private readonly IStringLocalizer<SharedResources> _sharedLocalizer;
  private readonly IReadRepository<Subject> _subRepository;
  
  private readonly IQueryable<CadastralUnit> _cadastralUnits;

  public override Guid Id => StaticId;
  public override string Name => _localizer["ReportTitle"].Value;
  public override ReportFormat[] SupportedFormats { get; } = [ReportFormat.Excel, ReportFormat.Pdf];
  public override ReportGeneratorFilterField[][] FilterFields { get; }

  public static Guid StaticId => Guid.Parse("c6d4b1bd-c020-4e76-ae30-1a5e37ef9186");

  internal const string FilterManagementSubjectId = "ManagementSubjectId";
  internal const string FilterEstateId = "EstateId";
  internal const string FilterCityName = "CityName";
  internal const string FilterIncomeType = "IncomeType";
  internal const string FilterUsageTypeId = "UsageTypeId";
  internal const string FilterCadastralCategoryId = "CadastralCategoryId";

  public GroundCoordinatesReportGenerator(
    IConfiguration configuration,
    IReadRepository<CadastralUnit> cuRepository,
    IReadRepository<Subject> subRepository,
    IStringLocalizer<GroundCoordinatesReportGenerator> localizer,
    IStringLocalizer<SharedResources> sharedLocalizer,
    IStringLocalizer globalLocalizer)
    : base(configuration)
  {
    _cuRepository = cuRepository;
    _subRepository = subRepository;
    _localizer = localizer;
    _sharedLocalizer = sharedLocalizer;
    _globalLocalizer = globalLocalizer;

    _cadastralUnits = _cuRepository
      .AsQueryable(new CadastralUnitIncludeAllSpec())
      .Where(e => e.EstateUnit != null && e.Type == EstateUnitType.Ground || e.Type == EstateUnitType.UrbanArea);

    var filters = new
    {
      Estates = _cadastralUnits
        .Select(e => e.EstateUnit!.Estate).Select(e => new { e.Id, e.Name })
        .Distinct()
        .OrderBy(e => e.Name)
        .ToDictionary(e => e.Id.ToString(), e => e.Name!),

      UsageTypes = _cadastralUnits
        .Select(e => e.EstateUnit!.UsageType)
        .Select(e => new { e.Id, e.Name })
        .Distinct()
        .OrderBy(e => e.Name)
        .ToDictionary(e => e.Id.ToString(), e => e.Name!),

      Cities = _cadastralUnits
        .Where(e => !string.IsNullOrEmpty(e.EstateUnit!.Address.CityName))
        .Select(e => e.EstateUnit!.Address.CityName)
        .Distinct()
        .OrderBy(e => e)
        .ToDictionary(e => e!, e => e!),

      CadastralCategories = _cadastralUnits
        .Where(e => e.Income.CadastralCategory != null)
        .Select(e => e.Income.CadastralCategory)
        .ToDictionary(e => e!.Id.ToString(), e => e!.Description),

      IncomeTypes = Enum
        .GetValues(typeof(IncomeType)).Cast<IncomeType>()
        .ToDictionary(incomeType => incomeType.ToString(), incomeType => _sharedLocalizer.LocalizeEnumValue(incomeType).Value),

      ManagementSubjects = _subRepository
        .AsQueryable(new GetByIdsSpec<Subject>(_cadastralUnits.Select(e => e.EstateUnit!.ManagementSubjectId).ToArray()))
        .ToDictionary(e => e.Id.ToString(), e => e.Name)
    };

    FilterFields = [
      [
        new ReportGeneratorFilterField(FilterManagementSubjectId, _globalLocalizer[$"ReportFilter.{FilterManagementSubjectId}"], IsMandatory: true, CustomFieldType.SingleItemFromList, ValidValues: filters.ManagementSubjects),
        new ReportGeneratorFilterField(FilterEstateId, _globalLocalizer[$"ReportFilter.{FilterEstateId}"], IsMandatory: false, CustomFieldType.SingleItemFromList, ValidValues: filters.Estates),
        new ReportGeneratorFilterField(FilterCityName, _globalLocalizer[$"ReportFilter.{FilterCityName}"], IsMandatory: false, CustomFieldType.SingleItemFromList, ValidValues: filters.Cities),
        new ReportGeneratorFilterField(FilterIncomeType, _globalLocalizer[$"ReportFilter.{FilterIncomeType}"], IsMandatory: false, CustomFieldType.SingleItemFromList, ValidValues: filters.IncomeTypes),
        new ReportGeneratorFilterField(FilterUsageTypeId, _globalLocalizer[$"ReportFilter.{FilterUsageTypeId}"], IsMandatory: false, CustomFieldType.SingleItemFromList, ValidValues: filters.UsageTypes),
        new ReportGeneratorFilterField(FilterCadastralCategoryId, _globalLocalizer[$"ReportFilter.{FilterCadastralCategoryId}"], IsMandatory: false, CustomFieldType.SingleItemFromList, ValidValues: filters.CadastralCategories),
      ]
    ];
  }
  
  protected override string GetReportFileNameWithoutExtension() => _localizer["ReportFileName"].Value;

  protected override async Task<XLWorkbook> GenerateExcelReportAsync(Dictionary<string, ReportGeneratorFilter> filters)
  {
    var workbook = new XLWorkbook();
    var worksheet = workbook.AddWorksheet(_localizer["ReportTitle"].Value);

    var rowIndex = 1;
    worksheet.Cell(rowIndex, 1).Value = _localizer[nameof(CadastralCoordinatesRow.EstateUnitInternalCode)].Value;
    worksheet.Cell(rowIndex, 2).Value = _localizer[nameof(CadastralCoordinatesRow.EstateUnitUsageTypeName)].Value;
    worksheet.Cell(rowIndex, 3).Value = _localizer[nameof(CadastralCoordinatesRow.EstateUnitAddress)].Value;
    worksheet.Cell(rowIndex, 4).Value = _localizer["ITTavPartita"].Value;
    worksheet.Cell(rowIndex, 5).Value = _localizer["Level2"].Value;
    worksheet.Cell(rowIndex, 6).Value = _localizer["Level3"].Value;
    worksheet.Cell(rowIndex, 7).Value = _localizer["Level4"].Value;
    worksheet.Cell(rowIndex, 8).Value = _localizer["ProtocolNumber"].Value;
    worksheet.Cell(rowIndex, 9).Value = _localizer["ProtocolDate"].Value;
    worksheet.Cell(rowIndex, 10).Value = _localizer["Level5"].Value;
    worksheet.Cell(rowIndex, 11).Value = _localizer["FarmAmount"].Value;
    worksheet.Cell(rowIndex, 12).Value = _localizer["LandAmount"].Value;
    worksheet.Cell(rowIndex, 13).Value = _localizer["MetricAmount"].Value;
    rowIndex++;

    foreach (var row in await GetInnerDataAsync(filters))
    {
      var cadastralCoordinates = row.CadastralUnit.Coordinates;
      worksheet.Cell(rowIndex, 1).Value = row.EstateUnitInternalCode;
      worksheet.Cell(rowIndex, 2).Value = row.EstateUnitUsageTypeName;
      worksheet.Cell(rowIndex, 3).Value = row.EstateUnitAddress;
      worksheet.Cell(rowIndex, 4).Value = string.Join(Environment.NewLine, cadastralCoordinates.Select(e => e.ITTavPartita));
      worksheet.Cell(rowIndex, 5).Value = string.Join(Environment.NewLine, cadastralCoordinates.Select(e => e.Level2));
      worksheet.Cell(rowIndex, 6).Value = string.Join(Environment.NewLine, cadastralCoordinates.Select(e => e.Level3));
      worksheet.Cell(rowIndex, 7).Value = string.Join(Environment.NewLine, cadastralCoordinates.Select(e => e.Level4));

      worksheet.Cell(rowIndex, 8).Value = row.CadastralUnit.Inspection?.ProtocolNumber;
      worksheet.Cell(rowIndex, 9).Value = row.CadastralUnit.Inspection?.ProtocolDate.ToString();

      worksheet.Cell(rowIndex, 10).Value = string.Join(Environment.NewLine, cadastralCoordinates.Select(e => e.Level5));

      worksheet.Cell(rowIndex, 11).Value = row.CadastralUnit.Income?.FarmAmount ?? 0;
      worksheet.Cell(rowIndex, 11).Style.NumberFormat.Format = Constants.EXPORT_NUMBERFORMAT_CURRENCY;

      worksheet.Cell(rowIndex, 12).Value = row.CadastralUnit.Income?.LandAmount ?? 0;
      worksheet.Cell(rowIndex, 12).Style.NumberFormat.Format = Constants.EXPORT_NUMBERFORMAT_CURRENCY;

      worksheet.Cell(rowIndex, 13).Value = row.CadastralUnit.Income?.MetricAmount;

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
    var document = new Document();
    var lastSection = document.LastSection;

    ReportGeneratorUtils.StyleSection(lastSection, PageFormat.A2, Orientation.Landscape, 1.5);

    ReportGeneratorUtils.StyleParagraph
    (
      lastSection.AddParagraph(_localizer["ReportTitle"].Value),
      fontSize: 25,
      bold: true,
      spaceAfter: 0.25,
      spaceBefore: 0.5,
      centered: true
    );

    var table = new Table();
    AddColumns(table);

    var tableRow = table.AddRow();
    tableRow.Borders.Visible = false;

    AddHeaders(tableRow);
    ReportGeneratorUtils.StyleDefaultHeader(tableRow);

    lastSection.Add(table);

    var rows = await GetInnerDataAsync(filters);
    foreach (var row in rows)
    {
      tableRow = table.AddRow();
      tableRow.Borders.Visible = false;

      if (row == rows.First())
      {
        tableRow.TopPadding = ReportGeneratorUtils.GetUnit(0.2);
      }

      var cadastralCoordinates = row.CadastralUnit.Coordinates;
      tableRow.Cells[0].AddParagraph(row.EstateUnitInternalCode);
      tableRow.Cells[1].AddParagraph(row.EstateUnitUsageTypeName ?? string.Empty);
      tableRow.Cells[2].AddParagraph(row.EstateUnitAddress ?? string.Empty);
      tableRow.Cells[3].AddParagraph(string.Join(Environment.NewLine, cadastralCoordinates.Select(e => e.ITTavPartita)));
      tableRow.Cells[4].AddParagraph(string.Join(Environment.NewLine, cadastralCoordinates.Select(e => e.Level2)));
      tableRow.Cells[5].AddParagraph(string.Join(Environment.NewLine, cadastralCoordinates.Select(e => e.Level3)));
      tableRow.Cells[6].AddParagraph(string.Join(Environment.NewLine, cadastralCoordinates.Select(e => e.Level4)));
      tableRow.Cells[7].AddParagraph(string.Join(Environment.NewLine, cadastralCoordinates.Select(e => e.Level5)));

      tableRow.Cells[8].AddParagraph(row.CadastralUnit.Inspection?.ProtocolNumber ?? string.Empty);
      tableRow.Cells[9].AddParagraph(row.CadastralUnit.Inspection?.ProtocolDate.ToString() ?? string.Empty);

      tableRow.Cells[10].Format.Alignment = ParagraphAlignment.Right;
      tableRow.Cells[10].AddParagraph(ReportGeneratorUtils.FormatCurrency(row.CadastralUnit.Income?.FarmAmount));

      tableRow.Cells[11].Format.Alignment = ParagraphAlignment.Right;
      tableRow.Cells[11].AddParagraph(ReportGeneratorUtils.FormatCurrency(row.CadastralUnit.Income?.LandAmount));

      tableRow.Cells[12].Format.Alignment = ParagraphAlignment.Right;
      tableRow.Cells[12].AddParagraph(ReportGeneratorUtils.FormatDecimal(row.CadastralUnit.Income?.MetricAmount));

      tableRow.BottomPadding = ReportGeneratorUtils.GetUnit(0.4);
    }

    table.SetEdge(0, 0, table.Columns.Count, table.Rows.Count, Edge.Box, BorderStyle.Single, 1, Colors.Black);

    PdfDocumentRenderer pdfRenderer = new PdfDocumentRenderer
    {
      Document = document
    };

    pdfRenderer.RenderDocument();
    return pdfRenderer.PdfDocument;
  }

  private Task<List<CadastralCoordinatesRow>> GetInnerDataAsync(Dictionary<string, ReportGeneratorFilter> filters)
  {
    if (int.TryParse(filters[FilterManagementSubjectId].StringValue, out int managementSubjectId))
    {
      var cadastralUnits = _cadastralUnits.Where(e => e.EstateUnit!.ManagementSubjectId == managementSubjectId);

      if (filters.TryGetValue(FilterCityName, out var cityNameFilter) &&
        cityNameFilter.StringValue is not null)
      {
        cadastralUnits = cadastralUnits.Where(e => e.EstateUnit != null &&
        e.EstateUnit!.Address.CityName!.Equals(cityNameFilter.StringValue));
      }

      if (filters.TryGetValue(FilterEstateId, out var estateFilter) &&
        estateFilter.NumberValue is not null)
      {
        cadastralUnits = cadastralUnits.Where(e => e.EstateUnit != null &&
        e.EstateUnit.Estate.Id == estateFilter.NumberValue);
      }

      if (filters.TryGetValue(FilterIncomeType, out var incomeTypeFilter) &&
        Enum.TryParse(incomeTypeFilter.StringValue, out IncomeType incomeType))
      {
        cadastralUnits = cadastralUnits.Where(e => e.Income.Type == incomeType);
      }

      if (filters.TryGetValue(FilterUsageTypeId, out var usageTypeFilter) &&
        usageTypeFilter.NumberValue is not null)
      {
        cadastralUnits = cadastralUnits.Where(e =>
          e.EstateUnit != null &&
          e.EstateUnit.Estate.UsageType.Id == usageTypeFilter.NumberValue);
      }

      if (filters.TryGetValue(FilterCadastralCategoryId, out var cadastralCategoryFilter) &&
        cadastralCategoryFilter.NumberValue is not null)
      {
        cadastralUnits = cadastralUnits.Where(e =>
          e.Income.CadastralCategory != null &&
          e.Income.CadastralCategory.Id == cadastralCategoryFilter.NumberValue);
      }

      var rows = cadastralUnits.Select(e => new CadastralCoordinatesRow(
        e.EstateUnit!.Estate.InternalCode,
        e.EstateUnit.InternalCode,
        e.EstateUnit.UsageType.Name,
        $"{e.EstateUnit.Address.Toponymy}, {e.EstateUnit.Address.CityName} - {e.EstateUnit.Address.Numbering} - {e.EstateUnit.Address.LocalPostCode} - {_sharedLocalizer.LocalizeCountry(e.EstateUnit.Address.CountryISO!).Value}",
        e
      ));

      return rows.ToListAsync();
    }
    
    throw CreateFilterFormatException(FilterManagementSubjectId);
  }

  private void AddColumns(Table table)
  {
    table.AddColumn(ReportGeneratorUtils.GetUnit(4));
    table.AddColumn(ReportGeneratorUtils.GetUnit(5));
    table.AddColumn(ReportGeneratorUtils.GetUnit(10));
    table.AddColumn(ReportGeneratorUtils.GetUnit());
    table.AddColumn(ReportGeneratorUtils.GetUnit());
    table.AddColumn(ReportGeneratorUtils.GetUnit());
    table.AddColumn(ReportGeneratorUtils.GetUnit());
    table.AddColumn(ReportGeneratorUtils.GetUnit());
    table.AddColumn(ReportGeneratorUtils.GetUnit(5));
    table.AddColumn(ReportGeneratorUtils.GetUnit(5));
    table.AddColumn(ReportGeneratorUtils.GetUnit(5));
    table.AddColumn(ReportGeneratorUtils.GetUnit(5));
    table.AddColumn(ReportGeneratorUtils.GetUnit(5));
  }

  private void AddHeaders(Row row)
  {
    row.Cells[0].AddParagraph(_localizer[nameof(CadastralCoordinatesRow.EstateUnitInternalCode)].Value);
    row.Cells[1].AddParagraph(_localizer[nameof(CadastralCoordinatesRow.EstateUnitUsageTypeName)].Value);
    row.Cells[2].AddParagraph(_localizer[nameof(CadastralCoordinatesRow.EstateUnitAddress)].Value);
    row.Cells[3].AddParagraph(_localizer["ITTavPartita"].Value);
    row.Cells[4].AddParagraph(_localizer["Level2"].Value);
    row.Cells[5].AddParagraph(_localizer["Level3"].Value);
    row.Cells[6].AddParagraph(_localizer["Level4"].Value);
    row.Cells[7].AddParagraph(_localizer["Level5"].Value);
    row.Cells[8].AddParagraph(_localizer["ProtocolNumber"].Value);
    row.Cells[9].AddParagraph(_localizer["ProtocolDate"].Value);
    row.Cells[10].AddParagraph(_localizer["FarmAmount"].Value);
    row.Cells[11].AddParagraph(_localizer["LandAmount"].Value);
    row.Cells[12].AddParagraph(_localizer["MetricAmount"].Value);
  }
}
