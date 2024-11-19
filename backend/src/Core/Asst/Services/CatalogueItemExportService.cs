using ClosedXML.Excel;
using Humanizer;
using RealGimm.Core.Asst.CatalogueItemAggregate;
using RealGimm.Core.Asst.CatalogueTypeAggregate;
using RealGimm.Core.Shared.Services;

namespace RealGimm.Core.Asst.Services;

public sealed class CatalogueItemExportService : ExportService<CatalogueItem, CatalogueItemExportService>
{
  protected override Dictionary<string, Func<CatalogueItem, XLCellValue>> CreateExcelDataSelector()
    => new()
    {
      [nameof(CatalogueItem.InternalCode)] = item
        => item.InternalCode,

      [nameof(CatalogueItem.Status)] = item
        => LocalizeEnumValue(item.Status),

      [nameof(CatalogueItem.ActivationDate)] = item
        => item.ActivationDate.ToShortDateString(),

      [nameof(CatalogueItem.DecommissioningDate)] = item
        => item.DecommissioningDate?.ToShortDateString() ?? "-",

      [nameof(CatalogueItem.LastMaintenanceDate)] = item
        => item.LastMaintenanceDate.ToShortDateString(),
    };

  protected override string GetDefaultWorksheetName(IList<CatalogueItem> items)
  {
    const int maxNameLegnth = 31;
    var name = GetItemsType(items).Name!;
    
    // removing leading and trailing apostrophes
    name = name.Trim('\'');

    // removing invalid characters
    name = string.Join(null, name.Split(new[] { '/', '\\', '?', '*', ':', '[', ']' }, StringSplitOptions.RemoveEmptyEntries));

    // trimming to max length
    if (name.Length > maxNameLegnth)
    {
      name = $"{name[..(maxNameLegnth - 3)]}...";
    }

    return name;
  }

  protected override string GetDefaultDownloadFileName(IList<CatalogueItem> items)
    => $"{GetDefaultWorksheetName(items).Underscore()}.xlsx";

  protected override IEnumerable<string> GetAdditionalHeaders(IList<CatalogueItem> items)
  {
    foreach (var row in GetItemsType(items).Fields!)
    {
      foreach (var field in row)
      {
        yield return field.Name!;
      }
    }
  }

  protected override AdditionalData SelectAdditionalExcelData(CatalogueItem item)
  {
    var mappedData = new Dictionary<string, (XLCellValue Value, Action<IXLCell>? FormatCell)>();
    var unmappedData = new List<XLCellValue>();
    var flatTypeFields = item.CatalogueType.Fields!.SelectMany(field => field).ToList();

    foreach (var field in item.Fields)
    {
      var typeField = flatTypeFields.SingleOrDefault(typeField => typeField.Id == field.TemplateTypeId);
      if (typeField is not null)
      {
        mappedData.Add(typeField.Name!, (field.Name, null));
        continue;
      }

      unmappedData.Add(field.Name);
    }

    return new AdditionalData(mappedData, unmappedData);
  }

  private static CatalogueType GetItemsType(IList<CatalogueItem> items)
  {
    if (items.DistinctBy(item => item.CatalogueType).Count() != 1)
    {
      throw new ArgumentException("All the items must have the same type.", nameof(items));
    }

    return items[0].CatalogueType;
  }
}
