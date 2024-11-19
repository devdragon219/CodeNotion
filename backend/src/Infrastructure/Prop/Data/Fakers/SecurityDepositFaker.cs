using Bogus;
using RealGimm.Core.Prop.ContractAggregate;

namespace RealGimm.Infrastructure.Prop.Data.Fakers;

public sealed class SecurityDepositFaker : BaseSeededFaker<SecurityDeposit>
{
  public required IDictionary<int, IEnumerable<int>> SubjectsWithBankAccounts { get; init; }

  public SecurityDepositFaker()
  {
    CustomInstantiator(faker =>
    {
      var securityDeposit = new SecurityDeposit();
      securityDeposit.SetBaseAmount(GenerateBaseAmount(faker));
      securityDeposit.SetNotes(GenerateNotes(faker));

      var data = GenerateData(faker, SubjectsWithBankAccounts!);
      securityDeposit.SetSubjectId(data.SubjectId);
      securityDeposit.SetType(data.Type);
      securityDeposit.SetSince(data.Since);
      securityDeposit.SetUntil(data.Until);
      securityDeposit.SetBankingAccountId(data.BankAccountId);
      securityDeposit.SetCashData(data.InterestCalculationStartDate.HasValue, data.InterestCalculationStartDate, data.TakeoverDate);
      securityDeposit.SetSuretyData(data.IsSuretyRenewable, data.SuretySubjectId);

      return securityDeposit;
    });
  }

  public static (SecurityDepositType Type, DateOnly Since, DateOnly? Until, int? SuretySubjectId, bool IsSuretyRenewable, DateOnly? InterestCalculationStartDate, DateOnly? TakeoverDate, int? SubjectId, int? BankAccountId) GenerateData(
    Faker faker,
    IDictionary<int, IEnumerable<int>> subjectsWithBankAccounts)
  {
    var type = faker.PickRandom<SecurityDepositType>();
    var since = faker.Date.PastDateOnly(refDate: new DateOnly(2024, 01, 01));

    switch (type)
    {
      case SecurityDepositType.BankAccount:
      {
        return (type, since, null, null, false, null, null, null, null);
      }

      case SecurityDepositType.BankSurety or SecurityDepositType.InsuranceSurety:
      {
        var until = since.AddDays(faker.Random.Int(30, 60));
        var suretySubjectId = faker.PickRandom<int>(subjectsWithBankAccounts.Keys);
        var isSuretyRenewable = faker.Random.Bool();

        return (type, since, until, suretySubjectId, isSuretyRenewable, null, null, null, null);
      }

      case SecurityDepositType.Cash:
      {
        var interestCalculationStartDate = faker.Random.Bool()
          ? since.AddDays(faker.Random.Int(30, 60))
          : (DateOnly?)null;

        var takeoverDate = faker.Random.Bool()
          ? since.AddDays(faker.Random.Int(30, 60))
          : (DateOnly?)null;

        var subjectId = faker.PickRandom<int>(subjectsWithBankAccounts.Keys);
        var bankAccountId = faker.PickRandom(subjectsWithBankAccounts[subjectId]);

        return (type, since, null, null, false, interestCalculationStartDate, takeoverDate, subjectId, bankAccountId);
      }

      default:
      {
        throw new NotImplementedException();
      }
    }
  }

  public static decimal GenerateBaseAmount(Faker faker)
    => decimal.Round(faker.Random.Decimal(1000m, 10_000m), 2);

  public static string? GenerateNotes(Faker faker)
    => faker.Random.Bool()
      ? faker.Lorem.Sentence(10, 3)
      : null;
}
