using ClosedXML.Excel;
using RealGimm.Core.Fclt.TicketTypeAggregate;
using RealGimm.Core.Shared.Services;

namespace RealGimm.Core.Fclt.Services;

public sealed partial class TicketTypeExportService : ExportService<TicketType, TicketTypeExportService>
{
  protected override Dictionary<string, Func<TicketType, XLCellValue>> CreateExcelDataSelector()
    => new Dictionary<string, Func<TicketType, XLCellValue>>()
    {
      [nameof(TicketType.Ordering)] = ticketType
        => ticketType.Ordering,

      [nameof(TicketType.InternalCode)] = ticketType
        => ticketType.InternalCode,

      [nameof(TicketType.Description)] = ticketType
        => ticketType.Description
    };
}
