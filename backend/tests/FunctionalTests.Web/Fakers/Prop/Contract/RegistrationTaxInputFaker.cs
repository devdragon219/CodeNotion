using RealGimm.Infrastructure.Prop.Data.Fakers;
using RealGimm.Infrastructure;
using RealGimm.Web.Prop.Models;
using RealGimm.Core.Prop.RegistrationOfficeAggregate;

namespace RealGimm.FunctionalTests.Web.Fakers.Prop.Contract;

public sealed class RegistrationTaxInputFaker : BaseSeededFaker<RegistrationTaxInput>
{
  public IEnumerable<int> SubjectsIds { get; private set; } = Enumerable.Empty<int>();
  public IEnumerable<int> CitiesIds { get; private set; } = Enumerable.Empty<int>();
  public IEnumerable<RegistrationOffice> RegistrationOffices { get; private set; } = Enumerable.Empty<RegistrationOffice>();

  public RegistrationTaxInputFaker() : base(seed: 1)
  {
    CustomInstantiator(faker =>
    {
      var input = new RegistrationTaxInput();

      var takeoverDetails = RegistrationTaxFaker.GenerateTakeoverDetails(faker, SubjectsIds);
      input.IsTakeoverFromPreviousSubject = takeoverDetails.IsTakeover;
      input.TakeoverOriginalSubjectIds = takeoverDetails.OriginalSubjectIds;
      input.TakeoverType = takeoverDetails.Type;
      input.TakeoverLegalRepresentativeSubjectId = takeoverDetails.LegalRepresentativeSubjectId;
      input.TakeoverDate = takeoverDetails.Date;

      input.PaymentType = RegistrationTaxFaker.GeneratePaymentType(faker);
      input.IsRLIModeEnabled = RegistrationTaxFaker.GenerateIsRLIModeEnabled(faker);
      input.IsAccountingManaged = RegistrationTaxFaker.GenerateIsAccountingManaged(faker);
      input.IncomeTypeRLI = RegistrationTaxFaker.GenerateIncomeTypeRLI(faker);
      input.IncomeType = RegistrationTaxFaker.GenerateIncomeType(faker);
      input.RegistrationSerialNumber = RegistrationTaxFaker.GenerateRegistrationSerialNumber(faker);
      input.RegistrationNumber = RegistrationTaxFaker.GenerateRegistrationNumber(faker);
      input.RegistrationYear = RegistrationTaxFaker.GenerateRegistrationYear(faker);
      input.ContractRegistrationCode = RegistrationTaxFaker.GenerateContractRegistrationCode(faker);
      input.RegistrationOfficeId = faker.PickRandom(RegistrationOffices).Id;
      input.TaxableRateRatioPercent = RegistrationTaxFaker.GenerateTaxableRateRatioPercent(faker);
      input.TenantTaxSharePercent = RegistrationTaxFaker.GenerateTenantTaxSharePercent(faker);
      input.FirstRegistrationPeriod = RegistrationTaxFaker.GenerateFirstRegistrationPeriod(faker);
      input.FirstRegistrationDate = RegistrationTaxFaker.GenerateFirstRegistrationDate(faker);
      input.FirstOnlineRegistrationDate = RegistrationTaxFaker.GenerateFirstOnlineRegistrationDate(faker);
      input.LastPaymentDate = RegistrationTaxFaker.GenerateLastPaymentDate(faker);
      input.LastOnlinePaymentDate = RegistrationTaxFaker.GenerateLastOnlinePaymentDate(faker);
      input.Exemptions = RegistrationTaxFaker.GenerateExemptions(faker);
      input.TransferResolutionAmount = RegistrationTaxFaker.GenerateTransferResolutionAmount(faker);
      input.SpecialCase = RegistrationTaxFaker.GenerateSpecialCase(faker);
      input.NumberOfPages = RegistrationTaxFaker.GenerateNumberOfPages(faker);
      input.NumberOfCopies = RegistrationTaxFaker.GenerateNumberOfCopies(faker);
      input.TenantShareOfStampTaxPercent = RegistrationTaxFaker.GenerateTenantShareOfStampTaxPercent(faker);
      input.IsVoluntarySanctionApplied = RegistrationTaxFaker.GenerateIsVoluntarySanctionApplied(faker);

      return input;
    });
  }

  public RegistrationTaxInputFaker UseSubjectsIds(IEnumerable<int> subjectsIds)
  {
    SubjectsIds = subjectsIds ?? throw new ArgumentNullException(nameof(subjectsIds));

    return this;
  }

  public RegistrationTaxInputFaker UseCitiesIds(IEnumerable<int> citiesIds)
  {
    CitiesIds = citiesIds ?? throw new ArgumentNullException(nameof(citiesIds));

    return this;
  }

  public RegistrationTaxInputFaker UseRegistrationOffices(IEnumerable<RegistrationOffice> registrationOffices)
  {
    RegistrationOffices = registrationOffices ?? throw new ArgumentNullException(nameof(registrationOffices));

    return this;
  }
}
