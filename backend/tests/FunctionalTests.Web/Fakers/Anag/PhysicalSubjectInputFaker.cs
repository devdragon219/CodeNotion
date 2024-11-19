using Bogus;
using Bogus.DataSets;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Web.Anag.Models;

namespace RealGimm.FunctionalTests.Web.Fakers.Anag;

public sealed class PhysicalSubjectInputFaker : SubjectInputFaker<PhysicalSubjectInput>
{
  protected override PhysicalSubjectInput Generate(Faker faker)
  {
    var input = base.Generate(faker);
    input.BirthSex = faker.PickRandom<BirthSex>();
    input.FirstName = faker.Name.FirstName();
    input.LastName = faker.Name.FindName(firstName: input.FirstName, gender: BirthSexToGender(input.BirthSex.Value));
    input.CustomGender = null;
    input.BirthDate = faker.Date.BetweenDateOnly(new DateOnly(1960, 01, 01), new DateOnly(2000, 01, 01));
    input.BirthLocation = new AddressInputFaker().Generate() with { AddressType = AddressType.BirthLocation };
    input.BirthCountryTaxIdCode = faker.Random.AlphaNumeric(10);
    input.ProfessionalTaxIdCode = faker.Random.AlphaNumeric(10);
    input.DeathDate = null;
    input.Heirs = [];
    input.OwnerManagementSubjectIds = [];


    return input;
  }

  private static Name.Gender BirthSexToGender(BirthSex birthSex)
    => birthSex switch
    {
      BirthSex.Male => Name.Gender.Male,
      BirthSex.Female => Name.Gender.Female,
      _ => throw new NotSupportedException()
    };
}
