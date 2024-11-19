using ClosedXML.Excel;
using RealGimm.Core.Asst.AssetTaxCalculationAggregate.Models;
using RealGimm.Core.Shared.Services;
using RealGimm.SharedKernel;

namespace RealGimm.Core.Asst.Services;
public class AssetTaxGroupedRowExportService : ExportService<AssetTaxGroupedRow, AssetTaxGroupedRowExportService>
{
  protected override Dictionary<string, Func<AssetTaxGroupedRow, XLCellValue>> CreateExcelDataSelector()
  => new()
  {
    [nameof(AssetTaxGroupedRow.Year)] = item => item.Year,
    [nameof(AssetTaxGroupedRow.ManagementSubject)] = item => item.ManagementSubject,
    [nameof(AssetTaxGroupedRow.LastUpdate)] = item => item.LastUpdate.ToString(),
    [nameof(AssetTaxGroupedRow.ExpectedDueDate)] = item => item.ExpectedDueDate.ToString(),
    [nameof(AssetTaxGroupedRow.TotalTaxableAmount)] = item => item.TotalTaxableAmount,
    [nameof(AssetTaxGroupedRow.TotalAmount)] = item => item.TotalAmount,
    ["AnomaliesWarning"] = item => LocalizeBool(item.Payments is not null && item.Payments.Any(e => e.Issue is not null))
  };

  protected override void FormatWorksheet(IXLWorksheet worksheet)
  {
    var columnsToFormat = new[]{
      Localizer[nameof(AssetTaxGroupedRow.TotalTaxableAmount)].Value,
      Localizer[nameof(AssetTaxGroupedRow.TotalAmount)].Value,
    };

    foreach (var columnToFormat in columnsToFormat)
    {
      worksheet.RangeUsed()!.AsTable().FindColumn(e => e.FirstCell().Value.ToString() == columnToFormat)
               .Style.NumberFormat.Format = Constants.EXPORT_NUMBERFORMAT_CURRENCY;
    }

    base.FormatWorksheet(worksheet);
  }
}
