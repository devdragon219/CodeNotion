using ClosedXML.Excel;
using RealGimm.Core.Fclt.QualificationLevelAggregate;
using RealGimm.Core.Shared.Services;

namespace RealGimm.Core.Fclt.Services;

public sealed partial class QualificationLevelExportService : ExportService<QualificationLevel, QualificationLevelExportService>
{
  protected override Dictionary<string, Func<QualificationLevel, XLCellValue>> CreateExcelDataSelector()
    => new Dictionary<string, Func<QualificationLevel, XLCellValue>>()
    {
      [nameof(QualificationLevel.Ordering)] = qualificationLevel
        => qualificationLevel.Ordering,

      [nameof(QualificationLevel.InternalCode)] = qualificationLevel
        => qualificationLevel.InternalCode,

      [nameof(QualificationLevel.Name)] = qualificationLevel
        => qualificationLevel.Name
    };
}
