using RealGimm.Infrastructure;
using RealGimm.Infrastructure.Prop.Data.Fakers;
using RealGimm.Web.Prop.Models;
using CA = RealGimm.Core.Prop.ContractAggregate;

namespace RealGimm.FunctionalTests.Web.Fakers.Prop;

public sealed class RegistrationPaymentInputFaker : BaseSeededFaker<RegistrationPaymentInput>
{
  public required IEnumerable<CA.Contract> Contracts { get; init; }

  public RegistrationPaymentInputFaker() : base(seed: 1)
  {
    CustomInstantiator(faker =>
    {
      var registrationPayment = new RegistrationPaymentInput()
      {
        ContractId = RegistrationPaymentFaker.PickContract(faker, Contracts!).Id,
        PaymentYear = RegistrationPaymentFaker.GeneratePaymentYear(faker),
        PaymentCode = RegistrationPaymentFaker.GeneratePaymentCode(faker),
        ValueDate = RegistrationPaymentFaker.GenerateValueDate(faker),
        TaxAmount = RegistrationPaymentFaker.GenerateTaxAmount(faker),
        SanctionAmount = RegistrationPaymentFaker.GenerateSanctionAmount(faker)
      };

      for (int i = 0; i < faker.Random.Int(1, 5); i++)
      {
        var row = new RegistrationPaymentRowInput
        {
          PaymentRowCode = (i + 1).ToString().PadLeft(4, '0'),
          PaymentRowSection = faker.Random.Bool() ? null : faker.Lorem.Sentence(),
          PaymentRowReceivingEntity = faker.Random.Bool() ? null : faker.Random.AlphaNumeric(8).ToUpperInvariant(),
          ReferenceYear = faker.Random.Bool() ? registrationPayment.PaymentYear : registrationPayment.PaymentYear - 1,
          ReferencePeriod = faker.Random.Bool() ? null : faker.Random.Int(1, 12),
          AmountDue = faker.Finance.Amount(200, 1000),
          AmountCleared = faker.Finance.Amount(200, 1000)
        };

        registrationPayment.Rows.Add(row);
      }

      registrationPayment.TotalAmount = registrationPayment.Rows.Sum(row => row.AmountCleared + row.AmountDue) ?? 0;

      return registrationPayment;
    });
  }
}
