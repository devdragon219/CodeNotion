using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Anag.OrgUnitAggregate;
using Xunit;

namespace RealGimm.IntegrationTests.Anag.OrgUnitData;

public class EfRepositoryUpdate : BaseEfRepoTestFixture
{
  [Fact]
  public async Task UpdatesItemAfterAddingIt()
  { 
    var repository = GetRepository();
    var subjectName = Guid.NewGuid().ToString();

    var subject = new ManagementSubject();
    subject.SetFullName(subjectName);
    subject.SetInternalCode(subjectName);
    subject.SetManagementCode("AAA");
    subject.SetBaseCountryTaxIdCode(Guid.NewGuid().ToString());
    await repository.AddAsync(subject);

    var initOrgUnitName = Guid.NewGuid().ToString();
    var initOrgUnitCode = Guid.NewGuid().ToString();

    var orgUnit = new OrgUnit();
    orgUnit.SetType(OrgUnitType.ManagementHierarchy);
    orgUnit.SetName(initOrgUnitName);
    orgUnit.SetInternalCode(initOrgUnitCode);
    subject.AddOrgUnit(orgUnit);

    await repository.UpdateAsync(subject);

    // existence check on Subject
    var addedSubject = (await repository.ListAsync()).FirstOrDefault(project => project.Name == subjectName);
    Assert.NotNull(addedSubject);
    Assert.NotEmpty(addedSubject.OrgUnits);

    // verify name update on OrgUnit
    var addedOrgUnit = (from elem in subject.OrgUnits where elem.Name == initOrgUnitName select elem).FirstOrDefault();
    Assert.Equal(addedOrgUnit?.Name, initOrgUnitName);
    Assert.Equal(addedOrgUnit?.InternalCode, initOrgUnitCode);
    Assert.NotNull(addedOrgUnit);
    
    var orgUnitNewName = Guid.NewGuid().ToString();
    addedOrgUnit?.SetName(orgUnitNewName);

    await repository.UpdateAsync(subject);
    var updatedOrgUnit = (from elem in subject.OrgUnits where elem.Name == orgUnitNewName select elem).FirstOrDefault();
    
    Assert.NotNull(updatedOrgUnit);
    Assert.NotEqual(initOrgUnitName, updatedOrgUnit?.Name);

    // verify code update on OrgUnit
    addedOrgUnit = (from elem in subject.OrgUnits where elem.InternalCode == initOrgUnitCode select elem).FirstOrDefault();
    Assert.NotNull(addedOrgUnit);
    
    var orgUnitNewCode = Guid.NewGuid().ToString();
    addedOrgUnit?.SetInternalCode(orgUnitNewCode);

    await repository.UpdateAsync(subject);
    updatedOrgUnit = (from elem in subject.OrgUnits where elem.InternalCode == orgUnitNewCode select elem).FirstOrDefault();
    
    Assert.NotNull(updatedOrgUnit);
    Assert.NotEqual(initOrgUnitCode, updatedOrgUnit?.InternalCode);
  } 
}
