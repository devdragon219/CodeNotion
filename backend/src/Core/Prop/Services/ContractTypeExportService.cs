using ClosedXML.Excel;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Core.Asst.EstateUsageTypeAggregate;
using RealGimm.Core.Prop.ContractTypeAggregate;
using RealGimm.Core.Shared.Services;
using RealGimm.Core.Shared.Specifications;

namespace RealGimm.Core.Prop.Services;

public partial class ContractTypeExportService : ExportService<ContractType, ContractTypeExportService.Data, ContractTypeExportService>
{
  public required IRepository<EstateUsageType> _usageTypeRepository { private get; init; }

  protected override async Task<IList<Data>> SelectItemsAsync(
    IEnumerable<ContractType> entities,
    CancellationToken cancellationToken = default)
  {
    var usageTypesNames = await _usageTypeRepository
      .AsQueryable(new GetByIdsSpec<EstateUsageType>(entities.Select(contractType => contractType.UsageTypeId).Distinct()))
      .Select(contractType => new { contractType.Id, contractType.Name })
      .ToDictionaryAsync(contractType => contractType.Id, contractType => contractType.Name, cancellationToken);

    return entities
      .Select(contractType => new Data(contractType, usageTypesNames[contractType.UsageTypeId]))
      .ToList();
  }

  protected override Dictionary<string, Func<Data, XLCellValue>> CreateExcelDataSelector()
    => new()
    {
      [nameof(ContractType.InternalCode)] = data
        => data.ContractType.InternalCode,

      [nameof(ContractType.Description)] = data
        => data.ContractType.Description,

      ["ContractType"] = data
        => data.ContractType.IsActive ? Localizer["Active"].Value : Localizer["Passive"].Value,

      [nameof(ContractType.IsRentChargeApplicable)] = data
        => LocalizeBool(data.ContractType.IsRentChargeApplicable),

      [nameof(ContractType.Nature)] = data
        => LocalizeEnumValue(data.ContractType.Nature),

      [nameof(ContractType.UsageTypeId)] = data
        => data.UsageTypeName,

      [nameof(ContractType.IsRegistrationTax)] = data
        => LocalizeBool(data.ContractType.IsRegistrationTax),

      [nameof(ContractType.IsStampTax)] = data
        => LocalizeBool(data.ContractType.IsStampTax),

      [nameof(ContractType.RegistrationTaxIncomeType)] = data
        => LocalizeEnumValue(data.ContractType.RegistrationTaxIncomeType),

      [nameof(ContractType.RegistrationTaxPercent)] = data
        => data.ContractType.RegistrationTaxPercent,

      [nameof(ContractType.RegistrationTaxTenantPercent)] = data
        => data.ContractType.RegistrationTaxTenantPercent,

      [nameof(ContractType.IsRevaluationApplicable)] = data
        => LocalizeBool(data.ContractType.IsRevaluationApplicable),

      [nameof(ContractType.IsAbsoluteRevaluation)] = data
        => LocalizeBool(data.ContractType.IsAbsoluteRevaluation),

      [nameof(ContractType.RevaluationRatePercent)] = data
        => data.ContractType.RevaluationRatePercent,

      [nameof(ContractType.RevaluationIndexMonth)] = data
        => data.ContractType.RevaluationIndexMonth.HasValue
          ? Thread.CurrentThread.CurrentUICulture.DateTimeFormat.GetMonthName(
              data.ContractType.RevaluationIndexMonth.Value)
          : Blank.Value,

      [nameof(ContractType.RevaluationCalculationMonth)] = data
        => data.ContractType.RevaluationCalculationMonth.HasValue
          ? Thread.CurrentThread.CurrentUICulture.DateTimeFormat.GetMonthName(
              data.ContractType.RevaluationCalculationMonth.Value)
          : Blank.Value,
    };
}
