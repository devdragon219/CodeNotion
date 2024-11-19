using RealGimm.Core.Prop.ContractAggregate;
using RealGimm.Core.Prop.ContractTypeAggregate;

namespace RealGimm.Web.Prop.Models;

public sealed record RegistrationTaxInput
{
  public bool IsTakeoverFromPreviousSubject { get; set; }
  public int[] TakeoverOriginalSubjectIds { get; set; } = Array.Empty<int>();
  public TakeoverType? TakeoverType { get; set; }
  public int? TakeoverLegalRepresentativeSubjectId { get; set; }
  public DateOnly? TakeoverDate { get; set; }
  public RegistrationTaxPaymentType PaymentType { get; set; }
  public bool IsRLIModeEnabled { get; set; }
  public bool IsAccountingManaged { get; set; }
  public RegistrationTaxIncomeTypeRLI? IncomeTypeRLI { get; set; }
  public RegistrationTaxIncomeType? IncomeType { get; set; }
  public string? RegistrationSerialNumber { get; set; }
  public string? RegistrationNumber { get; set; }
  public int? RegistrationYear { get; set; }
  public string? ContractRegistrationCode { get; set; }
  public int RegistrationOfficeId { get; set; }
  public decimal TaxableRateRatioPercent { get; set; }
  public decimal TenantTaxSharePercent { get; set; }
  public RegistrationTaxPeriod FirstRegistrationPeriod { get; set; }
  public DateOnly? FirstRegistrationDate { get; set; }
  public DateOnly? FirstOnlineRegistrationDate { get; set; }
  public DateOnly? LastPaymentDate { get; set; }
  public DateOnly? LastOnlinePaymentDate { get; set; }
  public RegistrationTaxExemption? Exemptions { get; set; }
  public decimal? TransferResolutionAmount { get; set; }
  public RegistrationTaxSpecialCase? SpecialCase { get; set; }
  public int NumberOfPages { get; set; }
  public int NumberOfCopies { get; set; }
  public decimal TenantShareOfStampTaxPercent { get; set; }
  public bool IsVoluntarySanctionApplied { get; set; }
}
