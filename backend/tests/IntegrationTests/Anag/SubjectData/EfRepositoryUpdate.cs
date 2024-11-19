using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Anag.OrgUnitAggregate;
using Microsoft.EntityFrameworkCore;
using Xunit;
using RealGimm.Core.CrossModule;

namespace RealGimm.IntegrationTests.Anag.SubjectData;

public class EfRepositoryUpdate : BaseEfRepoTestFixture
{
  [Fact]
  public async Task UpdatesItemAfterAddingIt()
  {
    // add a subject
    var repository = GetPhysSubjRepository();
    var initialInternalCode = Guid.NewGuid().ToString();
    var initialFirstName = Guid.NewGuid().ToString();
    var initialLastName = Guid.NewGuid().ToString();
    var subject = new PhysicalSubject();
    subject.SetInternalCode(initialInternalCode);
    subject.SetNames(initialFirstName, initialLastName);

    await repository.AddAsync(subject);

    // detach the item so we get a different instance
    _dbContext.Entry(subject).State = EntityState.Detached;

    // fetch the item and update its title
    var newSubject = await repository.AsQueryable().SingleOrDefaultAsync();
    if (newSubject == null)
    {
      Assert.NotNull(newSubject);
      return;
    }
    Assert.NotSame(subject, newSubject);
    var newFirstName = Guid.NewGuid().ToString();
    var newLastName = Guid.NewGuid().ToString();
    newSubject.SetNames(newFirstName, newLastName);

    // Update the item
    await repository.UpdateAsync(newSubject);

    Assert.NotEqual(subject.Name, newSubject.Name);
    Assert.Equal(subject.PersonType, newSubject.PersonType);
    Assert.NotEqual(subject.FirstName, newSubject.FirstName);
    Assert.NotEqual(subject.LastName, newSubject.LastName);
  }

  [Fact]
  public async Task UpdatesItemAddAddress()
  {
    // add a subject
    var repository = GetPhysSubjRepository();
    var initialCode = Guid.NewGuid().ToString();
    var initialFirstName = Guid.NewGuid().ToString();
    var initialLastName = Guid.NewGuid().ToString();
    var subject = new PhysicalSubject();
    subject.SetInternalCode(initialCode);
    subject.SetNames(initialFirstName, initialLastName);

    await repository.AddAsync(subject);

    // detach the item so we get a different instance
    _dbContext.Entry(subject).State = EntityState.Detached;

    // fetch the item and update its title
    var newSubject = (await repository.ListAsync())
        .FirstOrDefault(sub => sub.InternalCode == initialCode);
    if (newSubject == null)
    {
      Assert.NotNull(newSubject);
      return;
    }
    Assert.NotSame(subject, newSubject);

    var na = new Address();
    na.SetType(AddressType.Fiscal);
    na.SetToponymy("street Name");
    na.SetCity("city Name", null);

    newSubject.AddAddress(na);

    // Update the item
    await repository.UpdateAsync(newSubject);

    // Fetch the updated item
    var updatedItem = (await repository.ListAsync())
        .FirstOrDefault(subj => subj.Name == newSubject.Name);

    Assert.NotNull(updatedItem);

    Assert.NotEmpty(updatedItem.Addresses);

    Assert.Collection(updatedItem.Addresses,
      address =>
      {
        Assert.Equal("city Name", address.CityName);
        Assert.Equal("street Name", address.Toponymy);
        Assert.Equal(AddressType.Fiscal, address.AddressType);
      });

    Assert.Equal(subject.PersonType, updatedItem?.PersonType);
    Assert.Equal(newSubject.Id, updatedItem?.Id);
  }

