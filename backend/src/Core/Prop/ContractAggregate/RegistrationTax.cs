using System.ComponentModel.DataAnnotations;
using RealGimm.Core.Prop.ContractTypeAggregate;
using RealGimm.Core.Prop.RegistrationOfficeAggregate;
using RealGimm.SharedKernel.Attributes;

namespace RealGimm.Core.Prop.ContractAggregate;

public class RegistrationTax
{
  public bool IsTakeoverFromPreviousSubject { get; private set; }
  public int[] TakeoverOriginalSubjectIds { get; private set; } = Array.Empty<int>();
  public TakeoverType? TakeoverType { get; private set; }
  public int? TakeoverLegalRepresentativeSubjectId { get; private set; }
  public DateOnly? TakeoverDate { get; private set; }
  public RegistrationTaxPaymentType PaymentType { get; private set; }
  public bool IsRLIModeEnabled { get; private set; }
  public bool IsAccountingManaged { get; private set; }
  public RegistrationTaxIncomeTypeRLI? IncomeTypeRLI { get; private set; }
  public RegistrationTaxIncomeType? IncomeType { get; private set; }

  [MaxLength(StrFieldSizes.EXTERNAL_CODE), FuzzySearchable]
  public string? RegistrationSerialNumber { get; private set; }

  [MaxLength(StrFieldSizes.EXTERNAL_CODE), FuzzySearchable]
  public string? RegistrationNumber { get; private set; }

  public int? RegistrationYear { get; private set; }

  [MaxLength(StrFieldSizes.EXTERNAL_CODE), FuzzySearchable]
  public string? ContractRegistrationCode { get; private set; }

  [MaxLength(StrFieldSizes.EXTERNAL_CODE), FuzzySearchable]
  public string? RequestCode { get; private set; }

  public RegistrationOffice? RegistrationOffice { get; private set; }

  public decimal TaxableRateRatioPercent { get; private set; }
  public decimal TenantTaxSharePercent { get; private set; }
  public RegistrationTaxPeriod FirstRegistrationPeriod { get; private set; }
  public DateOnly? FirstRegistrationDate { get; private set; }
  public DateOnly? FirstOnlineRegistrationDate { get; private set; }
  public DateOnly? LastPaymentDate { get; private set; }
  public DateOnly? LastOnlinePaymentDate { get; private set; }
  public RegistrationTaxExemption? Exemptions { get; private set; }
  public decimal? TransferResolutionAmount { get; private set; }
  public RegistrationTaxSpecialCase? SpecialCase { get; private set; }
  public int NumberOfPages { get; private set; }
  public int NumberOfCopies { get; private set; }
  public decimal TenantShareOfStampTaxPercent { get; private set; }
  public bool IsVoluntarySanctionApplied { get; private set; }


  public void SetIsTakeoverFromPreviousSubject(bool isTakeoverFromPreviousSubject)
    => IsTakeoverFromPreviousSubject = isTakeoverFromPreviousSubject;

  public void SetTakeoverOriginalSubjectIds(int[] takeoverOriginalSubjectIds)
    => TakeoverOriginalSubjectIds = takeoverOriginalSubjectIds;

  public void SetTakeoverType(TakeoverType? takeoverType) => TakeoverType = takeoverType;

  public void SetTakeoverLegalRepresentativeSubjectId(int? takeoverLegalRepresentativeSubjectId)
    => TakeoverLegalRepresentativeSubjectId = takeoverLegalRepresentativeSubjectId;

  public void SetTakeoverDate(DateOnly? takeoverDate) => TakeoverDate = takeoverDate;

  public void SetPaymentType(RegistrationTaxPaymentType paymentType)
    => PaymentType = paymentType;

  public void SetIsRLIModeEnabled(bool isRLIModeEnabled)
  => IsRLIModeEnabled = isRLIModeEnabled;

  public void SetIsAccountingManaged(bool isAccountingManaged)
    => IsAccountingManaged = isAccountingManaged;

  public void SetIncomeTypeRLI(RegistrationTaxIncomeTypeRLI? incomeTypeRLI)
    => IncomeTypeRLI = incomeTypeRLI;

  public void SetIncomeType(RegistrationTaxIncomeType? incomeType)
    => IncomeType = incomeType;

  public void SetRegistrationSerialNumber(string? registrationSerialNumber)
    => RegistrationSerialNumber = registrationSerialNumber;

  public void SetRegistrationNumber(string? registrationNumber)
    => RegistrationNumber = registrationNumber;

  public void SetRegistrationYear(int? registrationYear)
    => RegistrationYear = registrationYear;

  public void SetContractRegistrationCode(string? contractRegistrationCode)
    => ContractRegistrationCode = contractRegistrationCode;

  public void SetRequestCode(string? requestCode)
    => RequestCode = requestCode;

  public void SetTaxOffice(RegistrationOffice? office) => RegistrationOffice = office;

  public void SetTaxableRateRatioPercent(decimal taxableRateRatioPercent)
    => TaxableRateRatioPercent = taxableRateRatioPercent;

  public void SetTenantTaxSharePercent(decimal tenantTaxSharePercent)
    => TenantTaxSharePercent = tenantTaxSharePercent;

  public void SetFirstRegistrationPeriod(RegistrationTaxPeriod firstRegistrationPeriod)
    => FirstRegistrationPeriod = firstRegistrationPeriod;

  public void SetFirstRegistrationDate(DateOnly? firstRegistrationDate)
    => FirstRegistrationDate = firstRegistrationDate;

  public void SetFirstOnlineRegistrationDate(DateOnly? firstOnlineRegistrationDate)
    => FirstOnlineRegistrationDate = firstOnlineRegistrationDate;

  public void SetLastPaymentDate(DateOnly? lastPaymentDate)
    => LastPaymentDate = lastPaymentDate;

  public void SetLastOnlinePaymentDate(DateOnly? lastOnlinePaymentDate)
    => LastOnlinePaymentDate = lastOnlinePaymentDate;

  public void SetExemptions(RegistrationTaxExemption? exemptions)
    => Exemptions = exemptions;

  public void SetTransferResolutionAmount(decimal? transferResolutionAmount)
    => TransferResolutionAmount = transferResolutionAmount;

  public void SetSpecialCase(RegistrationTaxSpecialCase? specialCase)
    => SpecialCase = specialCase;

  public void SetNumberOfPages(int numberOfPages) => NumberOfPages = numberOfPages;

  public void SetNumberOfCopies(int numberOfCopies) => NumberOfCopies = numberOfCopies;

  public void SetTenantShareOfStampTaxPercent(decimal tenantShareOfStampTaxPercent)
    => TenantShareOfStampTaxPercent = tenantShareOfStampTaxPercent;

  public void SetIsVoluntarySanctionApplied(bool isVoluntarySanctionApplied)
    => IsVoluntarySanctionApplied = isVoluntarySanctionApplied;
}
