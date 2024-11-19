using Bogus;
using RealGimm.Core.Prop.ContractAggregate;
using RealGimm.Core.Prop.ContractTypeAggregate;
using RealGimm.Core.Prop.RegistrationOfficeAggregate;

namespace RealGimm.Infrastructure.Prop.Data.Fakers;

public sealed class RegistrationTaxFaker : BaseSeededFaker<RegistrationTax>
{
  public IEnumerable<int> SubjectsIds { get; private set; } = Enumerable.Empty<int>();
  public IEnumerable<int> CitiesIds { get; private set; } = Enumerable.Empty<int>();
  public required IEnumerable<RegistrationOffice> RegistrationOffices { get; init; }

  public RegistrationTaxFaker()
  {
    CustomInstantiator(faker =>
    {
      var registrationTax = new RegistrationTax();

      var takeoverDetails = GenerateTakeoverDetails(faker, SubjectsIds);
      registrationTax.SetIsTakeoverFromPreviousSubject(takeoverDetails.IsTakeover);
      registrationTax.SetTakeoverOriginalSubjectIds(takeoverDetails.OriginalSubjectIds);
      registrationTax.SetTakeoverType(takeoverDetails.Type);
      registrationTax.SetTakeoverLegalRepresentativeSubjectId(takeoverDetails.LegalRepresentativeSubjectId);
      registrationTax.SetTakeoverDate(takeoverDetails.Date);
      registrationTax.SetPaymentType(GeneratePaymentType(faker));
      registrationTax.SetIsRLIModeEnabled(GenerateIsRLIModeEnabled(faker));
      registrationTax.SetIsAccountingManaged(GenerateIsAccountingManaged(faker));
      registrationTax.SetIncomeTypeRLI(GenerateIncomeTypeRLI(faker));
      registrationTax.SetIncomeType(GenerateIncomeType(faker));
      registrationTax.SetRegistrationSerialNumber(GenerateRegistrationSerialNumber(faker));
      registrationTax.SetRegistrationNumber(GenerateRegistrationNumber(faker));
      registrationTax.SetRegistrationYear(GenerateRegistrationYear(faker));
      registrationTax.SetContractRegistrationCode(GenerateContractRegistrationCode(faker));
      registrationTax.SetTaxOffice(faker.PickRandom(RegistrationOffices));
      registrationTax.SetTaxableRateRatioPercent(GenerateTaxableRateRatioPercent(faker));
      registrationTax.SetTenantTaxSharePercent(GenerateTenantTaxSharePercent(faker));
      registrationTax.SetFirstRegistrationPeriod(GenerateFirstRegistrationPeriod(faker));
      registrationTax.SetFirstRegistrationDate(GenerateFirstRegistrationDate(faker));
      registrationTax.SetFirstOnlineRegistrationDate(GenerateFirstOnlineRegistrationDate(faker));
      registrationTax.SetLastPaymentDate(GenerateLastPaymentDate(faker));
      registrationTax.SetLastOnlinePaymentDate(GenerateLastOnlinePaymentDate(faker));
      registrationTax.SetExemptions(GenerateExemptions(faker));
      registrationTax.SetTransferResolutionAmount(GenerateTransferResolutionAmount(faker));
      registrationTax.SetSpecialCase(GenerateSpecialCase(faker));
      registrationTax.SetNumberOfPages(GenerateNumberOfPages(faker));
      registrationTax.SetNumberOfCopies(GenerateNumberOfCopies(faker));
      registrationTax.SetTenantShareOfStampTaxPercent(GenerateTenantShareOfStampTaxPercent(faker));
      registrationTax.SetIsVoluntarySanctionApplied(GenerateIsVoluntarySanctionApplied(faker));

      return registrationTax;
    });
  }

  public static (bool IsTakeover, int[] OriginalSubjectIds, TakeoverType? Type, int? LegalRepresentativeSubjectId, DateOnly? Date) GenerateTakeoverDetails(
    Faker faker,
    IEnumerable<int> subjectIds)
  {
    var isTakeover = faker.Random.Bool();
    if (!isTakeover)
    {
      return (isTakeover, Array.Empty<int>(), null, null, null);
    }

    var originalSubjectIds = faker
      .PickRandom(subjectIds, amountToPick: faker.Random.Int(1, 3))
      .ToArray();

    var type = faker.Random.Bool() ? faker.PickRandom<TakeoverType>() : (TakeoverType?)null;
    var legalRepresentativeSubjectId = faker.Random.Bool() ? faker.PickRandom(subjectIds) : (int?)null;
    var date = faker.Date.PastDateOnly(refDate: new DateOnly(2024, 01, 01));

    return (isTakeover, originalSubjectIds, type, legalRepresentativeSubjectId, date);
  }

