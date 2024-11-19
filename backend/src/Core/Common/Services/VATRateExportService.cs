using ClosedXML.Excel;
using RealGimm.Core.Common.VATRateAggregate;
using RealGimm.Core.Shared.Services;

namespace RealGimm.Core.Common.Services;

public sealed class VATRateExportService : ExportService<VATRate, VATRateExportService>
{
  protected override Dictionary<string, Func<VATRate, XLCellValue>> CreateExcelDataSelector()
    => new()
    {
      [nameof(VATRate.InternalCode)] = vatRate
        => vatRate.InternalCode,

      [nameof(VATRate.Description)] = vatRate
        => vatRate.Description,

      [nameof(VATRate.Type)] = vatRate
        => LocalizeEnumValue(vatRate.Type),

      [nameof(VATRate.RatePercent)] = vatRate
        => vatRate.RatePercent
    };
}
