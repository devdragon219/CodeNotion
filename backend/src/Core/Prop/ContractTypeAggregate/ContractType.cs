using System.ComponentModel.DataAnnotations;
using Ardalis.Result;
using HotChocolate;
using RealGimm.Core.CrossModule;
using RealGimm.SharedKernel;
using RealGimm.SharedKernel.Attributes;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Prop.ContractTypeAggregate;

public class ContractType : EntityBase, IAggregateRoot, IInternallyCoded
{
  [MaxLength(StrFieldSizes.DESCRIPTION), Required, FuzzySearchable]
  public string? Description { get; private set; }

  [MaxLength(StrFieldSizes.INTERNAL_CODE), Required, FuzzySearchable]
  public string InternalCode { get; private set; } = default!;

  public bool IsActive { get; private set; }
  public bool IsStampTax { get; private set; }
  public bool IsRegistrationTax { get; private set; }
  public AssetNature Nature { get; private set; }
  public int UsageTypeId { get; private set; }
  public bool IsRentChargeApplicable { get; private set; }
  public bool IsAbsoluteRevaluation { get; private set; }
  public bool IsRevaluationApplicable { get; private set; }
  public decimal? RevaluationRatePercent { get; private set; }
  public int? RevaluationCalculationMonth { get; private set;}
  public int? RevaluationIndexMonth { get; private set; }
  public double? RegistrationTaxPercent { get; private set; }
  public double? RegistrationTaxTenantPercent { get; private set; }
  public RegistrationTaxIncomeTypeRLI? RegistrationTaxIncomeType { get; private set; }

  public void SetDescription(string? description) => Description = description;

  public void SetInternalCode(string internalCode) => InternalCode = internalCode;

  public void SetIsActive(bool isActive) => IsActive = isActive;

  public void SetIsStampTax(bool isStampTax) => IsStampTax = isStampTax;

  public void SetIsRegistrationTax(bool isRegistrationTax)
    => IsRegistrationTax = isRegistrationTax;

  public void SetNature(AssetNature nature) => Nature = nature;

  public void SetUsageType(int usageType) => UsageTypeId = usageType;
  
  public void SetIsRentChargeApplicable(bool isRentChargeApplicable)
    => IsRentChargeApplicable = isRentChargeApplicable;

  public void SetIsAbsoluteRevaluation(bool isAbsoluteRevaluation)
    => IsAbsoluteRevaluation = isAbsoluteRevaluation;

  public void SetIsRevaluationApplicable(bool isRevaluationApplicable)
    => IsRevaluationApplicable = isRevaluationApplicable;

  public void SetRevaluationRatePercent(decimal? revaluationRatePercent)
    => RevaluationRatePercent = revaluationRatePercent;

  public void SetRevaluationCalculationMonth(int? revaluationCalculationMonth)
    => RevaluationCalculationMonth = revaluationCalculationMonth;

  public void SetRevaluationIndexMonth(int? revaluationIndexMonth)
    => RevaluationIndexMonth = revaluationIndexMonth;

  public void SetRegistrationTaxPercent(double? registrationTaxPercent)
    => RegistrationTaxPercent = registrationTaxPercent;

  public void SetRegistrationTaxTenantPercent(double? registrationTaxTenantPercent)
    => RegistrationTaxTenantPercent = registrationTaxTenantPercent;

  public void SetRegistrationTaxIncomeType(RegistrationTaxIncomeTypeRLI? registrationTaxIncomeType)
    => RegistrationTaxIncomeType = registrationTaxIncomeType;

  [GraphQLIgnore]
  public IEnumerable<ValidationError> Validate()
  {
    if (string.IsNullOrWhiteSpace(InternalCode))
    {
      yield return ErrorCode.ContractTypeInternalCodeIsNullOrEmptyString.ToValidationError();
    }
  }
}
