using Bogus;
using RealGimm.Web.Anag.Models;

namespace RealGimm.FunctionalTests.Web.Fakers.Anag;

public sealed class ManagementSubjectInputFaker : BusinessSubjectInputFaker<ManagementSubjectInput>
{
  protected override ManagementSubjectInput Generate(Faker faker)
  {
    var input = base.Generate(faker);
    input.ManagementCode = faker.Random.AlphaNumeric(10);

    return input;
  }
}
