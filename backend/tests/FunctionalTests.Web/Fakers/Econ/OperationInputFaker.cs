using RealGimm.Infrastructure;
using RealGimm.Web.Econ.Models;

namespace RealGimm.FunctionalTests.Web.Fakers.Anag;

public sealed class OperationInputFaker : BaseSeededFaker<OperationInput>
{
  public OperationInputFaker(decimal minAmount)
  {
    CustomInstantiator(faker =>
    {
      var input = new OperationInput
      {
        Date = faker.Date.PastDateOnly(refDate: new DateOnly(2024, 01, 01)),
        Amount = faker.Random.Bool() ? faker.Finance.Amount(1, 10_000) : faker.Finance.Amount(Math.Max(minAmount, -10_000), -1),
        Notes = faker.Lorem.Sentence(),
      };

      return input;
    });
  }
}
