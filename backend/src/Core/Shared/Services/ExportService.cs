using System.Reflection;
using System.Text.Json;
using ClosedXML.Excel;
using Elders.Iso3166;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Localization;
using RealGimm.Core.Extensions;
using RealGimm.Core.Resources;
using RealGimm.Core.Shared.Interfaces;
using RealGimm.SharedKernel;

namespace RealGimm.Core.Shared.Services;

public abstract partial class ExportService<TEntity, TData, TSelf> : IExportService<TEntity>
  where TData : notnull
  where TSelf : ExportService<TEntity, TData, TSelf>
{
  public required IStringLocalizer<TSelf> Localizer { protected get; init; }
  public required IStringLocalizer<SharedResources> SharedLocalizer { protected get; init; }
  public required IConfiguration configuration { private get; init; }

  public async Task<FileCacheEntry> ExportToExcelAsync(IEnumerable<TEntity> entities, CancellationToken cancellationToken = default)
  {
    var items = await SelectItemsAsync(entities, cancellationToken);
    return ExportToExcel(items, GetDefaultWorksheetName(items), GetDefaultDownloadFileName(items), cancellationToken);
  }

  public async Task<FileCacheEntry> ExportToExcelAsync(
    IEnumerable<TEntity> entities,
    string worksheetName,
    string fileName,
    CancellationToken cancellationToken = default)
    => ExportToExcel(await SelectItemsAsync(entities, cancellationToken), worksheetName, fileName, cancellationToken);

  public IEnumerable<string> GetHeaderTranslationKeys() => CreateExcelDataSelector().Keys;

  protected abstract Dictionary<string, Func<TData, XLCellValue>> CreateExcelDataSelector();

  protected virtual string GetDefaultWorksheetName(IList<TData> items) => Localizer["WorksheetName"];

  protected virtual string GetDefaultDownloadFileName(IList<TData> items) => Localizer["DownloadFileName"];

  protected virtual IEnumerable<string> GetAdditionalHeaders(IList<TData> items) => [];
  
  protected virtual string? GetHeaderPrecedingMappedAdditionalData() => null;

  protected virtual AdditionalData SelectAdditionalExcelData(TData data) => new([], []);

  protected XLCellValue LocalizeEnumValue<TEnum>(TEnum value)
    where TEnum : struct, Enum
    => SharedLocalizer.LocalizeEnumValue(value).Value;

  protected XLCellValue LocalizeEnumValue<TEnum>(TEnum? value)
    where TEnum : struct, Enum
  {
    var localizedString = SharedLocalizer.LocalizeEnumValue(value);

    return localizedString is null
      ? Blank.Value
      : localizedString.Value;
  }

  protected XLCellValue LocalizeBool(bool value) => SharedLocalizer[$"{nameof(Boolean)}.{value}"].Value;

  protected abstract Task<IList<TData>> SelectItemsAsync(
    IEnumerable<TEntity> entities,
    CancellationToken cancellationToken = default);

  protected virtual void FormatWorksheet(IXLWorksheet worksheet)
  {
    worksheet.Columns().AdjustToContents();

    var headerRow = worksheet.Row(1).CellsUsed();
    ApplyHeaderStyle(headerRow);

    static void ApplyHeaderStyle(IXLCells cells)
    {
      cells.Style.Fill.BackgroundColor = XLColor.FromColor(Constants.LIGHTGRAY);
      cells.Style.Border.OutsideBorder = XLBorderStyleValues.Thin;
      cells.Style.Font.Bold = true;
    }
  }

  private FileCacheEntry ExportToExcel(
    IList<TData> items,
    string worksheetName,
    string fileName,
    CancellationToken cancellationToken = default)
  {
    using var workbook = new XLWorkbook();
    var worksheet = workbook.AddWorksheet(worksheetName);

    FillWorksheet(worksheet, items, cancellationToken);
    FormatWorksheet(worksheet);

    var sharedCacheFilename = Guid.NewGuid().ToString();
    var fileEntry = new FileCacheEntry(fileName, MimeTypes.OO_SPREADSHEET, sharedCacheFilename);

    using var stream = File.OpenWrite(Path.Combine(configuration.CachePath(), sharedCacheFilename));
    workbook.SaveAs(stream);

    return fileEntry;
  }

  private void FillWorksheet(IXLWorksheet worksheet, IList<TData> items, CancellationToken cancellationToken = default)
  {
    var excelData = CreateExcelDataSelector().ToList();
    var headerPrecedingMappedAdditionalData = GetHeaderPrecedingMappedAdditionalData();
    
    var additionalDataIndex = headerPrecedingMappedAdditionalData is null
      ? excelData.Count
      : excelData.FindIndex(pair => pair.Key == headerPrecedingMappedAdditionalData) + 1;

    for (int i = 0; i < additionalDataIndex; i++)
    {
      cancellationToken.ThrowIfCancellationRequested();
      FillColumn(column: i + 1, excelData[i].Key, excelData[i].Value);
    }

    var additionalHeaders = GetAdditionalHeaders(items).ToArray();
    for (int i = 0; i < additionalHeaders.Length; i++)
    {
      worksheet.Cell(row: 1, column: additionalDataIndex + i + 1).Value = additionalHeaders[i];
    }

    for (int i = 0; i < items.Count; i++)
    {
      cancellationToken.ThrowIfCancellationRequested();
      
      var row = i + 2;
      var mappedAdditionalExcelData = SelectAdditionalExcelData(items[i]).MappedData;

      for (int j = 0; j < additionalHeaders.Length; j++)
      {
        var column = additionalDataIndex + j + 1;
        var cell = worksheet.Cell(row, column);

        if (mappedAdditionalExcelData.TryGetValue(additionalHeaders[j], out var cellData))
        {
          cell.Value = cellData.Value;
          cellData.FormatCell?.Invoke(cell);
        }
      }
    }

    for (int i = additionalDataIndex; i < excelData.Count; i++)
    {
      cancellationToken.ThrowIfCancellationRequested();
      FillColumn(column: additionalHeaders.Length + i + 1, excelData[i].Key, excelData[i].Value);
    }

    for (int i = 0; i < items.Count; i++)
    {
      cancellationToken.ThrowIfCancellationRequested();

      var row = i + 2;
      var unmappedAdditionalExcelData = SelectAdditionalExcelData(items[i]).UnmappedData;
      var unmappedAdditionalExcelDataEnumerator = unmappedAdditionalExcelData.GetEnumerator();

      for (int j = 0; unmappedAdditionalExcelDataEnumerator.MoveNext(); j++)
      {
        var column = excelData.Count + additionalHeaders.Length + j + 1;
        worksheet.Cell(row, column).Value = unmappedAdditionalExcelDataEnumerator.Current;
      }
    }

    void FillColumn(int column, string headerKey, Func<TData, XLCellValue> cellValueSelector) 
    {
      worksheet.Cell(row: 1, column).Value = Localizer[headerKey].Value;

      for (int i = 0; i < items.Count; i++)
      {
        var row = i + 2;
        worksheet.Cell(row, column).Value = cellValueSelector(items[i]);
      }
    }
  }
}

public abstract class ExportService<TEntity, TSelf> : ExportService<TEntity, TEntity, TSelf>
  where TEntity : notnull
  where TSelf : ExportService<TEntity, TSelf>
{
  protected sealed override Task<IList<TEntity>> SelectItemsAsync(
    IEnumerable<TEntity> entities,
    CancellationToken cancellationToken = default)
    => Task.FromResult<IList<TEntity>>(entities.ToList());
}
