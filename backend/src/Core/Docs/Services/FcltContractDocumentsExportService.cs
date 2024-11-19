﻿using ClosedXML.Excel;
using RealGimm.Core.Docs.DocumentAggregate;
using RealGimm.Core.Docs.DocumentAggregate.Extensions;
using RealGimm.Core.Docs.DocumentAggregate.Models;
using RealGimm.Core.Extensions;
using RealGimm.Core.Shared.Services;

namespace RealGimm.Core.Docs.Services;

public class FcltContractDocumentsExportService : ExportService<FcltContractDocumentsFlatOutput, FcltContractDocumentsExportService>
{
  protected override Dictionary<string, Func<FcltContractDocumentsFlatOutput, XLCellValue>> CreateExcelDataSelector()
    => new Dictionary<string, Func<FcltContractDocumentsFlatOutput, XLCellValue>>()
    {
      [nameof(FcltContractDocumentsFlatOutput.FcltContractInternalCode)] = data
        => data.FcltContractInternalCode,

      ["Category"] = data
        => SharedLocalizer.LocalizeContentCategoryGroup(data.Document.ContentCategory.GetGroupName()).Value,

      ["Subcategory"] = data
        => LocalizeEnumValue(data.Document.ContentCategory),

      [$"{nameof(FcltContractDocumentsFlatOutput.Document)}{nameof(Document.Name)}"] = data
        => data.Document.Name,

      [$"{nameof(FcltContractDocumentsFlatOutput.Document)}{nameof(Document.ProtocolNumber)}"] = data
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