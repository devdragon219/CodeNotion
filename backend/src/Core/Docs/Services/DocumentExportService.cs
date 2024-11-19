using ClosedXML.Excel;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Asst.CatalogueItemAggregate;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.Docs.DocumentAggregate;
using RealGimm.Core.Docs.DocumentAggregate.Extensions;
using RealGimm.Core.Docs.DocumentAggregate.Models;
using RealGimm.Core.Extensions;
using RealGimm.Core.Prop.ContractAggregate;
using RealGimm.Core.Shared.Services;

namespace RealGimm.Core.Docs.Services;

public class DocumentExportService : ExportService<DocumentRow, DocumentExportService>
{
  protected override Dictionary<string, Func<DocumentRow, XLCellValue>> CreateExcelDataSelector()
    => new Dictionary<string, Func<DocumentRow, XLCellValue>>()
    {
      [nameof(Document.Name)] = data
        => data.Document.Name,

      ["IdentityDocumentType"] = data
        => data.Document.ContentCategory switch
        {
          ContentCategory.SbjIdentityNational => Localizer[nameof(ContentCategory.SbjIdentityNational)].Value,
          ContentCategory.SbjIdentityPassport => Localizer[nameof(ContentCategory.SbjIdentityPassport)].Value,
          ContentCategory.SbjOther            => Localizer[nameof(ContentCategory.SbjOther)].Value,
          
          _ => Blank.Value
        },

      [nameof(Document.ProtocolNumber)] = data
        => data.Document.ProtocolNumber,

      ["Category"] = data
        => SharedLocalizer.LocalizeContentCategoryGroup(data.Document.ContentCategory.GetGroupName()).Value,

      ["Subcategory"] = data
        => LocalizeEnumValue(data.Document.ContentCategory),

      [nameof(Document.Since)] = data
        => data.Document.Since,

      [nameof(Document.Until)] = data
        => data.Document.Until,

      [nameof(Document.IssueDate)] = data
        => data.Document.IssueDate?.ToString(),

      [nameof(Document.Issuer)] = data
        => data.Document.Issuer,

      [nameof(Estate)] = data
        => data.EstateInternalCode,

      [nameof(EstateUnit)] = data
        => data.EstateUnitInternalCode,

      [nameof(Subject)] = data
        => data.SubjectInternalCode,

      [nameof(CatalogueItem)] = data
        => data.CatalogueItemInternalCode,

      [nameof(DocumentRow.CatalogueCategory)] = data
        => data.CatalogueCategory,

      [nameof(DocumentRow.CatalogueSubCategory)] = data
        => data.CatalogueSubCategory,

      [nameof(Contract)] = data
        => data.ContractInternalCode,

      [nameof(DocumentRow.TicketInternalCode)] = data
        => data.TicketInternalCode,
      
      [nameof(DocumentRow.FcltContractInternalCode)] = data
        => data.FcltContractInternalCode,

      [nameof(Document.FileName)] = data
        => data.Document.FileName,

      [nameof(Document.CreationDate)] = data
        => data.Document.CreationDate,

      [nameof(Document.UploaderName)] = data
        => data.Document.UploaderName,

      ["Expired"] = data
        => LocalizeBool(DateTime.UtcNow > data.Document.Until)
    };
}
