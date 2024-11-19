using ClosedXML.Excel;

namespace RealGimm.Core.Fclt.Services;

public sealed partial class PriceListArticleExportService
{
  public record Data
  {
    public required XLCellValue InternalCode { get; init; }
    public required XLCellValue Name { get; init; }
    public required XLCellValue CatalogueTypes { get; init; }
    public required XLCellValue PriceList { get; init; }
    public required XLCellValue Since { get; init; }
    public required XLCellValue Until { get; init; }
    public required XLCellValue MeasurementUnit { get; init; }
    public required XLCellValue Price { get; init; }
  }
}