  public static RegistrationTaxPaymentType GeneratePaymentType(Faker faker)
    => faker.PickRandom<RegistrationTaxPaymentType>();

  public static bool GenerateIsRLIModeEnabled(Faker faker) => faker.Random.Bool();

  public static bool GenerateIsAccountingManaged(Faker faker) => faker.Random.Bool();

  public static RegistrationTaxIncomeTypeRLI? GenerateIncomeTypeRLI(Faker faker)
    => faker.Random.Bool()
      ? faker.PickRandom<RegistrationTaxIncomeTypeRLI>()
      : null;

  public static RegistrationTaxIncomeType? GenerateIncomeType(Faker faker)
    => faker.PickRandom<RegistrationTaxIncomeType>();

  public static string? GenerateRegistrationSerialNumber(Faker faker)
    => faker.Random.AlphaNumeric(10).ToUpper();

  public static string? GenerateRegistrationNumber(Faker faker)
    => faker.Random.AlphaNumeric(10).ToUpper();

  public static int? GenerateRegistrationYear(Faker faker) => faker.Random.Int(2020, 2024);

  public static string? GenerateContractRegistrationCode(Faker faker)
    => faker.Random.AlphaNumeric(10).ToUpper();

  public static int GenerateTaxOfficeCityId(Faker faker, IEnumerable<int> citiesIds)
    => faker.PickRandom(citiesIds);

  public static string GenerateTaxOfficeCode(Faker faker) => faker.Random.AlphaNumeric(10).ToUpper();

  public static decimal GenerateTaxableRateRatioPercent(Faker faker)
    => decimal.Round(faker.Random.Decimal(1m, 20m), 2);

  public static decimal GenerateTenantTaxSharePercent(Faker faker)
    => decimal.Round(faker.Random.Decimal(1m, 20m), 2);

  public static RegistrationTaxPeriod GenerateFirstRegistrationPeriod(Faker faker)
    => faker.PickRandom<RegistrationTaxPeriod>();

  public static DateOnly? GenerateFirstRegistrationDate(Faker faker)
    => faker.Date.PastDateOnly(refDate: new DateOnly(2024, 01, 01));

  public static DateOnly? GenerateFirstOnlineRegistrationDate(Faker faker)
    => faker.Date.PastDateOnly(refDate: new DateOnly(2024, 01, 01));

  public static DateOnly? GenerateLastPaymentDate(Faker faker)
    => faker.Date.PastDateOnly(refDate: new DateOnly(2024, 01, 01));

  public static DateOnly? GenerateLastOnlinePaymentDate(Faker faker)
    => faker.Date.PastDateOnly(refDate: new DateOnly(2024, 01, 01));

  public static RegistrationTaxExemption? GenerateExemptions(Faker faker)
    => faker.Random.Bool()
      ? faker.PickRandom<RegistrationTaxExemption>()
      : null;

  public static decimal? GenerateTransferResolutionAmount(Faker faker) => faker.Random.Decimal(1m, 1000m);

  public static RegistrationTaxSpecialCase? GenerateSpecialCase(Faker faker)
    => faker.Random.Bool()
      ? faker.PickRandom<RegistrationTaxSpecialCase>()
      : null;

  public static int GenerateNumberOfPages(Faker faker) => faker.Random.Int(1, 100);

  public static int GenerateNumberOfCopies(Faker faker) => faker.Random.Int(1, 10);

  public static decimal GenerateTenantShareOfStampTaxPercent(Faker faker)
    => faker.Random.Decimal(1m, 20m);

  public static bool GenerateIsVoluntarySanctionApplied(Faker faker) => faker.Random.Bool();

  public RegistrationTaxFaker UseSubjectsIds(IEnumerable<int> subjectsIds)
  {
    SubjectsIds = subjectsIds ?? throw new ArgumentNullException(nameof(subjectsIds));

    return this;
  }

  public RegistrationTaxFaker UseCitiesIds(IEnumerable<int> citiesIds)
  {
    CitiesIds = citiesIds ?? throw new ArgumentNullException(nameof(citiesIds));

    return this;
  }
}
