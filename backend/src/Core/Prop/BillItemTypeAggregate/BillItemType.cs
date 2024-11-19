using System.ComponentModel.DataAnnotations;
using Ardalis.Result;
using HotChocolate;
using RealGimm.Core.Common.AccountingItemAggregate;
using RealGimm.Core.Common.VATRateAggregate;
using RealGimm.SharedKernel.Attributes;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Prop.BillItemTypeAggregate;

public class BillItemType : EntityBase, IAggregateRoot, IInternallyCoded
{
  [MaxLength(StrFieldSizes.DESCRIPTION), Required, FuzzySearchable]
  public string Description { get; private set; } = default!;

  [MaxLength(StrFieldSizes.INTERNAL_CODE), Required, FuzzySearchable]
  public string InternalCode { get; private set; } = default!;
  
  public bool IsForContractFee { get; private set; }
  public bool IsForContractCosts { get; private set; }
  public bool IsForAdministration { get; private set; }
  public bool IsPositive { get; private set; }
  public bool IsForTax { get; private set; }
  public int? DefaultAccountingItemId { get; private set; }

  public int ActiveSubjectVRId { get; private set; } = default!;
  public int ActiveExemptVRId { get; private set; } = default!;
  public int ActiveNonTaxableVRId { get; private set; } = default!;
  public int PassiveSubjectVRId { get; private set; } = default!;
  public int PassiveExemptVRId { get; private set; } = default!;
  public int PassiveNonTaxableVRId { get; private set; } = default!;
  public int AdministrationVRId { get; private set; } = default!;

  public void SetData(
    string description,
    bool isForContractFee,
    bool isForContractCosts,
    bool isForAdministration,
    bool isPositive,
    bool isForTax)
  {
    Description = description;
    IsForContractFee = isForContractFee;
    IsForContractCosts = isForContractCosts;
    IsForAdministration = isForAdministration;
    IsPositive = isPositive;
    IsForTax = isForTax;
  }

  public void SetInternalCode(string internalCode) => InternalCode = internalCode;

  public void SetDefaultAccountingItem(AccountingItem? item)
    => DefaultAccountingItemId = item?.Id;

  public void SetVatRates(
    VATRate activeSubject,
    VATRate activeExempt,
    VATRate activeNonTaxable,
    VATRate passiveSubject,
    VATRate passiveExempt,
    VATRate passiveNonTaxable,
    VATRate administrationVR
  )
  {
    ActiveSubjectVRId = activeSubject.Id;
    ActiveExemptVRId = activeExempt.Id;
    ActiveNonTaxableVRId = activeNonTaxable.Id;
    PassiveSubjectVRId = passiveSubject.Id;
    PassiveExemptVRId = passiveExempt.Id;
    PassiveNonTaxableVRId = passiveNonTaxable.Id;
    AdministrationVRId = administrationVR.Id;
  }

  [GraphQLIgnore]
  public IEnumerable<ValidationError> Validate()
  {
    if ((IsForAdministration || IsForContractFee || IsForContractCosts)
      && (ActiveExemptVRId
        * ActiveSubjectVRId
        * ActiveNonTaxableVRId
        * PassiveExemptVRId
        * PassiveSubjectVRId
        * PassiveNonTaxableVRId == 0))
    {
      yield return ErrorCode.VATRatesMustBeSetForBillItemTypes.ToValidationError();
    }
  }
}
