using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Common.CityAggregate;
using Xunit;

namespace RealGimm.IntegrationTests.Anag.Mutations.SubjectMutations;

public class UpsertPhysicalSubjectTests : UpsertSubjectTestsBase<PhysicalSubject>
{
  protected override PhysicalSubject CreateSubject1(int? id = null)
  {
    var subject = new PhysicalSubject();
    subject.SetInternalCode("SBJP001");
    subject.SetNames("1 FirstName", "1 LastName");

    InitializeProperties1(subject, id);

    subject.SetCustomGender(1);
    subject.SetLifePeriod(DateOnly.FromDateTime(new DateTime(2022, 01, 01)), null);
    subject.SetBirthCountryTaxIdCode("1 BirthCountryTaxIdCode");
    subject.SetProfessionalTaxIdCode("1 ProfessionalTaxIdCode");
    subject.SetBirthLocation(CreateAddress(AddressType.BirthLocation, id + 9));
    subject.SetBirthSex(BirthSex.Male);

    return subject;
  }

  protected override PhysicalSubject CreateSubject2(int? id = null)
  {
    var subject = new PhysicalSubject();
    subject.SetInternalCode("SBJP002");
    subject.SetNames("2 FirstName", "2 LastName");

    InitializeProperties2(subject, id);

    subject.SetCustomGender(2);
    subject.SetLifePeriod(DateOnly.FromDateTime(new DateTime(2022, 02, 02)), null);
    subject.SetBirthCountryTaxIdCode("2 BirthCountryTaxIdCode");
    subject.SetProfessionalTaxIdCode("2 ProfessionalTaxIdCode");
    subject.SetBirthLocation(CreateAddress(AddressType.BirthLocation, id + 9));
    subject.SetBirthSex(BirthSex.Male);

    return subject;
  }

  protected override PhysicalSubject CreateSubject3(City city, int? id = null)
  {
    var subject = new PhysicalSubject();
    subject.SetNames("CARLOTTA", "CAPUTO");

    InitializeProperties2(subject, id);

    subject.SetCustomGender(2);
    subject.SetLifePeriod(DateOnly.FromDateTime(new DateTime(2022, 02, 02)), null);
    subject.SetBirthCountryTaxIdCode("CPTCLT62H41L061L");
    subject.SetProfessionalTaxIdCode("");
    subject.SetBirthDate(DateOnly.FromDateTime(new DateTime(1962, 6, 1)));
    subject.SetBirthLocation(CreateAddress2(AddressType.BirthLocation, city, id + 9));
    subject.SetBirthSex(BirthSex.Female);

    return subject;
  }

  protected override void AssertEqual(PhysicalSubject subject1, PhysicalSubject subject2)
  {
    base.AssertEqual(subject1, subject2);

    Assert.Equal(subject1.FirstName, subject2.FirstName);
    Assert.Equal(subject1.LastName, subject2.LastName);
    Assert.Equal(subject1.CustomGender, subject2.CustomGender);
    Assert.Equal(subject1.BirthDate, subject2.BirthDate);
    Assert.Equal(subject1.DeathDate, subject2.DeathDate);
    Assert.Equal(subject1.BirthCountryTaxIdCode, subject2.BirthCountryTaxIdCode);
    Assert.Equal(subject1.ProfessionalTaxIdCode, subject2.ProfessionalTaxIdCode);
  }
}
