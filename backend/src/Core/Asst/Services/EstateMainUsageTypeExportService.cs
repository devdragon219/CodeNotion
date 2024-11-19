using ClosedXML.Excel;
using RealGimm.Core.Asst.EstateMainUsageTypeAggregate;
using RealGimm.Core.Shared.Services;

namespace RealGimm.Core.Asst.Services;

public sealed class EstateMainUsageTypeExportService : ExportService<EstateMainUsageType, EstateMainUsageTypeExportService>
{

  protected override Dictionary<string, Func<EstateMainUsageType, XLCellValue>> CreateExcelDataSelector()
    => new()
    {
      [nameof(EstateMainUsageType.Ordering)] = EstateMainUsageType => EstateMainUsageType.Ordering,
      [nameof(EstateMainUsageType.InternalCode)] = EstateMainUsageType => EstateMainUsageType.InternalCode,
      [nameof(EstateMainUsageType.Name)] = EstateMainUsageType => EstateMainUsageType.Name,
    };
}
