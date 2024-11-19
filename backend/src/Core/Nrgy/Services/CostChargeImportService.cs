using System.Collections.Generic;
using System.Formats.Asn1;
using System.Globalization;
using ClosedXML.Excel;
using CsvHelper;
using CsvHelper.Configuration;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Localization;
using RealGimm.Core.Nrgy.CostChargeAggregate;
using RealGimm.Core.Nrgy.ReadingAggregate;
using RealGimm.Core.Nrgy.UtilityServiceAggregate;
using RealGimm.Core.Shared.Specifications;
using RealGimm.SharedKernel;
using ValidationException = RealGimm.SharedKernel.Exceptions.ValidationException;

namespace RealGimm.Core.Nrgy.Services;

public sealed class CostChargeImportService
{
  private const string CSV_SEPARATOR = ";";

  public readonly IStringLocalizer<CostChargeImportService> _localizer;
  public readonly IStringLocalizer<ErrorCode> _errorCodeLocalizer;
  public readonly IConfiguration _configuration;
  public readonly IRepository<UtilityService> _utilityServiceRepository;
  public readonly IRepository<CostCharge> _costChargeRepository;

  public CostChargeImportService(
    IStringLocalizer<CostChargeImportService> localizer,
    IStringLocalizer<ErrorCode> errorCodeLocalizer,
    IConfiguration configuration,
    IRepository<UtilityService> utilityServiceRepository,
    IRepository<CostCharge> costChargeRepository)
  {
    _localizer = localizer;
    _errorCodeLocalizer = errorCodeLocalizer;
    _configuration = configuration;
    _utilityServiceRepository = utilityServiceRepository;
    _costChargeRepository = costChargeRepository;
  }

  public FileCacheEntry GenerateExcelTemplate()
  {
    using var workbook = GenerateTemplateWorkbook();

    var sharedCacheFilename = Guid.NewGuid().ToString();
    var fileName = _localizer["Template.Excel.DownloadFileName"];
    var fileEntry = new FileCacheEntry(fileName, MimeTypes.OO_SPREADSHEET, sharedCacheFilename);

    using var stream = File.OpenWrite(Path.Combine(_configuration.CachePath(), sharedCacheFilename));
    workbook.SaveAs(stream);

    return fileEntry;
  }

  public FileCacheEntry GenerateCsvTemplate()
  {
    using var workbook = GenerateTemplateWorkbook();

    var sharedCacheFilename = Guid.NewGuid().ToString();
    var fileName = _localizer["Template.Csv.DownloadFileName"];
    var fileEntry = new FileCacheEntry(fileName, MimeTypes.CSV, sharedCacheFilename);

    using var stream = File.OpenWrite(Path.Combine(_configuration.CachePath(), sharedCacheFilename));
    using var csvWriter = new CsvWriter(new StreamWriter(stream), CreateCsvConfiguration());

    foreach (var worksheet in workbook.Worksheets)
    {
      foreach (var row in worksheet.RowsUsed())
      {
        foreach (var cell in row.Cells(1, worksheet.ColumnsUsed().Count()))
        {
          csvWriter.WriteField(cell.Value);
        }

        csvWriter.NextRecord();
      }
    }

    return fileEntry;
  }

  public async Task<int> ImportAsyncFromExcel(XLWorkbook workbook, CancellationToken cancellationToken = default)
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

    var costChargeData = rows
      .Select(row =>
      {
        try
        {
          return ParseCostChargeData(row.RowNumber(), index => row.Cell(index + 1).Value.ToString());
        }
        catch
        {
          throw new ValidationException(ErrorCode.InvalidRowFormat.ToValidationError(_errorCodeLocalizer, row.RowNumber()));
        }
      })
      .ToArray();

