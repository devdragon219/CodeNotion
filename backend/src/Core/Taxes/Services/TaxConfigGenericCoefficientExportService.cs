using ClosedXML.Excel;
using RealGimm.Core.Common.TaxConfigAggregate;
using RealGimm.Core.Shared.Services;
using RealGimm.Core.Taxes.SubTables;
using RealGimm.SharedKernel;

namespace RealGimm.Core.Taxes.Services;

public sealed partial class TaxConfigGenericCoefficientExportService : ExportService<TaxConfigGenericCoefficientSubTableRow, TaxConfigGenericCoefficientExportService>
{
  protected override Dictionary<string, Func<TaxConfigGenericCoefficientSubTableRow, XLCellValue>> CreateExcelDataSelector()
    => new Dictionary<string, Func<TaxConfigGenericCoefficientSubTableRow, XLCellValue>>()
    {
      [nameof(TaxConfigGenericCoefficientSubTableRow.TaxConfig.Year)] = row
        => row.TaxConfig.Year,

      [nameof(TaxConfigGenericCoefficientSubTableRow.ReferenceYear)] = row
        => row.ReferenceYear,
      
      [nameof(TaxConfigGenericCoefficientSubTableRow.Coefficient)] = row
        => row.Coefficient,
    };

  protected override string? GetHeaderPrecedingMappedAdditionalData()
    => nameof(TaxConfigGenericCoefficientSubTableRow.TaxConfig.Year);

  protected override IEnumerable<string> GetAdditionalHeaders(IList<TaxConfigGenericCoefficientSubTableRow> rows)
   => rows
        .SelectMany(row => row.TaxConfig.SubValues
          .Where(subValue => subValue.SubTable == null)
          .Select(subValue => Localizer[subValue.Code].Value))
        .Distinct();

  protected override AdditionalData SelectAdditionalExcelData(TaxConfigGenericCoefficientSubTableRow row)
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
