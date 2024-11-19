using ClosedXML.Excel;
using RealGimm.Core.Common.TaxConfigAggregate;
using RealGimm.Core.Shared.Services;
using RealGimm.Core.Taxes.SubTables;
using RealGimm.Core.Taxes.Tables;
using RealGimm.SharedKernel;

namespace RealGimm.Core.Taxes.Services;

public sealed class TaxConfigGroupedRateExportService : ExportService<TaxConfigGroupedRateSubTableRow, TaxConfigGroupedRateExportService>
{
  protected override Dictionary<string, Func<TaxConfigGroupedRateSubTableRow, XLCellValue>> CreateExcelDataSelector()
    => new Dictionary<string, Func<TaxConfigGroupedRateSubTableRow, XLCellValue>>()
    {
      [nameof(TaxConfigGroupedRateSubTableRow.TaxConfig.Year)] = row
        => row.TaxConfig.Year,

      [$"{nameof(TaxConfigGroupedRateSubTableRow.City)}.{nameof(TaxConfigGroupedRateSubTableRow.City.Name)}"] = row
        => row.City?.Name,
      
      [$"{nameof(TaxConfigGroupedRateSubTableRow.City)}.{nameof(TaxConfigGroupedRateSubTableRow.City.CountyName)}"] = row
        => row.City?.CountyName,

      [nameof(TaxConfigGroupedRateSubTableRow.Code)] = row
        => row.Code,
      
      [nameof(TaxConfigGroupedRateSubTableRow.Description)] = row
        => row.Description,
      
      [nameof(TaxConfigGroupedRateSubTableRow.Rate)] = row
        => row.Rate,
    };

  protected override string? GetHeaderPrecedingMappedAdditionalData()
    => $"{nameof(TaxConfigGroupedRateSubTableRow.City)}.{nameof(TaxConfigGroupedRateSubTableRow.City.CountyName)}";

  protected override IEnumerable<string> GetAdditionalHeaders(IList<TaxConfigGroupedRateSubTableRow> rows)
   => rows
        .SelectMany(row => row.TaxConfig.SubValues
          .Where(subValue => subValue.SubTable == null)
          .Select(subValue => Localizer[subValue.Code].Value))
        .Distinct();

  protected override AdditionalData SelectAdditionalExcelData(TaxConfigGroupedRateSubTableRow row)
  {
    var additionalData = new Dictionary<string, (XLCellValue Value, Action<IXLCell>? FormatCell)>();

    foreach (var subValue in row.TaxConfig.SubValues.Where(subValue => subValue.SubTable == null))
    {
      var key = Localizer[subValue.Code].Value;

      var value = subValue.ValueType switch
      {
        SubValueType.String or SubValueType.City => subValue.StringValue,
        SubValueType.Number or SubValueType.Currency => subValue.NumberValue,
        SubValueType.Boolean => subValue.BooleanValue is null ? Blank.Value : LocalizeBool(subValue.BooleanValue.Value),
        SubValueType.Date => subValue.DateValue?.ToShortDateString(),

        _ => throw new NotSupportedException()
      };

      var formatCell = (IXLCell cell) =>
      {
        if (subValue.ValueType is SubValueType.Currency)
        {
          cell.Style.NumberFormat.Format = Constants.EXPORT_NUMBERFORMAT_CURRENCY;
        }
      };

      additionalData.Add(key, (value, formatCell));
    }

    return new AdditionalData(additionalData, []);
  }
}
