using RealGimm.SharedKernel.Interfaces;
using RealGimm.Core.Asst.CatalogueItemAggregate;
using RealGimm.Core.Asst.Interfaces;
using RealGimm.Core.Asst.CatalogueItemAggregate.Specifications;
using RealGimm.SharedKernel;
using ClosedXML.Excel;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Configuration;

namespace RealGimm.Core.Asst.Services;

public class CatalogueService : ICatalogueService
{
  public required IStringLocalizer<CatalogueService> _localizer { private get; init; }
  public required IRepository<CatalogueItem> _itemRepository { private get; init; }
  public required IConfiguration configuration { private get; init; }

  public async Task<List<CatalogueOutput>> GetCatalogues(CancellationToken cancellationToken = default)
  {
    var result = await _itemRepository.ListAsync(new CatalogueItemIncludeAllSpec(), cancellationToken);
    var groupedResult = result.GroupBy(e => new
    {
      e.Estate.Id,
      e.Estate.InternalCode,
      CategoryName = e.CatalogueType.Category?.Name,
      SubCategoryName = e.CatalogueType.SubCategory?.Name,
      TypeId = e.CatalogueType.Id,
      TypeName = e.CatalogueType.Name
    }).Select(g => new CatalogueOutput(g.Key.Id, g.Key.InternalCode, g.Key.TypeId, g.Key.CategoryName, g.Key.SubCategoryName, g.Key.TypeName, g.Count()));

    return groupedResult.ToList();
  }

  public async Task<FileCacheEntry> ExportToExcel(
    ICollection<CatalogueOutput> catalogues,
    CancellationToken cancellationToken = default)
  {
    using var workbook = new XLWorkbook();
    var worksheet = workbook.Worksheets.Add(_localizer["WorksheetName"]);

    WriteHeaders(worksheet);

    for (var i = 0; i < catalogues.Count; i++)
    {
      cancellationToken.ThrowIfCancellationRequested();

      var item = catalogues.ElementAt(i);
      var row = i + 2;

      WriteRow(worksheet, item, row);
    }

    worksheet.Columns().AdjustToContents();

    var sharedCacheFilename = Guid.NewGuid().ToString();

    using var stream = File.OpenWrite(
      Path.Combine(configuration.CachePath(),
        sharedCacheFilename)
    );

    workbook.SaveAs(stream);

    var fileEntry = new FileCacheEntry(_localizer["DownloadFileName"], MimeTypes.OO_SPREADSHEET, sharedCacheFilename);
    return await Task.FromResult(fileEntry);
  }

  public string[] GetExcelHeaders() => new[]
    {
      "EstateInternalCode",
      "CatalogueCategory",
      "CatalogueSubCategory",
      "CatalogueType",
      "CatalogueTypeCount"
    };

  private void WriteHeaders(IXLWorksheet worksheet)
  {
    var headers = GetExcelHeaders().Select(header => _localizer[header].Value).ToArray();
    worksheet.Cell(1, 1).Value = headers[0];
    worksheet.Cell(1, 2).Value = headers[1];
    worksheet.Cell(1, 3).Value = headers[2];
    worksheet.Cell(1, 4).Value = headers[3];
    worksheet.Cell(1, 5).Value = headers[4];

    var cellsStyle = worksheet.Cells().Style;

    cellsStyle.Font.Bold = true;
    cellsStyle.Border.OutsideBorder = XLBorderStyleValues.Thin;
    cellsStyle.Fill.BackgroundColor = XLColor.FromColor(Constants.LIGHTGRAY);
  }

  private static void WriteRow(IXLWorksheet worksheet, CatalogueOutput catalogue, int rowNumber)
  {
    worksheet.Cell(rowNumber, 1).Value = catalogue.EstateInternalCode;
    worksheet.Cell(rowNumber, 2).Value = catalogue.CatalogueCategory;
    worksheet.Cell(rowNumber, 3).Value = catalogue.CatalogueSubCategory;
    worksheet.Cell(rowNumber, 4).Value = catalogue.CatalogueType;
    worksheet.Cell(rowNumber, 5).Value = catalogue.CatalogueTypeCount.ToString();
  }
}
