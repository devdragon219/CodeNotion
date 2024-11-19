using ClosedXML.Excel;
using RealGimm.Core.Docs.DocumentAggregate;
using RealGimm.Core.Docs.DocumentAggregate.Extensions;
using RealGimm.Core.Docs.DocumentAggregate.Models;
using RealGimm.Core.Extensions;
using RealGimm.Core.Shared.Services;

namespace RealGimm.Core.Docs.Services;

public class EstateUnitDocumentsExportService : ExportService<EstateUnitDocumentsFlatOutput, EstateUnitDocumentsExportService>
{
  protected override Dictionary<string, Func<EstateUnitDocumentsFlatOutput, XLCellValue>> CreateExcelDataSelector()
    => new Dictionary<string, Func<EstateUnitDocumentsFlatOutput, XLCellValue>>()
    {
      [nameof(EstateUnitDocumentsFlatOutput.EstateUnitInternalCode)] = data
        => data.EstateUnitInternalCode,

      ["Category"] = data
        => SharedLocalizer.LocalizeContentCategoryGroup(data.Document.ContentCategory.GetGroupName()).Value,

      ["Subcategory"] = data
        => LocalizeEnumValue(data.Document.ContentCategory),

      [$"{nameof(EstateUnitDocumentsFlatOutput.Document)}{nameof(Document.Name)}"] = data
        => data.Document.Name,

      [$"{nameof(EstateUnitDocumentsFlatOutput.Document)}{nameof(Document.ProtocolNumber)}"] = data
        => data.Document.ProtocolNumber,

      [nameof(Document.Since)] = data
        => data.Document.Since,

      [nameof(Document.Until)] = data
        => data.Document.Until,

      [nameof(Document.Issuer)] = data
        => data.Document.Issuer,

      [nameof(Document.IssueDate)] = data
        => data.Document.IssueDate?.ToString(),

      [nameof(Document.Notes)] = data
        => data.Document.Notes,

      [nameof(Document.FileName)] = data
        => data.Document.FileName,

      [nameof(Document.CreationDate)] = data
        => data.Document.CreationDate,

      [nameof(Document.UploaderName)] = data
        => data.Document.UploaderName,

      ["Expired"] = data
        => LocalizeBool(DateTime.UtcNow > data.Document.Until),
    };
}