    return await ImportAsync(costChargeData, cancellationToken);
  }

  public async Task<int> ImportAsyncFromCsv(TextReader textReaded, CancellationToken cancellationToken = default)
  {
    ArgumentNullException.ThrowIfNull(textReaded);

    var costChargeData = new List<CostChargeData>();
    var rowNumber = 1;

    try
    {
      using var csvReader = new CsvReader(textReaded, CreateCsvConfiguration());
      csvReader.Read();
      csvReader.ReadHeader();

      rowNumber = 2;

      while (csvReader.Read())
      {
        var data = ParseCostChargeData(rowNumber, csvReader.GetField);
        costChargeData.Add(data);

        rowNumber++;
      }
    }
    catch
    {
      throw new ValidationException(ErrorCode.InvalidRowFormat.ToValidationError(_errorCodeLocalizer, rowNumber));
    }

    return await ImportAsync(costChargeData.ToArray(), cancellationToken);
  }

  private async Task<int> ImportAsync(CostChargeData[] costChargeData, CancellationToken cancellationToken = default)
  {
    var utilityServices = await _utilityServiceRepository
      .AsQueryable(
        new GetByInternalCodesSpec<UtilityService>(costChargeData.Select(data => data.UtilityServiceInteralCode).Distinct()))
      .Include(utilityService => utilityService.UtilityType)
      .ToDictionaryAsync(utilityService => utilityService.InternalCode, cancellationToken);

    var importedCostCharges = costChargeData
      .Select(data => CreateCostCharge(data, utilityServices))
      .ToList();

    await _costChargeRepository.AddRangeAsync(importedCostCharges, cancellationToken);

    return importedCostCharges.Count;
  }

  private XLWorkbook GenerateTemplateWorkbook()
  {
    var workbook = new XLWorkbook();
    var worksheet = workbook.AddWorksheet(_localizer["Template.Excel.WorksheetName"]);

    worksheet.Cell(1, 1).Value = _localizer["Template.Headers.UtilityServiceInteralCode"].Value;
    worksheet.Cell(1, 2).Value = _localizer["Template.Headers.TotalAmount"].Value;
    worksheet.Cell(1, 3).Value = _localizer["Template.Headers.PeriodStart"].Value;
    worksheet.Cell(1, 4).Value = _localizer["Template.Headers.PeriodEnd"].Value;
    worksheet.Cell(1, 5).Value = _localizer["Template.Headers.ReferenceDate"].Value;
    worksheet.Cell(1, 6).Value = _localizer["Template.Headers.DueDate"].Value;
    worksheet.Cell(1, 7).Value = _localizer["Template.Headers.InvoiceNumber"].Value;
    worksheet.Cell(1, 8).Value = _localizer["Template.Headers.TotalVATAmount"].Value;
    worksheet.Cell(1, 9).Value = _localizer["Template.Headers.InvoicedConsumptionAmount"].Value;
    worksheet.Cell(1, 10).Value = _localizer["Template.Headers.ActualConsumptionSince"].Value;
    worksheet.Cell(1, 11).Value = _localizer["Template.Headers.ActualConsumptionUntil"].Value;
    worksheet.Cell(1, 12).Value = _localizer["Template.Headers.ActualConsumptionValues"].Value;
    worksheet.Cell(1, 13).Value = _localizer["Template.Headers.ExpectedConsumptionSince"].Value;
    worksheet.Cell(1, 14).Value = _localizer["Template.Headers.ExpectedConsumptionUntil"].Value;
    worksheet.Cell(1, 15).Value = _localizer["Template.Headers.ExpectedConsumptionValues"].Value;

    for (int i = 1; i <= 5; i++)
    {
      var row = worksheet.Row(i + 1);
      row.Cell(1).Value = (i < 3) ? "F00001" : "F00002";
      row.Cell(2).Value = (i * 100m).ToString(CultureInfo.InvariantCulture);
      row.Cell(3).Value = new DateOnly(2024, 01, 01).ToString(CultureInfo.InvariantCulture);
      row.Cell(4).Value = new DateOnly(2024, 09, 25).ToString(CultureInfo.InvariantCulture);
      row.Cell(5).Value = new DateOnly(2024, 06, 13).ToString(CultureInfo.InvariantCulture);
      row.Cell(6).Value = new DateOnly(2025, 01, 09).ToString(CultureInfo.InvariantCulture);
      row.Cell(7).Value = i.ToString(CultureInfo.InvariantCulture);
      row.Cell(8).Value = (i * 20m).ToString(CultureInfo.InvariantCulture);
      row.Cell(9).Value = 400m.ToString(CultureInfo.InvariantCulture);
      row.Cell(10).Value = (i % 2) == 0 ? new DateOnly(2024, 02, 01).ToString(CultureInfo.InvariantCulture) : Blank.Value;
      row.Cell(11).Value = (i % 2) == 0 ? new DateOnly(2024, 03, 01).ToString(CultureInfo.InvariantCulture) : Blank.Value;
      row.Cell(12).Value = (i % 2) == 0 ? string.Join(',', new[] { 10, 20, 30 }) : Blank.Value;
      row.Cell(13).Value = (i % 2) == 0 ? new DateOnly(2024, 04, 01).ToString(CultureInfo.InvariantCulture) : Blank.Value;
      row.Cell(14).Value = (i % 2) == 0 ? new DateOnly(2024, 05, 01).ToString(CultureInfo.InvariantCulture) : Blank.Value;
      row.Cell(15).Value = (i % 2) == 0 ? string.Join(',', new[] { 11, 15, 30 }) : Blank.Value;
    }

    worksheet.Columns().AdjustToContents();

    var headerRow = worksheet.Row(1).CellsUsed();
    headerRow.Style.Fill.BackgroundColor = XLColor.FromColor(Constants.LIGHTGRAY);
    headerRow.Style.Border.OutsideBorder = XLBorderStyleValues.Thin;
    headerRow.Style.Font.Bold = true;

    return workbook;
  }

  private static CsvConfiguration CreateCsvConfiguration()
    => new(CultureInfo.InvariantCulture)
    {
      Delimiter = CSV_SEPARATOR.ToString()
    };

  private static CostChargeData ParseCostChargeData(int rowNumber, Func<int, string> getCellValue)
  {
    return new CostChargeData()
    {
      RowNumber = rowNumber,
      UtilityServiceInteralCode = getCellValue(0),
      TotalAmount = decimal.Parse(getCellValue(1), CultureInfo.InvariantCulture),
      PeriodStart = DateOnly.Parse(getCellValue(2), CultureInfo.InvariantCulture),
      PeriodEnd = DateOnly.Parse(getCellValue(3), CultureInfo.InvariantCulture),
      ReferenceDate = DateOnly.Parse(getCellValue(4), CultureInfo.InvariantCulture),
      DueDate = DateOnly.Parse(getCellValue(5), CultureInfo.InvariantCulture),
      InvoiceNumber = getCellValue(6),
      TotalVATAmount = decimal.Parse(getCellValue(7), CultureInfo.InvariantCulture),
      InvoicedConsumptionAmount = decimal.Parse(getCellValue(8), CultureInfo.InvariantCulture),

      ActualConsumptionSince = string.IsNullOrWhiteSpace(getCellValue(9))
        ? null
        : DateOnly.Parse(getCellValue(9), CultureInfo.InvariantCulture),

      ActualConsumptionUntil = string.IsNullOrWhiteSpace(getCellValue(10))
        ? null
        : DateOnly.Parse(getCellValue(10), CultureInfo.InvariantCulture),

      ActualConsumptionValues = string.IsNullOrWhiteSpace(getCellValue(11))
        ? null
        : getCellValue(11)
            .Split(',')
            .Select(value => string.IsNullOrWhiteSpace(value)
              ? (decimal?)null
              : decimal.Parse(value, CultureInfo.InvariantCulture))
            .ToArray(),

      ExpectedConsumptionSince = string.IsNullOrWhiteSpace(getCellValue(12))
        ? null
        : DateOnly.Parse(getCellValue(12), CultureInfo.InvariantCulture),

      ExpectedConsumptionUntil = string.IsNullOrWhiteSpace(getCellValue(13))
        ? null
        : DateOnly.Parse(getCellValue(13), CultureInfo.InvariantCulture),

      ExpectedConsumptionValues = string.IsNullOrWhiteSpace(getCellValue(14))
        ? null
        : getCellValue(14)
            .Split(',')
            .Select(value => string.IsNullOrWhiteSpace(value)
              ? (decimal?)null
              : decimal.Parse(value, CultureInfo.InvariantCulture))
            .ToArray(),
    };
  }

  private CostCharge CreateCostCharge(CostChargeData data, Dictionary<string, UtilityService> allUtilityServices)
  {
    if (!allUtilityServices.TryGetValue(data.UtilityServiceInteralCode, out var utilityService))
    {
      throw new ValidationException(
        ErrorCode.ImportErrorsInRow.ToValidationError(
          _errorCodeLocalizer,
          data.RowNumber,
          string.Join(", ", ErrorCode.UtilityServiceNotFound.ToValidationError(_errorCodeLocalizer).ErrorMessage)));
    }

    var costCharge = new CostCharge();
    costCharge.SetService(utilityService);
    costCharge.SetTotalAmount(data.TotalAmount);
    costCharge.SetPeriod(data.PeriodStart, data.PeriodEnd);
    costCharge.SetReferenceDate(data.ReferenceDate);
    costCharge.SetDueDate(data.DueDate);
    costCharge.SetInvoiceNumber(data.InvoiceNumber);
    costCharge.SetTotalVATAmount(data.TotalVATAmount);

    if (data.ActualConsumptionSince is null &&
      data.ActualConsumptionUntil is null &&
      data.ActualConsumptionValues is null)
    {
      costCharge.SetActualConsumption(null);
    }
    else if (data.ActualConsumptionSince is not null &&
      data.ActualConsumptionUntil is not null &&
      data.ActualConsumptionValues is not null)
    {
      if (data.ActualConsumptionValues.Length != utilityService.UtilityType.TimeOfUseRateCount)
      {
        throw new ValidationException(
          ErrorCode.ImportErrorsInRow.ToValidationError(
            _errorCodeLocalizer,
            data.RowNumber,
            string.Join(", ", ErrorCode.InvalidActualConsumptionValuesCount.ToValidationError(_errorCodeLocalizer).ErrorMessage)));
      }

      var actualConsumption = new CostChargeConsumption();
      actualConsumption.SetSince(data.ActualConsumptionSince.Value);
      actualConsumption.SetUntil(data.ActualConsumptionUntil.Value);
      actualConsumption.Values.AddRange(data.ActualConsumptionValues.Select((value, index) =>
      {
        var readingValue = new ReadingValue();
        readingValue.SetValues(index, value);

        return readingValue;
      }));

      costCharge.SetActualConsumption(actualConsumption);
    }
    else
    {
      throw new ValidationException(
        ErrorCode.ImportErrorsInRow.ToValidationError(
          _errorCodeLocalizer,
          data.RowNumber,
          string.Join(", ", ErrorCode.InvalidaData.ToValidationError(_errorCodeLocalizer).ErrorMessage)));
    }

    if (data.ExpectedConsumptionSince is null &&
      data.ExpectedConsumptionUntil is null &&
      data.ExpectedConsumptionValues is null)
    {
      costCharge.SetExpectedConsumption(null);
    }
    else if (data.ExpectedConsumptionSince is not null &&
      data.ExpectedConsumptionUntil is not null &&
      data.ExpectedConsumptionValues is not null)
    {
      if (data.ExpectedConsumptionValues.Length != utilityService.UtilityType.TimeOfUseRateCount)
      {
        throw new ValidationException(
          ErrorCode.ImportErrorsInRow.ToValidationError(
            _errorCodeLocalizer,
            data.RowNumber,
            string.Join(", ", ErrorCode.InvalidExpectedConsumptionValuesCount.ToValidationError(_errorCodeLocalizer).ErrorMessage)));
      }

      var expectedConsumption = new CostChargeConsumption();
      expectedConsumption.SetSince(data.ExpectedConsumptionSince.Value);
      expectedConsumption.SetUntil(data.ExpectedConsumptionUntil.Value);
      expectedConsumption.Values.AddRange(data.ExpectedConsumptionValues.Select((value, index) =>
      {
        var readingValue = new ReadingValue();
        readingValue.SetValues(index, value);
        return readingValue;
      }));

      costCharge.SetExpectedConsumption(expectedConsumption);
    }
    else
    {
      throw new ValidationException(
        ErrorCode.ImportErrorsInRow.ToValidationError(
          _errorCodeLocalizer,
          data.RowNumber,
          string.Join(", ", ErrorCode.InvalidaData.ToValidationError(_errorCodeLocalizer).ErrorMessage)));
    }

    if (costCharge.Validate().Any())
    {
      throw new ValidationException(
        ErrorCode.ImportErrorsInRow.ToValidationError(
          _errorCodeLocalizer,
          data.RowNumber,
          string.Join(", ", ErrorCode.InvalidaData.ToValidationError(_errorCodeLocalizer).ErrorMessage)));
    }

    return costCharge;
  }

  private record CostChargeData
  {
    public required int RowNumber { get; init; }
    public required string UtilityServiceInteralCode { get; init; }
    public required decimal TotalAmount { get; init; }
    public required DateOnly PeriodStart { get; init; }
    public required DateOnly PeriodEnd { get; init; }
    public required DateOnly ReferenceDate { get; init; }
    public required DateOnly DueDate { get; init; }
    public required string InvoiceNumber { get; init; }
    public required decimal TotalVATAmount { get; init; }
    public required decimal InvoicedConsumptionAmount { get; init; }
    public required DateOnly? ActualConsumptionSince { get; init; }
    public required DateOnly? ActualConsumptionUntil { get; init; }
    public required decimal?[]? ActualConsumptionValues { get; init; }
    public required DateOnly? ExpectedConsumptionSince { get; init; }
    public required DateOnly? ExpectedConsumptionUntil { get; init; }
    public required decimal?[]? ExpectedConsumptionValues { get; init; }
  }
}
