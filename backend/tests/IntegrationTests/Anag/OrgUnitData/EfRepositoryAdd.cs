using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Anag.OrgUnitAggregate;
using RealGimm.Core.CrossModule;
using Xunit;

namespace RealGimm.IntegrationTests.Anag.OrgUnitData;

public class EfRepositoryAdd : BaseEfRepoTestFixture
{
  [Fact]
  public async Task AddsSubjectAndOrgUnitAndId()
  {
    var repository = GetRepository();
    var subjectName = Guid.NewGuid().ToString();

    var subject = new ManagementSubject();
    subject.SetFullName(subjectName);
    subject.SetInternalCode(subjectName);
    subject.SetManagementCode("AAA");
    subject.SetBaseCountryTaxIdCode(Guid.NewGuid().ToString());

    await repository.AddAsync(subject);

    var ouName = Guid.NewGuid().ToString();
    var ouCode = Guid.NewGuid().ToString();

    var orgUnit = new OrgUnit();
    orgUnit.SetType(OrgUnitType.ManagementHierarchy);
    orgUnit.SetName(ouName);
    orgUnit.SetInternalCode(ouCode);
    subject.AddOrgUnit(orgUnit);

    await repository.UpdateAsync(subject);

    var updatedItem = (await repository.ListAsync()).FirstOrDefault(subj => subj.Name == subjectName);

    Assert.NotNull(updatedItem);

    Assert.NotEmpty(updatedItem.OrgUnits);

    Assert.Collection(updatedItem.OrgUnits,
      ou =>
      {
        Assert.Equal(OrgUnitType.ManagementHierarchy, ou.OrgUnitType);
        Assert.Equal(ouName, ou.Name);
        Assert.Equal(ouCode, ou.InternalCode);
      });
  }

  [Fact]
  public async Task AddOrgUnitContact()
  {
    var repository = GetRepository();

    // add Subject
    var subjectName = Guid.NewGuid().ToString();

    var subject = new ManagementSubject();
    subject.SetFullName(subjectName);
    subject.SetInternalCode(subjectName);
    subject.SetManagementCode("AAA");
    subject.SetBaseCountryTaxIdCode(Guid.NewGuid().ToString());
    await repository.AddAsync(subject);

    // add OrgUnit
    var ouName = Guid.NewGuid().ToString();
    var ouCode = Guid.NewGuid().ToString();

    var orgUnit = new OrgUnit();
    orgUnit.SetType(OrgUnitType.ManagementHierarchy);
    orgUnit.SetName(ouName);
    orgUnit.SetInternalCode(ouCode);
    subject.AddOrgUnit(orgUnit);

    await repository.UpdateAsync(subject);

    // add an OrgUnit ContactInfoType.MobilePhone
    var mobilePhone = "+02-1238120938";
    var c_mobilePhone = new Contact();
    c_mobilePhone.SetContactType(ContactType.Main);
    c_mobilePhone.SetContactInfo(ContactInfoType.MobilePhone, mobilePhone);
    var errors = c_mobilePhone.Validate();
    Assert.Empty(errors);

    // add an OrgUnit ContactInfoType.EMail
    var emailAddress = "email@email.com";
    var c_emailAddress = new Contact();
    c_emailAddress.SetContactType(ContactType.Main);
    c_emailAddress.SetContactInfo(ContactInfoType.EMail, emailAddress);
    errors = c_emailAddress.Validate();
    Assert.Empty(errors);

    orgUnit.AddContact(c_mobilePhone);
    orgUnit.AddContact(c_emailAddress);

    await repository.UpdateAsync(subject);

    var addedSubject = (await repository.ListAsync()).FirstOrDefault(subj => subj.Name == subjectName);
    Assert.NotNull(addedSubject);
    Assert.NotEmpty(addedSubject.OrgUnits);

    Assert.Collection(addedSubject.OrgUnits,
      ou =>
      {
        Assert.Equal(OrgUnitType.ManagementHierarchy, ou.OrgUnitType);
        Assert.Equal(ouName, ou.Name);
        Assert.Equal(ouCode, ou.InternalCode);

        //sequential verification of the OrgUnit contacts
        Assert.Collection(ou.Contacts,
            cnt =>
            {
              Assert.Equal(mobilePhone, cnt.ContactInfo);
              Assert.Equal(ContactType.Main, cnt.ContactType);
              Assert.Equal(ContactInfoType.MobilePhone, cnt.ContactInfoType);
            },

            cnt =>
            {
              Assert.Equal(emailAddress, cnt.ContactInfo);
              Assert.Equal(ContactType.Main, cnt.ContactType);
              Assert.Equal(ContactInfoType.EMail, cnt.ContactInfoType);
            }
        );
      });
  }
}
