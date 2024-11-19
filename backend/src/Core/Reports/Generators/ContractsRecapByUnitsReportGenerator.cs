using ClosedXML.Excel;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Localization;
using MigraDoc.DocumentObjectModel;
using MigraDoc.DocumentObjectModel.Tables;
using MigraDoc.Rendering;
using PdfSharp.Pdf;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.Common.CityAggregate;
using RealGimm.Core.CrossModule;
using RealGimm.Core.Extensions;
using RealGimm.Core.Prop.ContractAggregate;
using RealGimm.Core.Prop.ContractAggregate.Specifications;
using RealGimm.Core.Reports.Generators.Shared;
using RealGimm.Core.Resources;
using RealGimm.Core.Shared.Specifications;
using RealGimm.SharedKernel;

namespace RealGimm.Core.Reports.Generators;

public class ContractsRecapByUnitsReportGenerator : ReportGenerator
{
  private readonly IReadRepository<EstateUnit> _estateUnitRepository;
  private readonly IReadRepository<Contract> _contractRepository;
  private readonly IReadRepository<Subject> _subjectRepository;
  private readonly IStringLocalizer _globalLocalizer;
  private readonly IStringLocalizer<SharedResources> _sharedLocalizer;
  private readonly IStringLocalizer<ContractsRecapByUnitsReportGenerator> _localizer;

  private ReportGeneratorFilterField[][]? _filterFields;

  public override Guid Id => StaticId;
  public override string Name => _localizer["ReportTitle"].Value;
  public override ReportFormat[] SupportedFormats { get; } = [ReportFormat.Excel, ReportFormat.Pdf];
  public override ReportGeneratorFilterField[][] FilterFields
  {
    get => _filterFields ?? throw new InvalidOperationException("Filters not initialized. Call InitializeFiltersAsync() first.");
  }

  public static Guid StaticId => Guid.Parse("7319b784-a986-4264-abe9-dbf6e48612bb");

  internal static class FilterNames
  {
    public const string ManagementSubjectId = "ManagementSubjectId";
    public const string EstateId = "EstateId";
    public const string CityName = "CityName";
  }

  public ContractsRecapByUnitsReportGenerator(
    IConfiguration configuration,
    IReadRepository<EstateUnit> euRepository,
    IReadRepository<Contract> contractRepository,
    IReadRepository<Subject> subjectRepository,
    IStringLocalizer<SharedResources> sharedLocalizer,
    IStringLocalizer<ContractsRecapByUnitsReportGenerator> localizer,
    IStringLocalizer globalLocalizer)
    : base(configuration)
  {
    _estateUnitRepository = euRepository;
    _contractRepository = contractRepository;
    _subjectRepository = subjectRepository;
    _sharedLocalizer = sharedLocalizer;
    _localizer = localizer;
    _globalLocalizer = globalLocalizer;
  }

  public override async Task InitializeFiltersAsync()
  {
    var estateUnitIds = await _contractRepository
      .AsQueryable(new WorkingContractSpec())
      .SelectMany(contract => contract.LocatedUnits)
      .GroupBy(locatedUnit => locatedUnit.EstateUnitId)
      .Select(group => group.Key)
      .ToListAsync();

    var estateUnits = await _estateUnitRepository
      .AsQueryable(new GetByIdsSpec<EstateUnit>(estateUnitIds))
      .Select(estateUnit => new
      {
        estateUnit.Id,
        estateUnit.ManagementSubjectId,
        Estate = new
        {
          estateUnit.Estate.Id,
          estateUnit.Estate.Name
        },
        estateUnit.Address.CityName
      })
      .ToListAsync();

    var managementSubjectFilters = _subjectRepository
      .AsQueryable(new GetByIdsSpec<Subject>(estateUnits.Select(estateUnit => estateUnit.ManagementSubjectId).Distinct()))
      .Select(subject => new { subject.Id, subject.Name })
      .ToDictionary(subject => subject.Id.ToString(), subject => subject.Name);

    var estateFilters = estateUnits
      .Select(estateUnit => estateUnit.Estate)
      .DistinctBy(estate => estate.Id)
      .OrderBy(estate => estate.Name)
      .ToDictionary(estate => estate.Id.ToString(), estate => estate.Name!);
      
    var cityFilters = estateUnits
      .Where(estateUnit => !string.IsNullOrEmpty(estateUnit.CityName))
      .Select(estateUnit => estateUnit.CityName!)
      .Distinct()
      .Order()
      .ToDictionary(cityName => cityName, cityName => cityName);

    _filterFields =
    [
      [
        new ReportGeneratorFilterField(
          FilterNames.ManagementSubjectId,
          _globalLocalizer[$"ReportFilter.{FilterNames.ManagementSubjectId}"],
          IsMandatory: true,
          CustomFieldType.SingleItemFromList,
          ValidValues: managementSubjectFilters),

        new ReportGeneratorFilterField(
          FilterNames.EstateId,
          _globalLocalizer[$"ReportFilter.{FilterNames.EstateId}"],
          IsMandatory: false,
          CustomFieldType.SingleItemFromList,
          ValidValues: estateFilters),

        new ReportGeneratorFilterField(
          FilterNames.CityName,
          _globalLocalizer[$"ReportFilter.{FilterNames.CityName}"],
          IsMandatory: false,
          CustomFieldType.SingleItemFromList,
          ValidValues: cityFilters),
      ]
    ];
  }

