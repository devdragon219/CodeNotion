using Bogus;
using RealGimm.Core.CrossModule;
using RealGimm.Core.Prop.BillAggregate;
using RealGimm.Core.Prop.ContractAggregate;
using RealGimm.Core.Shared;

namespace RealGimm.Infrastructure.Prop.Data.Fakers;

public sealed class BillFaker : BaseSeededFaker<Bill>
{
  private int _generatedBillsCount = 0;

  public required IEnumerable<Contract> Contracts { get; init; }
  public required BillRowFaker BillRowFaker { get; init; }

  public BillFaker()
  {
    CustomInstantiator(faker =>
    {
      var bill = new Bill();
      bill.SetInternalCode(GenerateInternalCode(number: _generatedBillsCount + 1));
      bill.SetIsOccupiedWithoutRight(GenerateIsOccupiedWithoutRight(faker));
      bill.SetIsInvoiced(GenerateIsInvoiced(faker));
      bill.SetTransactorPaymentType(GenerateTransactorPaymentType(faker));
      bill.SetEmissionType(GenerateEmissionType(faker));
      bill.SetContractBillingPeriod(GenerateContractBillingPeriod(faker));
      bill.SetTotalAmount(GenerateTotalAmount(faker));

      var (year, date, since, until, finalDate) = GenerateDates(faker);
      bill.SetYear(year);
      bill.SetDate(date);
      bill.SetSince(since);
      bill.SetUntil(until);
      bill.SetFinalDate(finalDate);

      var (transactorSubjectId, counterpartSubjectId, estateUnitId, contract) = GenerateContractData(Contracts!, faker);
      bill.SetTransactorSubjectId(transactorSubjectId);
      bill.SetMainCounterpartSubjectId(counterpartSubjectId);
      bill.SetEstateUnitId(estateUnitId);
      bill.SetContract(contract);

      bill.BillRows.AddRange(BillRowFaker!.Generate(faker.Random.Int(1, 3)));

      return bill;
    });

    FinishWith((_, pause) =>
    {
      var validationErrors = pause.Validate().ToList();
      if (validationErrors.Count > 0)
      {
        var errorMessages = string.Join(", ", validationErrors.Select(error => error.ErrorMessage));
        throw new InvalidOperationException($"Invalid {nameof(Bill)} entity! Errors: {errorMessages}");
      }

      _generatedBillsCount++;
    });
  }

  public static string GenerateInternalCode(int number)
    => $"AP{number.ToString().PadLeft(5, '0')}";

  public static bool GenerateIsTemporary(Faker faker)
    => faker.Random.Bool();

  public static bool GenerateIsOccupiedWithoutRight(Faker faker) 
    => faker.Random.Bool();

  public static bool GenerateIsInvoiced(Faker faker) 
    => faker.Random.Bool();

  public static PaymentType GenerateTransactorPaymentType(Faker faker) 
    => faker.PickRandom<PaymentType>();

  public static BillEmissionType GenerateEmissionType(Faker faker) 
    => faker.PickRandom<BillEmissionType>();

  public static BillingPeriod GenerateContractBillingPeriod(Faker faker) 
    => faker.PickRandom<BillingPeriod>();

  public static decimal GenerateTotalAmount(Faker faker)
    => decimal.Round(faker.Random.Decimal(1, 1000), 2);

  public static (int Year, DateOnly Date, DateOnly? Since, DateOnly? Until, DateTime? FinalDate) GenerateDates(Faker faker)
  {
    var date = faker.Date.SoonDateOnly(60, refDate: new DateOnly(2023, 01, 01));
    var since = date;
    var year = date.Year;
    var until = faker.Date.SoonDateOnly(60, refDate: since);
    
    var finalDate = faker.Random.Bool()
      ? until.ToDateTime(TimeOnly.MinValue, DateTimeKind.Utc)
      : (DateTime?)null;

    return (year, date, since, until, finalDate);
  }

  public static (int TransactorSubjectId, int CounterpartSubjectId, int EstateUnitId, Contract Contract) GenerateContractData(
    IEnumerable<Contract> contracts,
    Faker faker)
  {
    var contract = faker.PickRandom(contracts);
    var transactorSubjectId = faker.PickRandom<Transactor>(contract.Transactors).SubjectId;
    var counterpartSubjectId = faker.PickRandom<Counterpart>(contract.Counterparts).SubjectId;
    var estateUnitId = faker.PickRandom<LocatedUnit>(contract.LocatedUnits).EstateUnitId;

    return (transactorSubjectId, counterpartSubjectId, estateUnitId, contract);
  }
}
