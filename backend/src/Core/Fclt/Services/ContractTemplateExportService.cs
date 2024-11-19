using ClosedXML.Excel;
using RealGimm.Core.Fclt.ContractTemplateAggregate;
using RealGimm.Core.Fclt.ContractTypeAggregate;
using RealGimm.Core.Shared.Services;

namespace RealGimm.Core.Fclt.Services;

public sealed partial class ContractTemplateExportService : ExportService<ContractTemplate, ContractTemplateExportService>
{
  protected override Dictionary<string, Func<ContractTemplate, XLCellValue>> CreateExcelDataSelector()
    => new Dictionary<string, Func<ContractTemplate, XLCellValue>>()
    {
      [nameof(ContractTemplate.InternalCode)] = contractTemplate
        => contractTemplate.InternalCode,

      [nameof(ContractTemplate.Description)] = contractTemplate
        => contractTemplate.Description,

      [$"{nameof(ContractTemplate.ContractType)}.{nameof(ContractType.Name)}"] = contractTemplate
        => contractTemplate.ContractType.Name,
    };
}