  protected override string GetReportFileNameWithoutExtension() => _localizer["ReportFileName"].Value;

  protected override async Task<PdfDocument> GeneratePdfReportAsync(Dictionary<string, ReportGeneratorFilter> filters)
  {
    var document = new Document();
    var lastSection = document.LastSection;
    var data = await GetInnerDataAsync(filters);

    ReportGeneratorUtils.StyleSection(lastSection, PageFormat.A2, Orientation.Portrait);

    ReportGeneratorUtils.StyleParagraph(
      lastSection.AddParagraph(_localizer["ReportTitle"].Value),
      fontSize: 25,
      bold: true,
      spaceAfter: 0.25,
      spaceBefore: 0.5,
      centered: true);

    ReportGeneratorUtils.StyleSection(lastSection, PageFormat.A2, Orientation.Portrait, leftMargin: 3);

    var managementSubject = await _subjectRepository
      .AsQueryable(new GetByIdSpec<Subject>(int.Parse(filters[FilterNames.ManagementSubjectId].StringValue!)))
      .Select(subject => new { subject.Id, subject.Name })
      .SingleAsync();

    ReportGeneratorUtils.StyleParagraph(
      lastSection.AddParagraph($"{_localizer["ManagementSubject"].Value}: {managementSubject.Name}"),
      fontSize: 11,
      bold: true,
      spaceAfter: 0.25);

    var table = new Table();
    AddColumns(table);

    var documentRow = table.AddRow();
    documentRow.Borders.Visible = false;

    AddHeaders(documentRow);
    ReportGeneratorUtils.StyleDefaultHeader(documentRow);

    lastSection.Add(table);

    foreach (var row in data)
    {
      var tableRow = table.AddRow();
      tableRow.Borders.Visible = false;

      if (row == data.First())
      {
        tableRow.TopPadding = ReportGeneratorUtils.GetUnit(0.4);
      }

      tableRow.Cells[0].AddParagraph(row.EstateInternalCode);
      tableRow.Cells[1].AddParagraph(row.InternalCode);
      tableRow.Cells[2].AddParagraph(row.UsageTypeName);
      tableRow.Cells[3].AddParagraph(row.Address);

      foreach (var contract in row.Contracts)
      {
        foreach (var counterpart in contract.Counterparts)
        {
          tableRow.Cells[4].AddParagraph(contract.InternalCode);
          tableRow.Cells[5].AddParagraph(counterpart.Name);
          tableRow.Cells[6].AddParagraph(contract.EffectStartDate.ToString());
          tableRow.Cells[7].AddParagraph(contract.TerminationDate?.ToString() ?? string.Empty);
        }
      }

      tableRow.BottomPadding = ReportGeneratorUtils.GetUnit(0.4);
    }

    table.SetEdge(0, 0, table.Columns.Count, table.Rows.Count, Edge.Box, BorderStyle.Single, 1, Colors.Black);

    var pdfRenderer = new PdfDocumentRenderer { Document = document };
    pdfRenderer.RenderDocument();

    return pdfRenderer.PdfDocument;

    void AddColumns(Table table)
    {
      table.AddColumn(ReportGeneratorUtils.GetUnit(3));
      table.AddColumn(ReportGeneratorUtils.GetUnit(3));
      table.AddColumn(ReportGeneratorUtils.GetUnit(7));
      table.AddColumn(ReportGeneratorUtils.GetUnit(10));
      table.AddColumn(ReportGeneratorUtils.GetUnit(3));
      table.AddColumn(ReportGeneratorUtils.GetUnit(5));
      table.AddColumn(ReportGeneratorUtils.GetUnit(3));
      table.AddColumn(ReportGeneratorUtils.GetUnit(3));
    }

    void AddHeaders(Row row)
    {
      row.Cells[0].AddParagraph(_localizer["EstateInternalCode"].Value);
      row.Cells[1].AddParagraph(_localizer["EstateUnitInternalCode"].Value);
      row.Cells[2].AddParagraph(_localizer["EstateUnitUsageTypeName"].Value);
      row.Cells[3].AddParagraph(_localizer["EstateUnitAddress"].Value);
      row.Cells[4].AddParagraph(_localizer["ContractCode"].Value);
      row.Cells[5].AddParagraph(_sharedLocalizer[$"ContractTerminator.{nameof(ContractTerminator.Tenant)}"].Value);
      row.Cells[6].AddParagraph(_localizer["ContractEffectStartDate"].Value);
      row.Cells[7].AddParagraph(_localizer["ContractTerminationDate"].Value);
    }
  }

