using ClosedXML.Excel;
using RealGimm.Core.Fclt.SLAAggregate;
using RealGimm.Core.Shared.Services;

namespace RealGimm.Core.Fclt.Services;

public sealed partial class SLAExportService : ExportService<SLA, SLAExportService>
{
  protected override Dictionary<string, Func<SLA, XLCellValue>> CreateExcelDataSelector()
    => new Dictionary<string, Func<SLA, XLCellValue>>()
    {
      [nameof(SLA.InternalCode)] = sla
        => sla.InternalCode,

      [nameof(SLA.Description)] = sla
        => sla.Description
    };
}
