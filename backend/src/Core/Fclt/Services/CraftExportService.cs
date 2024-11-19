using ClosedXML.Excel;
using RealGimm.Core.Fclt.CraftAggregate;
using RealGimm.Core.Shared.Services;

namespace RealGimm.Core.Fclt.Services;

public sealed class CraftExportService : ExportService<Craft, CraftExportService>
{
  protected override Dictionary<string, Func<Craft, XLCellValue>> CreateExcelDataSelector()
    => new Dictionary<string, Func<Craft, XLCellValue>>()
    {
      [nameof(Craft.Ordering)] = craft
        => craft.Ordering,

      [nameof(Craft.InternalCode)] = craft
        => craft.InternalCode,

      [nameof(Craft.Name)] = craft
        => craft.Name
    };
}