  protected override async Task<XLWorkbook> GenerateExcelReportAsync(Dictionary<string, ReportGeneratorFilter> filters)
  {
    var workbook = new XLWorkbook();
    var worksheet = workbook.AddWorksheet(_localizer["ReportTitle"].Value);

    var rows = await GetInnerDataAsync(filters);

    var rowIndex = 1;
    worksheet.Cell(rowIndex, 1).Value = _localizer["EstateInternalCode"].Value;
    worksheet.Cell(rowIndex, 2).Value = _localizer["EstateUnitInternalCode"].Value;
    worksheet.Cell(rowIndex, 3).Value = _localizer["EstateUnitUsageTypeName"].Value;
    worksheet.Cell(rowIndex, 4).Value = _localizer["EstateUnitAddress"].Value;
    worksheet.Cell(rowIndex, 5).Value = _localizer["ContractCode"].Value;
    worksheet.Cell(rowIndex, 6).Value = _sharedLocalizer[$"ContractTerminator.{nameof(ContractTerminator.Tenant)}"].Value;
    worksheet.Cell(rowIndex, 7).Value = _localizer["ContractEffectStartDate"].Value;
    worksheet.Cell(rowIndex, 8).Value = _localizer["ContractTerminationDate"].Value;
    rowIndex++;

    foreach (var row in rows)
    {
      worksheet.Cell(rowIndex, 1).Value = row.EstateInternalCode;
      worksheet.Cell(rowIndex, 2).Value = row.InternalCode;
      worksheet.Cell(rowIndex, 3).Value = row.UsageTypeName;
      worksheet.Cell(rowIndex, 4).Value = row.Address;

      foreach (var contract in row.Contracts)
      {
        foreach (var counterpart in contract.Counterparts)
        {
          worksheet.Cell(rowIndex, 5).Value = contract.InternalCode;
          worksheet.Cell(rowIndex, 6).Value = counterpart.Name;
          worksheet.Cell(rowIndex, 7).Value = contract.EffectStartDate.ToString();
          worksheet.Cell(rowIndex, 8).Value = contract.TerminationDate?.ToString();
          rowIndex++;
        }
      }

      rowIndex++;
    }

    worksheet.Columns().AdjustToContents();
    var header = worksheet.Row(1).CellsUsed();
    header.Style.Fill.BackgroundColor = XLColor.FromColor(Constants.LIGHTGRAY);
    header.Style.Border.OutsideBorder = XLBorderStyleValues.Thin;
    header.Style.Font.Bold = true;

    return workbook;
  }

