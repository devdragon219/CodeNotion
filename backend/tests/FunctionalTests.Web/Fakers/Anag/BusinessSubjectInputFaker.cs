using Bogus;
using RealGimm.Web.Anag.Models;

namespace RealGimm.FunctionalTests.Web.Fakers.Anag;

public abstract class BusinessSubjectInputFaker<TInput> : SubjectInputFaker<TInput>
  where TInput : BusinessSubjectInput, new()
{
  protected override TInput Generate(Faker faker)
  {
    var input = base.Generate(faker);
    input.FullName = faker.Name.FullName();
    input.ShorthandDescription = input.FullName;
    input.BaseCountryTaxIdCode = faker.Random.AlphaNumeric(10).ToUpperInvariant();
    input.AdditionalTaxIdCode = faker.Random.AlphaNumeric(10).ToUpperInvariant();
    input.BusinessStart = null;
    input.ShareCapital = null;
    input.CompaniesHouseIdCode = faker.Random.AlphaNumeric(10).ToUpperInvariant();
    input.AdditionalGovIdCode = faker.Random.AlphaNumeric(10).ToUpperInvariant();
    input.InterGroupSignature = faker.Random.AlphaNumeric(10).ToUpperInvariant();
    input.BankingId1 = faker.Random.AlphaNumeric(10).ToUpperInvariant();
    input.BankingId2 = faker.Random.AlphaNumeric(10).ToUpperInvariant();
    input.CompanyGroup = null;

    return input;
  }
}
