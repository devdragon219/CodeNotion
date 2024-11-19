using Bogus;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.CrossModule;
using RealGimm.Core.Prop.AdministrationAggregate;

namespace RealGimm.Infrastructure.Prop.Data.Fakers;

public sealed class AdministrationFaker : BaseSeededFaker<Administration>
{
  public required IEnumerable<int> EstatesIds { get; init; }
  public required IEnumerable<Subject> Subjects { get; init; }

  public AdministrationFaker()
  {
    CustomInstantiator(faker =>
    {
      var administration = new Administration();

      administration.SetEstateId(PickRandomEstateId(faker, EstatesIds!));

      var (subjectId, bankAccountId) = PickRandomAdministrator(faker, Subjects!);
      administration.SetAdministratorSubjectId(subjectId);
      administration.SetAdministratorBankAccountId(bankAccountId);

      administration.SetAdministrationType(PickRandomAdministrationType(faker));
      administration.SetPaymentType(PickRandomPaymentType(faker));

      var (since, until) = GenerateDateRange(faker);
      administration.SetSince(since);
      administration.SetUntil(until);

      administration.SetIsPaymentDataIncluded(GenerateIsPaymentDataIncluded(faker));

      return administration;
    });

    FinishWith((faker, administration) =>
    {
      var validationErrors = administration.Validate().ToList();
      if (validationErrors.Count > 0)
      {
        var errorMessages = string.Join(", ", validationErrors.Select(error => error.ErrorMessage));
        throw new InvalidOperationException($"Invalid {nameof(Administration)} entity! Errors: {errorMessages}");
      }
    });
  }

  public static int PickRandomEstateId(Faker faker, IEnumerable<int> estatesIds) => faker.PickRandom(estatesIds);

  public static (int SubjectId, int? BankAccountId) PickRandomAdministrator(Faker faker, IEnumerable<Subject> subjects)
  {
    var subject = faker.PickRandom(subjects);

    var bankAccount = subject.BankAccounts.Any()
      ? faker.PickRandom<BankAccount>(subject.BankAccounts).Id
      : (int?)null;

    return (subject.Id, bankAccount);
  }

  public static AdministrationType PickRandomAdministrationType(Faker faker) => faker.PickRandom<AdministrationType>();

  public static PaymentType PickRandomPaymentType(Faker faker) => faker.PickRandom<PaymentType>();

  public static (DateOnly Since, DateOnly Until) GenerateDateRange(Faker faker)
  {
    var since = faker.Date.PastDateOnly(refDate: new DateOnly(2024, 02, 01));
    var until = faker.Date.FutureDateOnly(refDate: new DateOnly(2024, 02, 01));

    return (since, until);
  }

  public static bool GenerateIsPaymentDataIncluded(Faker faker) => faker.Random.Bool();
}
