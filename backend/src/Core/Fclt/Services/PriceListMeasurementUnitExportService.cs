using ClosedXML.Excel;
using RealGimm.Core.Fclt.PriceListMeasurementUnitAggregate;
using RealGimm.Core.Shared.Services;

namespace RealGimm.Core.Fclt.Services;

public sealed class PriceListMeasurementUnitExportService : ExportService<PriceListMeasurementUnit, PriceListMeasurementUnitExportService>
{
  protected override Dictionary<string, Func<PriceListMeasurementUnit, XLCellValue>> CreateExcelDataSelector()
    => new Dictionary<string, Func<PriceListMeasurementUnit, XLCellValue>>()
    {
      [nameof(PriceListMeasurementUnit.Ordering)] = unit
        => unit.Ordering,

      [nameof(PriceListMeasurementUnit.InternalCode)] = unit
        => unit.InternalCode,

      [nameof(PriceListMeasurementUnit.Name)] = unit
        => unit.Name
    };
}
