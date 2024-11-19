using ClosedXML.Excel;

namespace RealGimm.Core.Prop.Services;

public sealed partial class BillItemTypeExportService
{
  public record Data
  {
    public required XLCellValue InternalCode { get; init; }
    public required XLCellValue Description { get; init; }
    public required XLCellValue Applicability { get; init; }
    public required XLCellValue Sign { get; init; }
    public required XLCellValue DefaultAccountingItem { get; init; }
    public required XLCellValue SubjectAC { get; init; }
    public required XLCellValue ExemptAC { get; init; }
    public required XLCellValue NonTaxableAC { get; init; }
    public required XLCellValue SubjectPC { get; init; }
    public required XLCellValue ExemptPC { get; init; }
    public required XLCellValue NonTaxablePC { get; init; }
  }
}
