using RealGimm.Core.Prop.ContractTypeAggregate;
using RealGimm.Web.Prop.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Prop.Mapping;

public class ContractTypeMapper : IMapper<ContractTypeInput, ContractType>
{
  public ContractType? Map(ContractTypeInput? from, ContractType? into)
  {
    if (from is null)
    {
      return null;
    }

    var contractType = into ?? new ContractType();
    contractType.SetDescription(from.Description);
    contractType.SetInternalCode(from.InternalCode);
    contractType.SetIsActive(from.IsActive);
    contractType.SetIsStampTax(from.IsStampTax);
    contractType.SetIsRegistrationTax(from.IsRegistrationTax);
    contractType.SetNature(from.Nature);
    contractType.SetUsageType(from.UsageTypeId);
    contractType.SetIsRentChargeApplicable(from.IsRentChargeApplicable);
    contractType.SetIsAbsoluteRevaluation(from.IsAbsoluteRevaluation);
    contractType.SetIsRevaluationApplicable(from.IsRevaluationApplicable);
    contractType.SetRevaluationRatePercent(from.RevaluationRatePercent);
    contractType.SetRevaluationCalculationMonth(from.RevaluationCalculationMonth);
    contractType.SetRevaluationIndexMonth(from.RevaluationIndexMonth);
    contractType.SetRegistrationTaxPercent(from.RegistrationTaxPercent);
    contractType.SetRegistrationTaxTenantPercent(from.RegistrationTaxTenantPercent);
    contractType.SetRegistrationTaxIncomeType(from.RegistrationTaxIncomeType);

    if (into is null && from.Id.GetValueOrDefault() != default)
    {
      contractType.Id = from.Id!.Value;
    }

    return contractType;
  }

  Task<ContractType?> IMapper<ContractTypeInput, ContractType>.MapAsync(
    ContractTypeInput? from,
    ContractType? into,
    CancellationToken cancellationToken)
    => Task.FromResult(Map(from, into));
}
