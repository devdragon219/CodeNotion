using Bogus;
using RealGimm.Core.Prop.ContractAggregate;
using RealGimm.Core.Prop.RegistrationPaymentAggregate;

namespace RealGimm.Infrastructure.Prop.Data.Fakers;

public sealed class RegistrationPaymentFaker : BaseSeededFaker<RegistrationPayment>
{
  public required IEnumerable<Contract> Contracts { get; init; }

  public RegistrationPaymentFaker()
  {
    CustomInstantiator(faker =>
    {
      var payment = new RegistrationPayment();
      payment.SetPaymentType(PickPaymentType(faker));
      payment.SetPaymentYear(GeneratePaymentYear(faker));
      payment.SetPaymentCode(GeneratePaymentCode(faker));
      payment.SetValueDate(GenerateValueDate(faker));
      payment.SetTaxAmount(GenerateTaxAmount(faker));
      payment.SetSanctionAmount(GenerateSanctionAmount(faker));
      payment.SetContract(PickContract(faker, Contracts!));

      if (payment.PaymentType is RegistrationPaymentType.ManualInput)
      {
        for (int i = 0; i < faker.Random.Int(1, 4); i++)
        {
          var row = new RegistrationPaymentRow();
          row.SetPaymentRowCode((i + 1).ToString().PadLeft(4, '0'));
          row.SetPaymentRowSection(faker.Random.Bool() ? null : faker.Lorem.Sentence());
          row.SetPaymentRowReceivingEntity(faker.Random.Bool() ? null : faker.Random.AlphaNumeric(8).ToUpperInvariant());
          row.SetReferenceYear(faker.Random.Bool() ? payment.PaymentYear : payment.PaymentYear - 1);
          row.SetReferencePeriod(faker.Random.Bool() ? null : faker.Random.Int(1, 12));
          row.SetAmountDue(faker.Finance.Amount(200, 1000));
          row.SetAmountCleared(faker.Finance.Amount(200, 1000));

          payment.Rows.Add(row);
        }
        
        payment.SetTotalAmount(payment.Rows.Sum(row => row.AmountCleared + row.AmountDue) ?? 0);
      }
      else
      {
        payment.SetTotalAmount(GenerateTotalAmount(faker));
      }

      return payment;
    });
  }

  public static RegistrationPaymentType PickPaymentType(Faker faker)
    => faker.PickRandom<RegistrationPaymentType>();

  public static int GeneratePaymentYear(Faker faker) => faker.Random.Int(2020, 2025);

  public static string GeneratePaymentCode(Faker faker)
    => faker.Random.AlphaNumeric(10).ToUpper();

  public static DateOnly GenerateValueDate(Faker faker)
    => faker.Date.BetweenDateOnly(new DateOnly(2020, 01, 01), new DateOnly(2025, 01, 01));

  public static decimal GenerateTaxAmount(Faker faker)
    => decimal.Round(faker.Random.Decimal(100m, 1000m), 2);

  public static decimal GenerateSanctionAmount(Faker faker)
    => decimal.Round(faker.Random.Decimal(100m, 1000m), 2);

  public static decimal GenerateTotalAmount(Faker faker)
    => decimal.Round(faker.Random.Decimal(100m, 2000m), 2);

  public static Contract PickContract(Faker faker, IEnumerable<Contract> contracts)
    => faker.PickRandom(contracts);
}
