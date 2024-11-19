using ClosedXML.Excel;
using RealGimm.Core.Fclt.PriceListAggregate;
using RealGimm.Core.Shared.Services;

namespace RealGimm.Core.Fclt.Services;

public sealed class PriceListExportService : ExportService<PriceList, PriceListExportService>
{
  protected override Dictionary<string, Func<PriceList, XLCellValue>> CreateExcelDataSelector()
    => new Dictionary<string, Func<PriceList, XLCellValue>>()
    {
      [nameof(PriceList.Ordering)] = craft
        => craft.Ordering,

      [nameof(PriceList.InternalCode)] = craft
        => craft.InternalCode,

      [nameof(PriceList.Name)] = craft
        => craft.Name
    };
}
