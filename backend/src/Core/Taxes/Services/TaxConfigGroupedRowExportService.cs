using ClosedXML.Excel;
using RealGimm.Core.Common.CityAggregate;
using RealGimm.Core.Common.TaxConfigAggregate;
using RealGimm.Core.Shared.Services;
using RealGimm.Core.Taxes.Tables;
using RealGimm.SharedKernel;

namespace RealGimm.Core.Taxes.Services;

public sealed class TaxConfigGroupedRowExportService : ExportService<TaxConfigGroupedRow, TaxConfigGroupedRowExportService>
{
  protected override Dictionary<string, Func<TaxConfigGroupedRow, XLCellValue>> CreateExcelDataSelector()
  {
    var result = new Dictionary<string, Func<TaxConfigGroupedRow, XLCellValue>>
    {
      [nameof(TaxConfigGroupedRow.Year)] = tcg => tcg.Year,
      [$"{nameof(TaxConfigGroupedRow.City)}.{nameof(City.Name)}"] = tcg => tcg.City?.Name,
      [$"{nameof(TaxConfigGroupedRow.City)}.{nameof(City.CountyName)}"] = tcg => tcg.City?.CountyName
    };

    return result;
  }

  protected override IEnumerable<string> GetAdditionalHeaders(IList<TaxConfigGroupedRow> items)
   => items.SelectMany(row => row.OtherColumns.Select(column => Localizer[column.Key].Value)).Distinct();

  protected override AdditionalData SelectAdditionalExcelData(TaxConfigGroupedRow data)
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