  private async Task<List<EstateUnitData>> GetInnerDataAsync(Dictionary<string, ReportGeneratorFilter> filters)
  {
    var contracts = await _contractRepository
      .AsQueryable(new WorkingContractSpec())
      .AsNoTracking()
      .Select(contract => new
      {
        contract.Id,
        contract.InternalCode,
        contract.EffectStartDate,
        contract.TerminationDate,
        contract.LocatedUnits,
        contract.Counterparts,
        contract.ManagementSubjectId
      })
      .ToListAsync();

    var subjects = await _subjectRepository
      .AsQueryable(
        new GetByIdsSpec<Subject>(contracts
          .SelectMany(contract => contract.Counterparts.Select(counterpart => counterpart.SubjectId))
          .Concat(contracts.Select(contract => contract.ManagementSubjectId))
          .Distinct()))
      .AsNoTracking()
      .Select(subject => new { subject.Id, subject.Name })
      .ToDictionaryAsync(subject => subject.Id);

    var managementSubjectId = int.Parse(filters[FilterNames.ManagementSubjectId].StringValue!);

    var estateUnitQuery = _estateUnitRepository
      .AsQueryable(
        new GetByIdsSpec<EstateUnit>(contracts
          .SelectMany(contract => contract.LocatedUnits.Select(locatedUnit => locatedUnit.EstateUnitId))
          .Distinct()))
      .AsNoTracking()
      .Where(estateUnit => estateUnit.ManagementSubjectId == managementSubjectId);

    if (filters.TryGetValue(FilterNames.EstateId, out var estateFilter))
    {
      var estateId = int.Parse(estateFilter.StringValue!);
      estateUnitQuery = estateUnitQuery.Where(estateUnit => estateUnit.Estate.Id == estateId);
    }

    if (filters.TryGetValue(FilterNames.CityName, out var cityNameFilter))
    {
      var cityName = cityNameFilter.StringValue!;
      estateUnitQuery = estateUnitQuery.Where(estateUnit => estateUnit.Address.CityName == cityName);
    }

    var estateUnits = await estateUnitQuery
      .Select(estateUnit => new
      {
        estateUnit.Id,
        estateUnit.InternalCode,
        EstateInternalCode = estateUnit.Estate.InternalCode,
        UsageTypeName = estateUnit.UsageType.Name!,
        Address = new
        {
          estateUnit.Address.Toponymy,
          estateUnit.Address.CityName,
          estateUnit.Address.Numbering,
          estateUnit.Address.LocalPostCode,
          estateUnit.Address.CountryISO
        }
      })
      .ToListAsync();

    var results = estateUnits
      .Select(estateUnit =>
      {
        var address = $"{estateUnit.Address.Toponymy}, {estateUnit.Address.CityName} - {estateUnit.Address.Numbering} - {estateUnit.Address.LocalPostCode} - {_sharedLocalizer.LocalizeCountry(estateUnit.Address.CountryISO!).Value}";

        var contractData = contracts
          .Where(contract => contract.LocatedUnits.Select(locatedUnit => locatedUnit.EstateUnitId).Contains(estateUnit.Id))
          .Select(contract => new ContractData(
            contract.InternalCode,
            contract.Counterparts
              .Select(counterpart => new CounterpartData(subjects[counterpart.SubjectId].Name))
              .OrderBy(counterpart => counterpart.Name)
              .ToArray(),
            contract.EffectStartDate,
            contract.TerminationDate))
          .OrderBy(contract => contract.InternalCode)
          .ToArray();

        return new EstateUnitData(
          estateUnit.EstateInternalCode,
          estateUnit.InternalCode,
          estateUnit.UsageTypeName,
          address,
          contractData);
      })
      .OrderBy(estateUnit => estateUnit.EstateInternalCode)
      .ThenBy(estateUnit => estateUnit.InternalCode)
      .ToList();

    return results;
  }

  private record EstateUnitData(
    string EstateInternalCode,
    string InternalCode,
    string UsageTypeName,
    string Address,
    ContractData[] Contracts);

  private record ContractData(
    string InternalCode,
    CounterpartData[] Counterparts,
    DateOnly EffectStartDate,
    DateOnly? TerminationDate);

  private record CounterpartData(string Name);
}

