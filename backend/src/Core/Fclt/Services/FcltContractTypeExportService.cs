using ClosedXML.Excel;
using RealGimm.Core.Fclt.ContractTypeAggregate;
using RealGimm.Core.Shared.Services;

namespace RealGimm.Core.Fclt.Services;

/// <summary>
/// "Fclt" prefix is required in order to avoid duplicate translation keys.
/// </summary>
public sealed class FcltContractTypeExportService : ExportService<ContractType, FcltContractTypeExportService>
{
  protected override Dictionary<string, Func<ContractType, XLCellValue>> CreateExcelDataSelector()
    => new Dictionary<string, Func<ContractType, XLCellValue>>()
    {
      [nameof(ContractType.Ordering)] = contractType
        => contractType.Ordering,

      [nameof(ContractType.InternalCode)] = contractType
        => contractType.InternalCode,

      [nameof(ContractType.Name)] = contractType
        => contractType.Name
    };
}
