using RealGimm.Core.Anag.Services;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Anag.OrgUnitAggregate;
using RealGimm.Core.CrossModule;
using Xunit;

namespace RealGimm.IntegrationTests.Anag.OrgUnitData;
public class OrgUnitGetTreeDetail: BaseEfRepoTestFixture
{
  [Fact]
  public async Task PopulateAndGetOrgUnitTreeNode()
  {
    var repository = GetRepository();
    var ManagementSubjectName = "ManSub1";
    var ManagementSubjectCode = "ManSub1";

    var subject = new ManagementSubject();
    subject.SetFullName(ManagementSubjectName);
    subject.SetInternalCode("MGMTSUB1");
    subject.SetManagementCode(ManagementSubjectCode);
    subject.SetBaseCountryTaxIdCode(Guid.NewGuid().ToString());
    await repository.AddAsync(subject);

    var ouName = "OU1";
    var ouCode = "OU1";

    var couName = "SOU1";
    var couCode = "SOU1";

    var orgUnit = new OrgUnit();
    orgUnit.SetType(OrgUnitType.ManagementHierarchy);
    orgUnit.SetName(ouName);
    orgUnit.SetInternalCode(ouCode);

    var child = new OrgUnit();
    child.SetType(OrgUnitType.ManagementHierarchy);
    child.SetName(couName);
    child.SetInternalCode(couCode);

    orgUnit.AddChild(child);
    
    var nc = new Contact();
    nc.SetContactType(ContactType.Main);
    nc.SetContactInfo(ContactInfoType.MobilePhone, "+00 00000");
    orgUnit.AddContact(nc);
    
    subject.AddOrgUnit(orgUnit);

    await repository.UpdateAsync(subject);

    var orgUnitTreeService = new OrgUnitService(repository, GetRepositoryOu());

    var treeNode = await orgUnitTreeService.ListOrgUnitTreeAsync((int)OrgUnitType.ManagementHierarchy);

    Assert.NotEmpty(treeNode);
    Assert.Collection(treeNode, tn =>
    {
      Assert.True(tn.IsSubject);
      Assert.Collection(tn.Children!, c =>
      {
        Assert.Equal(ouName, c.Name);
        Assert.Collection(c.Children!, cc =>
        {
          Assert.Equal(couName, cc.Name);
        });
      });
    });
  }

  [Fact]
  public async Task PopulateAndGetOrgUnitDetail()
  {
    var repository = GetRepository();
    var repositoryOu = GetRepositoryOu();
    var ManagementSubjectName = "ManSub1";
    var ManagementSubjectCode = "ManSub1";

    var subject = new ManagementSubject();
    subject.SetFullName(ManagementSubjectName);
    subject.SetInternalCode("MGMTSUB2");
    subject.SetManagementCode(ManagementSubjectCode);
    subject.SetBaseCountryTaxIdCode(Guid.NewGuid().ToString());
    await repository.AddAsync(subject);

    var ouName = "OU1";
    var ouCode = "OU1";

    var couName = "SOU1";
    var couCode = "SOU1";

    var orgUnit = new OrgUnit();
    orgUnit.SetType(OrgUnitType.ManagementHierarchy);
    orgUnit.SetName(ouName);
    orgUnit.SetInternalCode(ouCode);
    
    var child = new OrgUnit();
    child.SetType(OrgUnitType.ManagementHierarchy);
    child.SetName(couName);
    child.SetInternalCode(couCode);

    orgUnit.AddChild(child);

    var nc = new Contact();
    nc.SetContactType(ContactType.Main);
    nc.SetContactInfo(ContactInfoType.MobilePhone, "+00 00000");
    orgUnit.AddContact(nc);
    orgUnit.AddGeographicalCities(new int[] { 1, 2, 3 });
    subject.AddOrgUnit(orgUnit);

    await repository.UpdateAsync(subject);

    var orgUnitDetail = (await repositoryOu.ListAsync()).FirstOrDefault(s => s.InternalCode == ouCode);

    Assert.NotNull(orgUnitDetail);
    Assert.NotEmpty(orgUnitDetail.Children);
    Assert.NotEmpty(orgUnitDetail.Contacts);
    Assert.NotEmpty(orgUnitDetail.GeographicalCities!);
  }
}
