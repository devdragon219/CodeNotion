using ClosedXML.Excel;
using RealGimm.Core.Asst.EstateUsageTypeAggregate;
using RealGimm.Core.Shared.Services;

namespace RealGimm.Core.Asst.Services;

public sealed class EstateUsageTypeExportService : ExportService<EstateUsageType, EstateUsageTypeExportService>
{

  protected override Dictionary<string, Func<EstateUsageType, XLCellValue>> CreateExcelDataSelector()
    => new()
    {
      [nameof(EstateUsageType.Ordering)] = eut => eut.Ordering,
      [nameof(EstateUsageType.InternalCode)] = eut => eut.InternalCode,
      [nameof(EstateUsageType.Name)] = eut => eut.Name,
      ["Applicability"] = eut => string.Join(",", new List<string>()
      {
        !eut.IsForEstate ? string.Empty : Localizer["IsForEstate"],
        !eut.IsForEstateUnit ? string.Empty : Localizer["IsForEstateUnit"],
        !eut.IsForEstateSubUnit ? string.Empty : Localizer["IsForEstateSubUnit"],
        !eut.IsForContracts ? string.Empty : Localizer["IsForContracts"],
      }.Where(e => !string.IsNullOrEmpty(e))),
    };
}
