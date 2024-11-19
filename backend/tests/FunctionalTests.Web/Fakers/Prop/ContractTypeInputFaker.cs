using RealGimm.Infrastructure;
using RealGimm.Infrastructure.Prop.Data.Fakers;
using RealGimm.Web.Prop.Models;

namespace RealGimm.FunctionalTests.Web.Fakers.Prop;

public sealed class ContractTypeInputFaker : BaseSeededFaker<ContractTypeInput>
{
  private int _generatedInputsCount = 0;

  public IEnumerable<int> EstateUsageTypeIds { get; private set; } = Enumerable.Empty<int>();

  public ContractTypeInputFaker() : base(seed: 1)
  {
    CustomInstantiator(faker =>
    {
      var contractType = new ContractTypeInput()
      {
        Description = ContractTypeFaker.GenerateDescription(faker),
        InternalCode = ContractTypeFaker.GenerateInternalCode(number: _generatedInputsCount + 1),
        IsActive = ContractTypeFaker.GenerateIsActive(faker),
        IsStampTax = ContractTypeFaker.GenerateIsStampTax(faker),
        IsRegistrationTax = ContractTypeFaker.GenerateIsRegistrationTax(faker),
        Nature = ContractTypeFaker.PickNature(faker),
        UsageTypeId = faker.PickRandom(EstateUsageTypeIds),
        IsRentChargeApplicable = ContractTypeFaker.GenerateIsRentChargeApplicable(faker),
        IsAbsoluteRevaluation = ContractTypeFaker.GenerateIsAbsoluteRevaluation(faker),
        IsRevaluationApplicable = ContractTypeFaker.GenerateIsRevaluationApplicable(faker),
        RevaluationRatePercent = ContractTypeFaker.GenerateRevaluationRatePercent(faker),
        RevaluationCalculationMonth = ContractTypeFaker.GenerateRevaluationCalculationMonth(faker),
        RevaluationIndexMonth = ContractTypeFaker.GenerateRevaluationIndexMonth(faker),
        RegistrationTaxPercent = ContractTypeFaker.GenerateRegistrationTaxPercent(faker),
        RegistrationTaxTenantPercent = ContractTypeFaker.GenerateRegistrationTaxTenantPercent(faker),
        RegistrationTaxIncomeType = ContractTypeFaker.PickRegistrationTaxIncomeType(faker)
      };

      return contractType;
    });

    FinishWith((_, _) => _generatedInputsCount++);
  }

  public ContractTypeInputFaker UseEstateUsageTypeIds(IEnumerable<int> estateUsageTypeIds)
  {
    EstateUsageTypeIds = estateUsageTypeIds ?? throw new ArgumentNullException(nameof(estateUsageTypeIds));

    return this;
  }
}
