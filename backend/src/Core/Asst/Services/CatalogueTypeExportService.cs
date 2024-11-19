using ClosedXML.Excel;
using RealGimm.Core.Asst.CatalogueTypeAggregate;
using RealGimm.Core.Shared.Services;

namespace RealGimm.Core.Asst.Services;

public sealed class CatalogueTypeExportService : ExportService<CatalogueType, CatalogueTypeExportService>
{
  protected override Dictionary<string, Func<CatalogueType, XLCellValue>> CreateExcelDataSelector()
    => new()
    {
      [nameof(CatalogueType.InternalCode)] = catalogueType
        => catalogueType.InternalCode,

      [nameof(CatalogueType.Name)] = catalogueType
        => catalogueType.Name,

      [nameof(CatalogueType.Category)] = catalogueType
        => catalogueType.Category?.Name,

      [nameof(CatalogueType.SubCategory)] = catalogueType
        => catalogueType.SubCategory?.Name,

      [nameof(CatalogueType.UsageTypes)] = catalogueType
        => string.Join(", ", catalogueType.UsageTypes.Select(usageType => usageType.Name))
    };
}