  [Fact]
  public async Task UpdatesItemAddContact()
  {
    // add a sub
    var repository = GetPhysSubjRepository();
    var initialCode = Guid.NewGuid().ToString();
    var initialFirstName = Guid.NewGuid().ToString();
    var initialLastName = Guid.NewGuid().ToString();

    var subject = new PhysicalSubject();
    subject.SetInternalCode(initialCode);
    subject.SetNames(initialFirstName, initialLastName);

    await repository.AddAsync(subject);

    // detach the item so we get a different instance
    _dbContext.Entry(subject).State = EntityState.Detached;

    // fetch the item and update its title
    var newSubject = (await repository.ListAsync())
        .FirstOrDefault(sub => sub.InternalCode == initialCode);
    if (newSubject == null)
    {
      Assert.NotNull(newSubject);
      return;
    }
    Assert.NotSame(subject, newSubject);

    var nc = new Contact();
    nc.SetContactType(ContactType.Main);
    nc.SetContactInfo(ContactInfoType.LandlinePhone, "+1 (123) 456-7890");

    newSubject.AddContact(nc);

    // Update the item
    await repository.UpdateAsync(newSubject);

    // Fetch the updated item
    var updatedItem = (await repository.ListAsync())
        .FirstOrDefault(subj => subj.Name == newSubject.Name);

    Assert.NotNull(updatedItem);

    Assert.NotEmpty(updatedItem.Contacts);

    Assert.Collection(updatedItem.Contacts,
      contact =>
      {
        Assert.Equal("+1 (123) 456-7890", contact.ContactInfo);
        Assert.Equal(ContactType.Main, contact.ContactType);
        Assert.Equal(ContactInfoType.LandlinePhone, contact.ContactInfoType);
      });

    Assert.Equal(subject.PersonType, updatedItem?.PersonType);
    Assert.Equal(newSubject.Id, updatedItem?.Id);
  }

  [Fact]
  public async Task UpdatesItemAddOrgUnit()
  {
    // add a sub
    var repository = GetPhysSubjRepository();
    var internalCode = Guid.NewGuid().ToString();
    var initialFirstName = Guid.NewGuid().ToString();
    var initialLastName = Guid.NewGuid().ToString();

    var subject = new PhysicalSubject();
    subject.SetInternalCode(internalCode);
    subject.SetNames(initialFirstName, initialLastName);

    await repository.AddAsync(subject);

    // detach the item so we get a different instance
    _dbContext.Entry(subject).State = EntityState.Detached;

    var newSubject = (await repository.ListAsync())
        .FirstOrDefault(sub => sub.InternalCode == internalCode);
    if (newSubject == null)
    {
      Assert.NotNull(newSubject);
      return;
    }
    Assert.NotSame(subject, newSubject);

    var orgUnit = new OrgUnit();
    orgUnit.SetType(OrgUnitType.ManagementHierarchy);
    orgUnit.SetName("name");
    orgUnit.SetInternalCode("internalCode");
    orgUnit.SetExternalCode("externalCode");

    newSubject.AddOrgUnit(orgUnit);

    // Update the item
    await repository.UpdateAsync(newSubject);

    // Fetch the updated item
    var updatedItem = (await repository.ListAsync())
        .FirstOrDefault(subj => subj.Name == newSubject.Name);

    Assert.NotNull(updatedItem);

    Assert.NotEmpty(updatedItem.OrgUnits);

    Assert.Collection(updatedItem.OrgUnits,
      ou =>
      {
        Assert.Equal("name", ou.Name);
        Assert.Equal("internalCode", ou.InternalCode);
        Assert.Equal("externalCode", ou.ExternalCode);
        Assert.Equal(OrgUnitType.ManagementHierarchy, ou.OrgUnitType);
      });

    Assert.Equal(subject.PersonType, updatedItem?.PersonType);
    Assert.Equal(newSubject.Id, updatedItem?.Id);
  }

