using ClosedXML.Excel;
using RealGimm.Core.Asst.FunctionAreaAggregate;
using RealGimm.Core.Shared.Services;

namespace RealGimm.Core.Asst.Services;

public sealed class FunctionAreaExportService : ExportService<FunctionArea, FunctionAreaExportService>
{
  protected override Dictionary<string, Func<FunctionArea, XLCellValue>> CreateExcelDataSelector()
    => new()
    {
      [nameof(FunctionArea.Name)] = functionArea
        => functionArea.Name,

      [nameof(FunctionArea.InternalCode)] = functionArea
        => functionArea.InternalCode,

      [nameof(FunctionArea.SurfaceType)] = functionArea
        => LocalizeEnumValue(functionArea.SurfaceType)
    };
}
