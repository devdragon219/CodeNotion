using ClosedXML.Excel;
using RealGimm.Core.Docs.DocumentAggregate;
using RealGimm.Core.Docs.DocumentAggregate.Models;
using RealGimm.Core.Shared.Services;

namespace RealGimm.Core.Docs.Services;

public class TicketDocumentsExportService : ExportService<TicketDocumentsFlatOutput, TicketDocumentsExportService>
{
  protected override Dictionary<string, Func<TicketDocumentsFlatOutput, XLCellValue>> CreateExcelDataSelector()
    => new Dictionary<string, Func<TicketDocumentsFlatOutput, XLCellValue>>()
    {
      [nameof(TicketDocumentsFlatOutput.TicketInternalCode)] = data
        => data.TicketInternalCode,

      [nameof(Document.Name)] = data
        => data.Document.Name,

      [nameof(Document.ContentCategory)] = data
        => LocalizeEnumValue(data.Document.ContentCategory),

      [nameof(Document.ProtocolNumber)] = data
        => data.Document.ProtocolNumber,

      [nameof(Document.Since)] = data
        => data.Document.Since?.ToString("dd/MM/yyyy"),

      [nameof(Document.Until)] = data
        => data.Document.Until?.ToString("dd/MM/yyyy"),

      [nameof(Document.Issuer)] = data
        => data.Document.Issuer,

      [nameof(Document.IssueDate)] = data
        => data.Document.IssueDate?.ToString("dd/MM/yyyy"),

      [nameof(Document.Notes)] = data
        => data.Document.Notes,

      [nameof(Document.FileName)] = data
        => data.Document.FileName,

      [nameof(Document.CreationDate)] = data
        => data.Document.CreationDate.ToString("dd/MM/yyyy"),

      [nameof(Document.UploaderName)] = data
        => data.Document.UploaderName,

      ["Expired"] = data
        => LocalizeBool(DateTime.UtcNow > data.Document.Until)
    };
}
