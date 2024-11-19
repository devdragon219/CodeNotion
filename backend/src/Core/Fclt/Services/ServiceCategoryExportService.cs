using ClosedXML.Excel;
using RealGimm.Core.Fclt.ServiceCategoryAggregate;
using RealGimm.Core.Shared.Services;

namespace RealGimm.Core.Fclt.Services;

public sealed class ServiceCategoryExportService : ExportService<ServiceCategory, ServiceCategoryExportService>
{
  protected override Dictionary<string, Func<ServiceCategory, XLCellValue>> CreateExcelDataSelector()
    => new()
    {
      [nameof(ServiceCategory.InternalCode)] = category => category.InternalCode,
      [nameof(ServiceCategory.Name)] = category => category.Name
    };
}