  [Fact]
  public async Task UpdatesItemAddSubOrganization()
  {
    // add a sub
    var repository = GetLegalSubjRepository();
    var parentName = Guid.NewGuid().ToString();
    var subject = new LegalSubject();
    subject.SetFullName(parentName);
    subject.SetInternalCode(parentName);
    subject.SetBaseCountryTaxIdCode("PARENT_001");
    subject.SetLegalSubjectType(LegalSubjectType.ActualLegalSubject);

    await repository.AddAsync(subject);

    // detach the item so we get a different instance
    _dbContext.Entry(subject).State = EntityState.Detached;

    var newSubject = (await repository.ListAsync())
        .FirstOrDefault(subject => subject.Name == parentName);
    if (newSubject == null)
    {
      Assert.NotNull(newSubject);
      return;
    }
    Assert.NotSame(subject, newSubject);

    // Create the second subject (the sub-org)
    var suborgName = Guid.NewGuid().ToString();
    var suborgTaxCode = "SUBORG_001";
    var suborganization = new LegalSubject();
    suborganization.SetFullName(suborgName);
    suborganization.SetInternalCode(suborgName);
    suborganization.SetBaseCountryTaxIdCode(suborgTaxCode);
    suborganization.SetLegalSubjectType(LegalSubjectType.ActualLegalSubject);

    await repository.AddAsync(suborganization);

    newSubject.AddSubOrganization(suborganization);

    // Update the item
    await repository.UpdateAsync(newSubject);

    // Fetch the updated item
    var updatedItem = (await repository.ListAsync())
        .FirstOrDefault(subj => subj.Name == newSubject.Name);

    Assert.NotNull(updatedItem);

    Assert.NotEmpty(updatedItem.SubOrganizations);

    Assert.Collection(updatedItem.SubOrganizations,
      ou =>
      {
        Assert.Equal(suborgName, ou.Subordinate.Name);
        Assert.Equal(suborgTaxCode, ((LegalSubject)ou.Subordinate).BaseCountryTaxIdCode);
      });
  }

  [Fact]
  public async Task UpdatesItemAddOfficer()
  {
    // add a sub
    var repository = GetLegalSubjRepository();
    var parentName = Guid.NewGuid().ToString();
    var subject = new LegalSubject();
    subject.SetFullName(parentName);
    subject.SetInternalCode(parentName);
    subject.SetBaseCountryTaxIdCode("PARENT_001");
    subject.SetLegalSubjectType(LegalSubjectType.ActualLegalSubject);

    await repository.AddAsync(subject);

    // detach the item so we get a different instance
    _dbContext.Entry(subject).State = EntityState.Detached;

    var newSubject = (await repository.ListAsync())
        .FirstOrDefault(subject => subject.FullName == parentName);
    if (newSubject == null)
    {
      Assert.NotNull(newSubject);
      return;
    }
    Assert.NotSame(subject, newSubject);

    // Create the second subject (the sub-org)
    var physRepo = GetPhysSubjRepository();
    var officerName = Guid.NewGuid().ToString();
    var officerLastName = Guid.NewGuid().ToString();
    var officer = new PhysicalSubject();
    officer.SetInternalCode(officerName);
    officer.SetNames(officerName, officerLastName);

    await physRepo.AddAsync(officer);

    var startDate = DateTime.Now;
    var endDate = startDate.AddMonths(1);

    newSubject.AddOfficer(officer, OfficerType.Trustee, DateOnly.FromDateTime(startDate), DateOnly.FromDateTime(endDate), null);

    // Update the item
    await repository.UpdateAsync(newSubject);

    // Fetch the updated item
    var updatedItem = (await repository.ListAsync())
        .FirstOrDefault(subj => subj.Name == newSubject.Name);

    Assert.NotNull(updatedItem);

    Assert.NotEmpty(updatedItem.Officers);

    Assert.Collection(updatedItem.Officers,
      off =>
      {
        Assert.Equal(officerName, ((PhysicalSubject)off.Subordinate).FirstName);
        Assert.Equal(officerLastName, ((PhysicalSubject)off.Subordinate).LastName);
        Assert.Equal(DateOnly.FromDateTime(startDate), off.Since);
        Assert.Equal(DateOnly.FromDateTime(endDate), off.Until);
        Assert.Equal(OfficerType.Trustee, off.OfficerRelationType);
      });
  }

