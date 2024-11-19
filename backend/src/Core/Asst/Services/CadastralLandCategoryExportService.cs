using ClosedXML.Excel;
using RealGimm.Core.Asst.CadastralLandCategoryAggregate;
using RealGimm.Core.Extensions;
using RealGimm.Core.Shared.Services;

namespace RealGimm.Core.Asst.Services;

public sealed class CadastralLandCategoryExportService : ExportService<CadastralLandCategory, CadastralLandCategoryExportService>
{
  protected override Dictionary<string, Func<CadastralLandCategory, XLCellValue>> CreateExcelDataSelector()
    => new()
    {
      [nameof(CadastralLandCategory.Ordering)] = cadastralLandCategory
        => cadastralLandCategory.Ordering,

      [nameof(CadastralLandCategory.InternalCode)] = cadastralLandCategory
        => cadastralLandCategory.InternalCode,

      [nameof(CadastralLandCategory.Description)] = cadastralLandCategory
        => cadastralLandCategory.Description,

      ["Country"] = cadastralLandCategory
        => SharedLocalizer.LocalizeCountry(cadastralLandCategory.CountryISO).Value
    };
}
