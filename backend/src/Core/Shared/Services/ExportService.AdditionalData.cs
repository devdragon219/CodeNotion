using ClosedXML.Excel;

namespace RealGimm.Core.Shared.Services;

public abstract partial class ExportService<TEntity, TData, TSelf> where TData : notnull
  where TSelf : ExportService<TEntity, TData, TSelf>
{
  public record AdditionalData(
    Dictionary<string, (XLCellValue Value, Action<IXLCell>? FormatCell)> MappedData,
    IEnumerable<XLCellValue> UnmappedData);

  public delegate ValueTask<XLCellValue> CellDataSelector(TData data);
}
