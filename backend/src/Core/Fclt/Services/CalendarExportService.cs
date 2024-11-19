using ClosedXML.Excel;
using RealGimm.Core.Fclt.CalendarAggregate;
using RealGimm.Core.Shared.Services;

namespace RealGimm.Core.Fclt.Services;

public sealed partial class CalendarExportService : ExportService<Calendar, CalendarExportService>
{
  protected override Dictionary<string, Func<Calendar, XLCellValue>> CreateExcelDataSelector()
    => new Dictionary<string, Func<Calendar, XLCellValue>>()
    {
      [nameof(Calendar.Name)] = calendar
        => calendar.Name,

      ["TimeZone"] = calendar
        => calendar.TimeZoneInfo.DisplayName
    };
}
