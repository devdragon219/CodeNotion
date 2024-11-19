using Bogus;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Prop.AdministrationAggregate;
using RealGimm.Core.Prop.AdministrationTermAggregate;

namespace RealGimm.Infrastructure.Prop.Data.Fakers;

public sealed class AdministrationTermFaker : BaseSeededFaker<AdministrationTerm>
{
  public IEnumerable<Administration>? Administrations { get; init; }
  public Faker<TermInstallment>? FakerInstallment { get; init; }

  public AdministrationTermFaker()
  {
    CustomInstantiator(faker =>
    {
      var administrationTerm = new AdministrationTerm();
      administrationTerm.SetTermType(PickTermType(faker));
      administrationTerm.SetName(GenerateName(faker));
      administrationTerm.SetExpectedAmount(GenerateExpectedAmount(faker));

      var (since, until) = GenerateDateRange(faker);
      administrationTerm.SetSince(since);
      administrationTerm.SetUntil(until);

      if (Administrations is not null && Administrations.Any())
        administrationTerm.SetAdministration(PickRandomAdministration(faker, Administrations));

      if (FakerInstallment is not null)
      {
        var amountOfTerms = GenerateAmountOfTerms(faker);
        administrationTerm.AddInstallments(FakerInstallment.Generate(amountOfTerms));
      }

      return administrationTerm;
    });

    FinishWith((faker, administrationTerm) =>
    {
      var validationErrors = administrationTerm.Validate().ToList();
      if (validationErrors.Count > 0)
      {
        var errorMessages = string.Join(", ", validationErrors.Select(error => error.ErrorMessage));
        throw new InvalidOperationException($"Invalid {nameof(AdministrationTerm)} entity! Errors: {errorMessages}");
      }
    });
  }

  public static (int SubjectId, int? BankAccountId) PickRandomAdministrator(Faker faker, IEnumerable<Subject> subjects)
  {
    var subject = faker.PickRandom(subjects);

    var bankAccount = subject.BankAccounts.Any()
      ? faker.PickRandom<BankAccount>(subject.BankAccounts).Id
      : (int?)null;

    return (subject.Id, bankAccount);
  }

  public static TermType PickTermType(Faker faker) => faker.PickRandom<TermType>();

  public static string GenerateName(Faker faker) => faker.Random.Word();

  public static decimal GenerateExpectedAmount(Faker faker) =>
    decimal.Round(faker.Random.Decimal(10, 1000), 2);

  public static (DateOnly Since, DateOnly Until) GenerateDateRange(Faker faker)
  {
    var since = faker.Date.PastDateOnly(refDate: new DateOnly(2024, 02, 01));
    var until = faker.Date.FutureDateOnly(refDate: new DateOnly(2024, 02, 01));

    return (since, until);
  }
  public static Administration PickRandomAdministration(Faker faker, IEnumerable<Administration> administrations) => faker.PickRandom(administrations);
  public static int GenerateAmountOfTerms(Faker faker) => faker.Random.Int(1, 3);

}
