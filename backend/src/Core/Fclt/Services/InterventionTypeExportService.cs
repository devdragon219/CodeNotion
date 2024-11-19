using ClosedXML.Excel;
using RealGimm.Core.Fclt.InterventionTypeAggregate;
using RealGimm.Core.Shared.Services;

namespace RealGimm.Core.Fclt.Services;

public sealed partial class InterventionTypeExportService : ExportService<InterventionType, InterventionTypeExportService>
{
  protected override Dictionary<string, Func<InterventionType, XLCellValue>> CreateExcelDataSelector()
    => new Dictionary<string, Func<InterventionType, XLCellValue>>()
    {
      [nameof(InterventionType.InternalCode)] = interventionType
        => interventionType.InternalCode,

      [nameof(InterventionType.Name)] = interventionType
        => interventionType.Name
    };
}
