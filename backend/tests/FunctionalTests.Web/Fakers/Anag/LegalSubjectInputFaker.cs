using Bogus;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Web.Anag.Models;

namespace RealGimm.FunctionalTests.Web.Fakers.Anag;

public sealed class LegalSubjectInputFaker : BusinessSubjectInputFaker<LegalSubjectInput>
{
  protected override LegalSubjectInput Generate(Faker faker)
  {
    var input = base.Generate(faker);
    input.LegalSubjectType = faker.PickRandom<LegalSubjectType>();
    input.OwnerManagementSubjectIds = [];

    return input;
  }
}
