using ClosedXML.Excel;
using RealGimm.Core.Common.RevaluationDataAggregate;
using RealGimm.Core.Shared.Services;

namespace RealGimm.Core.Common.Services;

public sealed class RevaluationDataExportService : ExportService<RevaluationData, RevaluationDataExportService>
{
  protected override Dictionary<string, Func<RevaluationData, XLCellValue>> CreateExcelDataSelector()
  => new()
  {
    [nameof(RevaluationData.Year)] = RevaluationData
      => RevaluationData.Year,

    [nameof(RevaluationData.Month)] = RevaluationData
      => Thread.CurrentThread.CurrentCulture.DateTimeFormat.GetMonthName(RevaluationData.Month),

    [nameof(RevaluationData.BaseYear)] = RevaluationData
      => RevaluationData.BaseYear,

    [nameof(RevaluationData.RevaluationIndex)] = RevaluationData
      => RevaluationData.RevaluationIndex
  };
}
