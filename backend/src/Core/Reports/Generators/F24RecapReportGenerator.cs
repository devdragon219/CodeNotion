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
using RealGimm.Core.CrossModule;
using RealGimm.Core.Reports.Generators.Shared;
using RealGimm.Core.Shared.Specifications;
using RealGimm.SharedKernel;

namespace RealGimm.Core.Reports.Generators;

public class F24RecapReportGenerator : ReportGenerator
{
  private readonly IReadRepository<AssetTaxCalculation> _calcRepository;
  private readonly IReadRepository<Subject> _subjectRepository;
  private readonly IStringLocalizer _globalLocalizer;
  private readonly IStringLocalizer<F24RecapReportGenerator> _localizer;

  private readonly IQueryable<Subject> _managementSubjects;
  private readonly IQueryable<AssetTaxCalculation> _taxCalculators;

  public override Guid Id => StaticId;
  public override string Name => _localizer["ReportTitle"].Value;
  public override ReportFormat[] SupportedFormats { get; } = [ReportFormat.Excel, ReportFormat.Pdf];
  public override ReportGeneratorFilterField[][] FilterFields { get; }

  public static Guid StaticId => Guid.Parse("11d0f32b-f14d-4464-a33f-0daa5bed06ba");

  internal const string FilterYear = "Year";
  internal const string FilterExpectedDueDate = "ExpectedDueDate";
  internal const string FilterManagementSubjectId = "ManagementSubjectId";

  protected override string GetReportFileNameWithoutExtension() => _localizer["ReportFileName"].Value;

  public F24RecapReportGenerator(
    IConfiguration configuration,
    IReadRepository<AssetTaxCalculation> calcRepository,
    IReadRepository<Subject> subjectRepository,
    IStringLocalizer<F24RecapReportGenerator> localizer,
    IStringLocalizer globalLocalizer)
    : base(configuration)
  {
    _calcRepository = calcRepository;
    _subjectRepository = subjectRepository;
    _localizer = localizer;
    _globalLocalizer = globalLocalizer;

    _taxCalculators = _calcRepository
      .AsQueryable(new AssetTaxCalculationIncludeAllSpec())
      .Where(e => e.TaxCalculator.Equals("IMU") && e.CadastralUnit.EstateUnit != null);

    _managementSubjects = _subjectRepository
      .AsQueryable(
        new GetByIdsSpec<Subject>(_taxCalculators
          .Select(e => e.CadastralUnit.EstateUnit!.ManagementSubjectId)
          .ToArray()));

    var filterLists = new
    {
      ManagementSubjects = _managementSubjects
        .Select(e => new { e.Id, e.Name })
        .Distinct()
        .OrderBy(e => e.Name)
        .ToDictionary(e => e.Id.ToString(), e => e.Name)
    };

    FilterFields =
    [
      [
        new ReportGeneratorFilterField(FilterYear, _globalLocalizer[$"ReportFilter.{FilterYear}"], IsMandatory: true, CustomFieldType.SimpleNumber),
        new ReportGeneratorFilterField(FilterExpectedDueDate, _globalLocalizer[$"ReportFilter.{FilterExpectedDueDate}"], IsMandatory: false, CustomFieldType.Date),
        new ReportGeneratorFilterField(FilterManagementSubjectId, _globalLocalizer[$"ReportFilter.{FilterManagementSubjectId}"], IsMandatory: true, CustomFieldType.SingleItemFromList, ValidValues: filterLists.ManagementSubjects),
      ]
    ];
  }

