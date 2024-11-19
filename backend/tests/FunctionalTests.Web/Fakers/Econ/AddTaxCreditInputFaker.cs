using RealGimm.Infrastructure;
using RealGimm.Web.Econ.Models;

namespace RealGimm.FunctionalTests.Web.Fakers.Anag;

public sealed class AddTaxCreditInputFaker : BaseSeededFaker<AddTaxCreditInput>
{
  public AddTaxCreditInputFaker()
  {
    CustomInstantiator(faker =>
    {
      var input = new AddTaxCreditInput
      {
        TaxCode = faker.Random.String2(10),
        Description = faker.Lorem.Sentence(),
        Notes = faker.Lorem.Sentence(),
        Date = faker.Date.PastDateOnly(refDate: new DateOnly(2024, 01, 01)),
        Amount = faker.Finance.Amount(1000, 10_000)
      };

      return input;
    });
  }
}
