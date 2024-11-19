using ClosedXML.Excel;
using RealGimm.Core.Docs.DocumentAggregate;
using RealGimm.Core.Docs.DocumentAggregate.Models;
using RealGimm.Core.Extensions;
using RealGimm.Core.Shared.Services;

namespace RealGimm.Core.Docs.Services;

public class CatalogueDocumentsExportService : ExportService<CatalogueDocumentsFlatOutput, CatalogueDocumentsExportService>
{
  protected override Dictionary<string, Func<CatalogueDocumentsFlatOutput, XLCellValue>> CreateExcelDataSelector()
    => new Dictionary<string, Func<CatalogueDocumentsFlatOutput, XLCellValue>>()
    {
      [nameof(CatalogueDocumentsFlatOutput.EstateInternalCode)] = data
        => data.EstateInternalCode,

      [nameof(CatalogueDocumentsFlatOutput.CategoryName)] = data
        => data.CategoryName,

      [nameof(CatalogueDocumentsFlatOutput.SubCategoryName)] = data
        => data.SubCategoryName,

      [nameof(CatalogueDocumentsFlatOutput.CatalogueTypeName)] = data
        => data.CatalogueTypeName,

      [nameof(CatalogueDocumentsFlatOutput.ContentCategoryGroup)] = data
        => SharedLocalizer.LocalizeContentCategoryGroup(data.ContentCategoryGroup).Value,

      [nameof(Document.ContentCategory)] = data
        => LocalizeEnumValue(data.Document.ContentCategory),

      [$"{nameof(CatalogueDocumentsFlatOutput.Document)}{nameof(Document.Name)}"] = data
        => data.Document.Name,

      [nameof(CatalogueDocumentsFlatOutput.CatalogueItemInternalCode)] = data
        => data.CatalogueItemInternalCode ?? "-",

      [$"{nameof(CatalogueDocumentsFlatOutput.Document)}{nameof(Document.ProtocolNumber)}"] = data
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
