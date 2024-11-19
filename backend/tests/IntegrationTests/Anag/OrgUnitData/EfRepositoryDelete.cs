using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Anag.OrgUnitAggregate;
using Ardalis.Specification;
using Xunit;

namespace RealGimm.IntegrationTests.Anag.OrgUnitData;

public class EfsubRepositoryDelete : BaseEfRepoTestFixture
{
  [Fact]
  public async Task DeleteItemAfterAddingIt()
  {
    var subRepository = GetRepository();

    // add Subject
    var subjectName = Guid.NewGuid().ToString();
    var subject = new ManagementSubject();
    subject.SetFullName(subjectName);
    subject.SetInternalCode("OUDSB01");
    subject.SetManagementCode("AAA");
    subject.SetBaseCountryTaxIdCode(Guid.NewGuid().ToString());
    await subRepository.AddAsync(subject);

    var initOrgUnitName = Guid.NewGuid().ToString();
    var initOrgUnitCode = Guid.NewGuid().ToString();

    // add OrgUnit
    var orgUnit = new OrgUnit();
    orgUnit.SetType(OrgUnitType.ManagementHierarchy);
    orgUnit.SetName(initOrgUnitName);
    orgUnit.SetInternalCode(initOrgUnitCode);
    subject.AddOrgUnit(orgUnit);

    await subRepository.UpdateAsync(subject);

    // existence check on OrgUnit
    var addedOrgUnit = (from elem in subject.OrgUnits where elem.Name == initOrgUnitName select elem).FirstOrDefault();
    Assert.Equal(addedOrgUnit?.Name, initOrgUnitName);
    Assert.Equal(addedOrgUnit?.InternalCode, initOrgUnitCode);
    Assert.NotNull(addedOrgUnit);

    // remove OrgUnit
    subject.RemoveOrgUnit(addedOrgUnit);
    await subRepository.UpdateAsync(subject);

    // existence check on Subject
    var addedSubject = (await subRepository.ListAsync()).FirstOrDefault(project => project.Name == subjectName);
    Assert.NotNull(addedSubject);
    Assert.DoesNotContain(addedOrgUnit, subject.OrgUnits);
    Assert.Empty(addedSubject.OrgUnits);
  }
}
