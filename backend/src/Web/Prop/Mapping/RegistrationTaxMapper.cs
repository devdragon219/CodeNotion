using RealGimm.Core;
using RealGimm.Core.Prop.ContractAggregate;
using RealGimm.Core.Prop.RegistrationOfficeAggregate;
using RealGimm.Web.Prop.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Prop.Mapping;

public sealed class RegistrationTaxMapper : IMapper<RegistrationTaxInput, RegistrationTax>
{
  private readonly IReadRepository<RegistrationOffice> _regOfficeRepository;

  public RegistrationTaxMapper(IReadRepository<RegistrationOffice> regOfficeRepository)
  {
    _regOfficeRepository = regOfficeRepository;
  }

  public async Task<RegistrationTax?> MapAsync(RegistrationTaxInput? from, RegistrationTax? into, CancellationToken cancellationToken)
  {
    if (from is null)
    {
      return null;
    }

    var registrationTax = into ?? new RegistrationTax();
    registrationTax.SetIsTakeoverFromPreviousSubject(from.IsTakeoverFromPreviousSubject);
    registrationTax.SetTakeoverOriginalSubjectIds(from.TakeoverOriginalSubjectIds);
    registrationTax.SetTakeoverType(from.TakeoverType);
    registrationTax.SetTakeoverLegalRepresentativeSubjectId(from.TakeoverLegalRepresentativeSubjectId);
    registrationTax.SetTakeoverDate(from.TakeoverDate);
    registrationTax.SetPaymentType(from.PaymentType);
    registrationTax.SetIsRLIModeEnabled(from.IsRLIModeEnabled);
    registrationTax.SetIsAccountingManaged(from.IsAccountingManaged);
    registrationTax.SetIncomeTypeRLI(from.IncomeTypeRLI);
    registrationTax.SetIncomeType(from.IncomeType);
    registrationTax.SetRegistrationSerialNumber(from.RegistrationSerialNumber);
    registrationTax.SetRegistrationNumber(from.RegistrationNumber);
    registrationTax.SetRegistrationYear(from.RegistrationYear);
    registrationTax.SetContractRegistrationCode(from.ContractRegistrationCode);
    registrationTax.SetTaxOffice(
      await _regOfficeRepository.GetByIdAsync(from.RegistrationOfficeId, cancellationToken)
    );
    registrationTax.SetTaxableRateRatioPercent(from.TaxableRateRatioPercent);
    registrationTax.SetTenantTaxSharePercent(from.TenantTaxSharePercent);
    registrationTax.SetFirstRegistrationPeriod(from.FirstRegistrationPeriod);
    registrationTax.SetFirstRegistrationDate(from.FirstRegistrationDate);
    registrationTax.SetFirstOnlineRegistrationDate(from.FirstOnlineRegistrationDate);
    registrationTax.SetLastPaymentDate(from.LastPaymentDate);
    registrationTax.SetLastOnlinePaymentDate(from.LastOnlinePaymentDate);
    registrationTax.SetExemptions(from.Exemptions);
    registrationTax.SetTransferResolutionAmount(from.TransferResolutionAmount);
    registrationTax.SetSpecialCase(from.SpecialCase);
    registrationTax.SetNumberOfPages(from.NumberOfPages);
    registrationTax.SetNumberOfCopies(from.NumberOfCopies);
    registrationTax.SetTenantShareOfStampTaxPercent(from.TenantShareOfStampTaxPercent);
    registrationTax.SetIsVoluntarySanctionApplied(from.IsVoluntarySanctionApplied);

    return registrationTax;
  }
}
