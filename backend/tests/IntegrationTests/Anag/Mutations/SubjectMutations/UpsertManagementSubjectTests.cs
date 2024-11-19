using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Common.CityAggregate;
using Xunit;

namespace RealGimm.IntegrationTests.Anag.Mutations.SubjectMutations;

public class UpsertManagementSubjectTests : UpsertSubjectTestsBase<ManagementSubject>
{
  protected override ManagementSubject CreateSubject1(int? id = null)
  {
    var subject = new ManagementSubject();
    subject.SetFullName("1 Name");
    subject.SetInternalCode("SBJM001");
    subject.SetManagementCode("1 ManagementCode");
    subject.SetBaseCountryTaxIdCode("1 BaseCountryTaxIdCode");

    InitializeProperties1(subject, id);

    subject.AddSelfManagementRelation();
    subject.SetAdditionalTaxIdCode("1 AdditionalTaxIdCode");
    subject.SetBaseCountryISO("1 BaseCountryISO");
    subject.SetLocation("1 Location");
    subject.UpdateBusinessData(DateOnly.FromDateTime(new DateTime(2022, 01, 01)), 10_000, "1 CompaniesHouseIdCode", "1 AdditionalGovIdCode");
    subject.UpdateGroupSignature("1 InterGroupSignature");
    subject.UpdateBankingData("1 BankingId1", "1 BankingId2");

    return subject;
  }

  protected override ManagementSubject CreateSubject2(int? id = null)
  {
    var subject = new ManagementSubject();
    subject.SetFullName("2 Name");
    subject.SetInternalCode("SBJM002");
    subject.SetManagementCode("2 ManagementCode");
    subject.SetBaseCountryTaxIdCode("2 BaseCountryTaxIdCode");

    InitializeProperties1(subject, id);

    subject.AddSelfManagementRelation();
    subject.SetAdditionalTaxIdCode("2 AdditionalTaxIdCode");
    subject.SetBaseCountryISO("2 BaseCountryISO");
    subject.SetLocation("2 Location");
    subject.UpdateBusinessData(DateOnly.FromDateTime(new DateTime(2022, 02, 02)), 20_000, "2 CompaniesHouseIdCode", "2 AdditionalGovIdCode");
    subject.UpdateGroupSignature("2 InterGroupSignature");
    subject.UpdateBankingData("2 BankingId1", "2 BankingId2");

    return subject;
  }

  protected override ManagementSubject CreateSubject3(City city, int? id = null) => CreateSubject1();

  protected override void AssertEqual(ManagementSubject subject1, ManagementSubject subject2)
  {
    base.AssertEqual(subject1, subject2);

    Assert.Equal(subject1.ManagementCode, subject2.ManagementCode);
    Assert.Equal(subject1.BaseCountryTaxIdCode, subject2.BaseCountryTaxIdCode);
    Assert.Equal(subject1.AdditionalTaxIdCode, subject2.AdditionalTaxIdCode);
    Assert.Equal(subject1.BaseCountryISO?.ToUpper(), subject2.BaseCountryISO?.ToUpper());
    Assert.Equal(subject1.Location, subject2.Location);
    Assert.Equal(subject1.BusinessStart, subject2.BusinessStart);
    Assert.Equal(subject1.ShareCapital, subject2.ShareCapital);
    Assert.Equal(subject1.CompaniesHouseIdCode, subject2.CompaniesHouseIdCode);
    Assert.Equal(subject1.InterGroupSignature, subject2.InterGroupSignature);
    Assert.Equal(subject1.AdditionalGovIdCode, subject2.AdditionalGovIdCode);
    Assert.Equal(subject1.BankingId1, subject2.BankingId1);
    Assert.Equal(subject1.BankingId2, subject2.BankingId2);
  }
}
