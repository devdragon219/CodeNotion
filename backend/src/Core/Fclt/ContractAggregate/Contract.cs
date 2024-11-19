using System.ComponentModel.DataAnnotations;
using Ardalis.Result;
using HotChocolate;
using RealGimm.Core.Common;
using RealGimm.Core.Fclt.ContractTemplateAggregate;
using RealGimm.Core.Fclt.ContractTypeAggregate;
using RealGimm.Core.Fclt.EstateUnitGroupAggregate;
using RealGimm.Core.Fclt.PenaltyAggregate;
using RealGimm.Core.Fclt.PriceListAggregate;
using RealGimm.Core.Fclt.SLAAggregate;
using RealGimm.Core.Fclt.TicketChecklistAggregate;
using RealGimm.SharedKernel.Attributes;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Fclt.ContractAggregate;

[GraphQLName($"{nameof(Fclt)}{nameof(Contract)}")]
public class Contract : EntityBase, IAggregateRoot, IInternallyCoded
{
  [FuzzySearchable, MaxLength(StrFieldSizes.INTERNAL_CODE), Required]
  public string InternalCode { get; private set; } = default!;
  
  [FuzzySearchable, MaxLength(StrFieldSizes.EXTERNAL_CODE)]
  public string? ExternalCode { get; private set; }

  [FuzzySearchable, MaxLength(StrFieldSizes.DESCRIPTION), Required]
  public string Description { get; private set; } = default!;

  public ContractType Type { get; private set; } = default!;
  public ContractTemplate? OriginalTemplate { get; private set; }
  public EntryStatus EntryStatus { get; private set; }
  public int ProviderSubjectId { get; private set; }

  public DateOnly? AgreementDate { get; private set; }
  public DateOnly EffectiveDate { get; private set; }
  public DateOnly ExpirationDate { get; private set; }
  public int? CancellationNoticeDaysCount { get; private set; }
  public int? RenewalNoticeDaysCount { get; private set; }
  public int? MaximumRenewalDaysCount { get; private set; }
  public NullSafeCollection<FrameworkAgreement> FrameworkAgreements { get; private set; } = [];

  public EstateUnitGroup? OriginalEstateUnitGroup { get; private set; }
  public int[] EstateUnitIds { get; private set; } = [];

  public int[] CatalogueTypeIds { get; private set; } = [];
  
  [GraphQLName("slas")]
  public NullSafeCollection<SLA> SLAs { get; private set; } = [];
  
  public NullSafeCollection<Penalty> Penalties { get; private set; } = [];
  public NullSafeCollection<TicketChecklist> TicketChecklists { get; private set; } = [];
  public BillingInfo BillingInfo { get; private set; } = default!;
  public NullSafeCollection<PriceList> PriceLists { get; private set; } = [];
  public NullSafeCollection<TermExtension> TermExtensions { get; private set; } = [];

  public void SetInternalCode(string internalCode) => InternalCode = internalCode;

  public void SetExternalCode(string? externalCode) => ExternalCode = externalCode;

  public void SetDescription(string description) => Description = description;

  public void SetType(ContractType type) => Type = type;

  public void SetOriginalTemplate(ContractTemplate? originalTemplate) => OriginalTemplate = originalTemplate;

  public void SetEntryStatus(EntryStatus entryStatus) => EntryStatus = entryStatus;

  public void SetProviderSubjectId(int providerSubjectId) => ProviderSubjectId = providerSubjectId;

  public void SetAgreementDate(DateOnly? agreementDate) => AgreementDate = agreementDate;

  public void SetEffectiveDate(DateOnly effectiveDate) => EffectiveDate = effectiveDate;

  public void SetExpirationDate(DateOnly expirationDate) => ExpirationDate = expirationDate;

  public void SetCancellationNoticeDaysCount(int? cancellationNoticeDaysCount)
    => CancellationNoticeDaysCount = cancellationNoticeDaysCount;

  public void SetRenewalNoticeDaysCount(int? renewalNoticeDaysCount)
    => RenewalNoticeDaysCount = renewalNoticeDaysCount;

  public void SetMaximumRenewalDaysCount(int? maximumRenewalDaysCount)
    => MaximumRenewalDaysCount = maximumRenewalDaysCount;

  public void SetOriginalEstateUnitGroup(EstateUnitGroup? originalEstateUnitGroup)
    => OriginalEstateUnitGroup = originalEstateUnitGroup;

  public void SetEstateUnitIds(int[] estateUnitIds)
    => EstateUnitIds = estateUnitIds.Distinct().ToArray();

  public void SetCatalogueTypeIds(int[] catalogueTypeIds)
    => CatalogueTypeIds = catalogueTypeIds.Distinct().ToArray();

  public void SetBillingInfo(BillingInfo billingInfo) => BillingInfo = billingInfo;

  [GraphQLIgnore]
  public IEnumerable<ValidationError> Validate()
  {
    if (string.IsNullOrWhiteSpace(InternalCode))
    {
      yield return ErrorCode.InternalCodeIsNullOrEmptyString.ToValidationError();
    }

    if (string.IsNullOrWhiteSpace(Description))
    {
      yield return ErrorCode.DescriptionIsNullOrEmptyString.ToValidationError();
    }
    
    if (ExpirationDate < EffectiveDate)
    {
      yield return ErrorCode.ExpirationDateCannotBeEarlierThanEffectiveDate.ToValidationError();
    }

    if (CancellationNoticeDaysCount.HasValue && CancellationNoticeDaysCount.Value <= 0)
    {
      yield return ErrorCode.CancellationNoticeDaysCountMustBeGreaterThanZero.ToValidationError();
    }

    if (RenewalNoticeDaysCount.HasValue && RenewalNoticeDaysCount.Value <= 0)
    {
      yield return ErrorCode.RenewalNoticeDaysCountMustBeGreaterThanZero.ToValidationError();
    }

    if (MaximumRenewalDaysCount.HasValue && MaximumRenewalDaysCount.Value <= 0)
    {
      yield return ErrorCode.MaximumRenewalDaysCountMustBeGreaterThanZero.ToValidationError();
    }

    foreach (var validationError in Type.Validate())
    {
      yield return validationError;
    }

    foreach (var frameworkAgreement in FrameworkAgreements)
    {
      foreach (var validationError in frameworkAgreement.Validate())
      {
        yield return validationError;
      }
    }

    foreach (var sla in SLAs)
    {
      foreach (var validationError in sla.Validate())
      {
        yield return validationError;
      }
    }

    foreach (var penalty in Penalties)
    {
      foreach (var validationError in penalty.Validate())
      {
        yield return validationError;
      }
    }

    foreach (var validationError in BillingInfo.Validate())
    {
      yield return validationError;
    }

    foreach (var termExtension in TermExtensions)
    {
      foreach (var validationError in termExtension.Validate())
      {
        yield return validationError;
      }
    }
  }
}
