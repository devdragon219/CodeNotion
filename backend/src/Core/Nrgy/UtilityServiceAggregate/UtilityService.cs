using System.ComponentModel.DataAnnotations;
using Ardalis.Result;
using HotChocolate;
using RealGimm.Core.Common;
using RealGimm.Core.Nrgy.UtilityTypeAggregate;
using RealGimm.SharedKernel.Attributes;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Nrgy.UtilityServiceAggregate;

public class UtilityService : EntityBase, IAggregateRoot, IInternallyCoded
{
  [FuzzySearchable, MaxLength(StrFieldSizes.INTERNAL_CODE), Required]
  public string InternalCode { get; private set; } = default!;

  public UtilityType UtilityType { get; private set; } = default!;
  public int[] EstateIds { get; private set; } = default!;
  public int[] EstateUnitIds { get; private set; } = default!;
  public int ProviderSubjectId { get; private set; }
  public int ReferenceSubjectId { get; private set; }
  public int OrgUnitId { get; private set; }
  public int AccountingItemId { get; private set; }

  [FuzzySearchable, MaxLength(StrFieldSizes.DESCRIPTION)]
  public string? Description { get; private set; }
  
  [FuzzySearchable, MaxLength(StrFieldSizes.EXTERNAL_CODE)]
  public string UtilityUserCode { get; private set; } = default!;
  
  [FuzzySearchable, MaxLength(StrFieldSizes.EXTERNAL_CODE)]
  public string UtilityContractCode { get; private set; } = default!;
  
  [FuzzySearchable, MaxLength(StrFieldSizes.EXTERNAL_CODE)]
  public string? UtilityMeterSerial { get; private set; }
  
  [FuzzySearchable, MaxLength(StrFieldSizes.EXTERNAL_CODE)]
  public string? UtilityDeliveryPointCode { get; private set; }
  
  public bool IsFreeMarket { get; private set; }
  public decimal? Deposit { get; private set; }
  public EntryStatus Status { get; private set; }
  public DateOnly ActivationDate { get; private set; }
  public DateOnly? DeactivationRequestDate { get; private set; }
  public DateOnly? DeactivationDate { get; private set; }
  
  [FuzzySearchable, MaxLength(StrFieldSizes.EXTERNAL_CODE)]
  public string? ContractPowerMaximum { get; private set; }
  
  [FuzzySearchable, MaxLength(StrFieldSizes.EXTERNAL_CODE)]
  public string? ContractPowerNominal { get; private set; }
  
  [FuzzySearchable, MaxLength(StrFieldSizes.EXTERNAL_CODE)]
  public string? ContractNominalTension { get; private set; }
  
  [FuzzySearchable, MaxLength(StrFieldSizes.NOTES)]
  public string? Notes { get; private set; }

  public void SetInternalCode(string internalCode) => InternalCode = internalCode;

  public void SetDescription(string? description) => Description = description;

  public void SetDeposit(decimal? deposit) => Deposit = deposit;

  public void SetStatus(EntryStatus status) => Status = status;

  public void SetNotes(string? notes) => Notes = notes;

  public void UpdateUtilityDetails(
    UtilityType utilityType,
    int[] estateIds,
    int[] estateUnitIds,
    int providerSubjectId,
    int referenceSubjectId,
    int orgUnitId,
    int accountingItemId,
    bool isFreeMarket)
  {
    UtilityType = utilityType;
    EstateIds = estateIds;
    EstateUnitIds = estateUnitIds;
    ProviderSubjectId = providerSubjectId;
    ReferenceSubjectId = referenceSubjectId;
    OrgUnitId = orgUnitId;
    AccountingItemId = accountingItemId;
    IsFreeMarket = isFreeMarket;
  }

  public void UpdateContractInformation(
    string utilityUserCode,
    string utilityContractCode,
    string? utilityMeterSerial,
    string? utilityDeliveryPointCode)
  {
    UtilityUserCode = utilityUserCode;
    UtilityContractCode = utilityContractCode;
    UtilityMeterSerial = utilityMeterSerial;
    UtilityDeliveryPointCode = utilityDeliveryPointCode;
  }

  public void UpdateContractPowerDetails(
    string? contractPowerMaximum,
    string? contractPowerNominal,
    string? contractNominalTension)
  {
    ContractPowerMaximum = contractPowerMaximum;
    ContractPowerNominal = contractPowerNominal;
    ContractNominalTension = contractNominalTension;
  }

  public void SetActivationDate(DateOnly activationDate) => ActivationDate = activationDate;
  
  public void SetDeactivationDates(DateOnly? deactivationRequestDate, DateOnly? deactivationDate)
  {
    DeactivationRequestDate = deactivationRequestDate;
    DeactivationDate = deactivationDate;
  }

  [GraphQLIgnore]
  public IEnumerable<ValidationError> Validate()
  {
    if (!EstateUnitIds.Any())
    {
      yield return ErrorCode.MustHaveAtLeastOneEstateUnit.ToValidationError();
    }
  }
}
