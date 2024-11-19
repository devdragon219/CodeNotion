using ClosedXML.Excel;
using RealGimm.Core.Common.TaxConfigAggregate;
using RealGimm.Core.Shared.Services;
using RealGimm.Core.Taxes.Tables;
using RealGimm.SharedKernel;

namespace RealGimm.Core.Taxes.Services;

public sealed class TaxConfigGenericRowExportService : ExportService<TaxConfigGenericRow, TaxConfigGenericRowExportService>
{
  protected override Dictionary<string, Func<TaxConfigGenericRow, XLCellValue>> CreateExcelDataSelector()
    => new Dictionary<string, Func<TaxConfigGenericRow, XLCellValue>>
    {
      [nameof(TaxConfigGenericRow.Year)] = tcg => tcg.Year
    };

  protected override IEnumerable<string> GetAdditionalHeaders(IList<TaxConfigGenericRow> items)
   => items.SelectMany(row => row.OtherColumns.Select(column => Localizer[column.Key].Value)).Distinct();

  protected override AdditionalData SelectAdditionalExcelData(TaxConfigGenericRow data)
  {
    var additionalData = new Dictionary<string, (XLCellValue Value, Action<IXLCell>? FormatCell)>();

    foreach (var column in data.OtherColumns)
    {
      var key = Localizer[column.Key].Value;

      var value = column.Type switch
      {
        SubValueType.String or SubValueType.City => column.StringValue,
        SubValueType.Number or SubValueType.Currency => column.NumberValue,
        SubValueType.Boolean => column.BooleanValue is null ? Blank.Value : LocalizeBool(column.BooleanValue.Value),
        SubValueType.Date => column.DateValue?.ToShortDateString(),

        _ => throw new NotSupportedException()
      };

      var formatCell = (IXLCell cell) =>
      {
        if (column.Type is SubValueType.Currency)
        {
          cell.Style.NumberFormat.Format = Constants.EXPORT_NUMBERFORMAT_CURRENCY;
        }
      };

      additionalData.Add(key, (value, formatCell));
    }

    return new AdditionalData(additionalData, []);
  }
}
