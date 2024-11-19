using ClosedXML.Excel;

namespace RealGimm.Core.Fclt.Services;

public sealed partial class TicketChecklistTemplateExportService
{
  public record Data
  {
    public required XLCellValue InternalCode { get; init; }
    public required XLCellValue Name { get; init; }
    public required XLCellValue Category { get; init; }
    public required XLCellValue SubCategory { get; init; }
    public required XLCellValue Type { get; init; }
  }
}
