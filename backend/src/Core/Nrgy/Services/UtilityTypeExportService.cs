

using ClosedXML.Excel;
using RealGimm.Core.Nrgy.UtilityTypeAggregate;
using RealGimm.Core.Shared.Services;

namespace RealGimm.Core.Nrgy.Services;
public sealed class UtilityTypeExportService : ExportService<UtilityType, UtilityTypeExportService>
{
  protected override Dictionary<string, Func<UtilityType, XLCellValue>> CreateExcelDataSelector()
    => new()
    {
      [nameof(UtilityType.Category)] = UtilityType => LocalizeEnumValue(UtilityType.Category),
      [nameof(UtilityType.InternalCode)] = UtilityType => UtilityType.InternalCode,
      [nameof(UtilityType.Description)] = UtilityType => UtilityType.Description,
      [nameof(UtilityType.ExternalCode)] = UtilityType => UtilityType.ExternalCode,
      [nameof(UtilityType.ExpenseClass)] = UtilityType => UtilityType.ExpenseClass,
      [nameof(UtilityType.MeasurementUnit)] = UtilityType => UtilityType.MeasurementUnit,
      [nameof(UtilityType.MeasurementUnitDescription)] = UtilityType => UtilityType.MeasurementUnitDescription,
      [nameof(UtilityType.TimeOfUseRateCount)] = UtilityType => UtilityType.TimeOfUseRateCount,
      [nameof(UtilityType.MeteringType)] = UtilityType => LocalizeEnumValue(UtilityType.MeteringType),
      [nameof(UtilityType.HasHeatingAccountingSystem)] = UtilityType => LocalizeBool(UtilityType.HasHeatingAccountingSystem),
    };
}