  [Fact]
  public async Task UpdatesItemAddCompanyGroup()
  {
    // add a sub
    var repository = GetLegalSubjRepository();
    var groupName = Guid.NewGuid().ToString();
    var groupTaxId = "PARENT_GRP";
    var subject = new LegalSubject();
    subject.SetFullName(groupName);
    subject.SetInternalCode(groupName);
    subject.SetBaseCountryTaxIdCode(groupTaxId);
    subject.SetLegalSubjectType(LegalSubjectType.ActualLegalSubject);

    await repository.AddAsync(subject);

    // detach the item so we get a different instance
    _dbContext.Entry(subject).State = EntityState.Detached;

    var newSubject = (await repository.ListAsync())
        .FirstOrDefault(subject => subject.Name == groupName);
    if (newSubject == null)
    {
      Assert.NotNull(newSubject);
      return;
    }
    Assert.NotSame(subject, newSubject);

    // Create the second subject (the company grup member)

    var memberName = Guid.NewGuid().ToString();
    var memberTaxId = Guid.NewGuid().ToString();
    var member = new LegalSubject();
    member.SetFullName(memberName);
    member.SetInternalCode(memberName);
    member.SetBaseCountryTaxIdCode(memberTaxId);
    member.SetLegalSubjectType(LegalSubjectType.ActualLegalSubject);

    await repository.AddAsync(member);

    member.SetCompanyGroupParent(newSubject, true, null);

    // Update the item
    await repository.UpdateAsync(member);

    // Fetch the updated item
    var updatedItem = (await repository.ListAsync())
        .FirstOrDefault(subj => subj.Name == memberName);

    Assert.NotNull(updatedItem);

    Assert.NotNull(updatedItem.CompanyGroupParent);

    Assert.Equal(groupName, updatedItem.CompanyGroupParent.Main.Name);
    Assert.Equal(groupTaxId, ((LegalSubject)updatedItem.CompanyGroupParent.Main).BaseCountryTaxIdCode);
    Assert.Equal(CompanyGroup.Leader, updatedItem.CompanyGroupParent.GroupRelationType);
  }

  [Fact]
  public async Task UpdatesItemAddMgmtSubOwner()
  {
    // add a sub
    var mgmtRepo = GetMgmtSubjRepository();
    var legalRepo = GetLegalSubjRepository();

    var managementName = Guid.NewGuid().ToString();
    var managementTaxId = "PARENT_GRP";
    var mgmtSubj = new ManagementSubject();
    mgmtSubj.SetFullName(managementName);
    mgmtSubj.SetInternalCode(managementName);
    mgmtSubj.SetManagementCode("AAA");
    mgmtSubj.SetBaseCountryTaxIdCode(managementTaxId);

    await mgmtRepo.AddAsync(mgmtSubj);

    // detach the item so we get a different instance
    _dbContext.Entry(mgmtSubj).State = EntityState.Detached;

    var newMgmtSub = (await mgmtRepo.ListAsync())
        .FirstOrDefault(subject => subject.Name == managementName);
    if (newMgmtSub == null)
    {
      Assert.NotNull(newMgmtSub);
      return;
    }
    Assert.NotSame(mgmtSubj, newMgmtSub);

    // Create the second subject (the company grup member)

    var memberName = Guid.NewGuid().ToString();
    var memberTaxId = Guid.NewGuid().ToString();
    var member = new LegalSubject();
    member.SetFullName(memberName);
    member.SetInternalCode(memberName);
    member.SetBaseCountryTaxIdCode(memberTaxId);
    member.SetLegalSubjectType(LegalSubjectType.ActualLegalSubject);

    await legalRepo.AddAsync(member);

    member.AddOwnerManagementSubject(newMgmtSub);

    // Update the item
    await legalRepo.UpdateAsync(member);

    // Fetch the updated item
    var updatedItem = (await legalRepo.ListAsync())
        .FirstOrDefault(subj => subj.Name == memberName);

    Assert.NotNull(updatedItem);

    Assert.NotEmpty(updatedItem.OwningMgmtSubjects);

    Assert.Collection(updatedItem.OwningMgmtSubjects,
      owner =>
      {
        Assert.Equal(managementName, owner.Main.Name);
        Assert.Equal(managementTaxId, ((ManagementSubject)owner.Main).BaseCountryTaxIdCode);
      });
  }
}
