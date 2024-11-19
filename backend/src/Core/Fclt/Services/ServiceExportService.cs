using ClosedXML.Excel;
using RealGimm.Core.Fclt.ServiceAggregate;
using RealGimm.Core.Shared.Services;

namespace RealGimm.Core.Fclt.Services;

public sealed class ServiceExportService : ExportService<Service, ServiceExportService>
{
  protected override Dictionary<string, Func<Service, XLCellValue>> CreateExcelDataSelector()
    => new()
    {
      [nameof(Service.InternalCode)] = service => service.InternalCode,
      [nameof(Service.Name)] = service => service.Name,
      [nameof(Service.Category)] = service => service.Category.Name,
      [nameof(Service.SubCategory)] = service => service.SubCategory.Name
    };
}