  protected override async Task<XLWorkbook> GenerateExcelReportAsync(Dictionary<string, ReportGeneratorFilter> filters)
  {
    var workbook = new XLWorkbook();
    var worksheet = workbook.AddWorksheet(_localizer["ReportTitle"].Value);

    var rowIndex = 1;
    worksheet.Cell(rowIndex, 1).Value = _localizer[nameof(F24RecapRow.SubjectName)].Value;
    worksheet.Cell(rowIndex, 2).Value = _localizer[nameof(F24RecapRow.BaseCountryTaxIdCode)].Value;
    worksheet.Cell(rowIndex, 3).Value = _localizer[nameof(F24RecapRow.PaymentDate)].Value;
    worksheet.Cell(rowIndex, 4).Value = _localizer[nameof(F24RecapRow.Amount)].Value;
    worksheet.Cell(rowIndex, 5).Value = _localizer[nameof(F24RecapRow.IBAN)].Value;
    rowIndex++;

    foreach (var row in (await GetInnerDataAsync(filters)).Rows)
    {
      worksheet.Cell(rowIndex, 1).Value = row.SubjectName;
      worksheet.Cell(rowIndex, 2).Value = row.BaseCountryTaxIdCode;
      worksheet.Cell(rowIndex, 3).Value = row.PaymentDate.ToString();
      
      worksheet.Cell(rowIndex, 4).Value = row.Amount;
      worksheet.Cell(rowIndex, 4).Style.NumberFormat.Format = Constants.EXPORT_NUMBERFORMAT_CURRENCY;

      worksheet.Cell(rowIndex, 5).Value = row.IBAN;
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
    (List<F24RecapRow> rows, Subject? managementSubject) = await GetInnerDataAsync(filters);

    var document = new Document();
    var lastSection = document.LastSection;

    if (managementSubject is not null)
    {
      ReportGeneratorUtils.StyleSection(lastSection, PageFormat.A3, Orientation.Portrait, 1.5);

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
        lastSection.AddParagraph($"{_localizer["SubjectName"].Value}: {managementSubject.Name}"),
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

      foreach (var row in rows)
      {
        tableRow = table.AddRow();
        tableRow.Borders.Visible = false;

        if (row == rows.First())
        {
          tableRow.TopPadding = ReportGeneratorUtils.GetUnit(0.2);
        }

        tableRow.Cells[0].AddParagraph(row.SubjectName ?? string.Empty);
        tableRow.Cells[1].AddParagraph(row.BaseCountryTaxIdCode ?? string.Empty);

        tableRow.Cells[2].Format.Alignment = ParagraphAlignment.Right;
        tableRow.Cells[2].AddParagraph(row.PaymentDate.ToString() ?? string.Empty);

        tableRow.Cells[3].Format.Alignment = ParagraphAlignment.Right;
        tableRow.Cells[3].AddParagraph(ReportGeneratorUtils.FormatCurrency(row.Amount));

        tableRow.Cells[4].AddParagraph(row.IBAN ?? string.Empty);

        tableRow.BottomPadding = ReportGeneratorUtils.GetUnit(0.4);
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

  public async Task<(List<F24RecapRow> Rows, Subject? ManagementSubject)> GetInnerDataAsync(Dictionary<string, ReportGeneratorFilter> filters)
  {
    if (!int.TryParse(filters[FilterManagementSubjectId].StringValue, out int managementSubjectId))
    {
      throw CreateFilterFormatException(FilterManagementSubjectId);
    }

    var year = filters[FilterYear].NumberValue ?? throw new ApplicationException(CreateNotExistingFiltertExceptionMessage(FilterYear));
    var rows = new List<F24RecapRow>();
    var managementSubject = _managementSubjects.FirstOrDefault(e => e.Id == managementSubjectId);

    if (managementSubject is not null)
    {
      var taxCalculators = _calcRepository
        .AsQueryable(new AssetTaxCalculationIncludeAllSpec())
        .Where(e =>
          e.TaxCalculator.Equals("IMU") &&
          e.CadastralUnit.EstateUnit != null &&
          e.CadastralUnit.EstateUnit!.ManagementSubjectId == managementSubjectId && e.Year == year);
      
      var installments = taxCalculators.SelectMany(e => e.Installments);

      if (filters.TryGetValue(FilterExpectedDueDate, out var expectedDueDateFilter) &&
        expectedDueDateFilter.DateValue is not null)
      {
        installments = installments.Where(e => e.ExpectedDueDate == expectedDueDateFilter.DateValue);
      }

      foreach (var installment in await installments.ToListAsync())
      {
        var bankAccount = managementSubject.BankAccounts.FirstOrDefault(e => e.Id == installment.ManagementSubjectBankAccountId);

        rows.Add(new F24RecapRow(
          managementSubject.Name,
          (managementSubject as ManagementSubject)!.BaseCountryTaxIdCode!,
          installment.Date,
          installment.AmountPaid,
          bankAccount?.ReferenceCode
        ));
      }
    }

    return (rows, managementSubject);
  }

  private void AddColumns(Table table)
  {
    table.AddColumn(ReportGeneratorUtils.GetUnit(7));
    table.AddColumn(ReportGeneratorUtils.GetUnit(5));
    table.AddColumn(ReportGeneratorUtils.GetUnit(3.5));
    table.AddColumn(ReportGeneratorUtils.GetUnit(4));
    table.AddColumn(ReportGeneratorUtils.GetUnit(7));
  }

  private void AddHeaders(Row row)
  {
    row.Cells[0].AddParagraph(_localizer[nameof(F24RecapRow.SubjectName)].Value);
    row.Cells[1].AddParagraph(_localizer[nameof(F24RecapRow.BaseCountryTaxIdCode)].Value);
    row.Cells[2].AddParagraph(_localizer[nameof(F24RecapRow.PaymentDate)].Value);
    row.Cells[3].AddParagraph(_localizer[nameof(F24RecapRow.Amount)].Value);
    row.Cells[4].AddParagraph(_localizer[nameof(F24RecapRow.IBAN)].Value);
  }
}
