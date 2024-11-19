using ClosedXML.Excel;
using RealGimm.Core.Fclt.ContractTemplateAggregate;
using RealGimm.Core.Fclt.PenaltyAggregate;
using RealGimm.Core.Shared.Services;

namespace RealGimm.Core.Fclt.Services;

public sealed partial class PenaltyExportService : ExportService<Penalty, PenaltyExportService>
{
  protected override Dictionary<string, Func<Penalty, XLCellValue>> CreateExcelDataSelector()
    => new Dictionary<string, Func<Penalty, XLCellValue>>()
    {
      [nameof(Penalty.InternalCode)] = penalty
        => penalty.InternalCode,

      [nameof(Penalty.Description)] = penalty
        => penalty.Description
    };
}
