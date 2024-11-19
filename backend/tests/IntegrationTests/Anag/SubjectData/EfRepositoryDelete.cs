using RealGimm.Core.Anag.SubjectAggregate;
using Xunit;

namespace RealGimm.IntegrationTests.Anag.SubjectData;

public class EfRepositoryDelete : BaseEfRepoTestFixture
{
  [Fact]
  public async Task DeletesItemAfterAddingIt()
  {
    // add a project
    var repository = GetPhysSubjRepository();
    var initialName = Guid.NewGuid().ToString();
    var initialFirstName = Guid.NewGuid().ToString();
    var initialLastName = Guid.NewGuid().ToString();
    var subject = new PhysicalSubject();
    subject.SetInternalCode(initialName);
    subject.SetNames(initialFirstName, initialLastName);
    await repository.AddAsync(subject);

    // delete the item
    await repository.DeleteAsync(subject);

    // verify it's no longer there
    Assert.DoesNotContain(await repository.ListAsync(),
        subj => subj.Name == initialName);
  }

  [Fact]
  public async Task DeletesLegalItemAfterAddingIt()
  {
    // add a project
    var repository = GetLegalSubjRepository();
    var initialName = Guid.NewGuid().ToString();
    var taxIdCode = Guid.NewGuid().ToString();
    var subject = new LegalSubject();
    subject.SetFullName(initialName);
    subject.SetInternalCode(initialName);
    subject.SetBaseCountryTaxIdCode(taxIdCode);
    subject.SetLegalSubjectType(LegalSubjectType.ActualLegalSubject);
    await repository.AddAsync(subject);

    // delete the item
    await repository.DeleteAsync(subject);

    // verify it's no longer there
    Assert.DoesNotContain(await repository.ListAsync(),
        subj => subj.Name == initialName);
  }

  [Fact]
  public async Task DeletesMgmtItemAfterAddingIt()
  {
    // add a project
    var repository = GetMgmtSubjRepository();
    var initialName = Guid.NewGuid().ToString();
    var taxIdCode = Guid.NewGuid().ToString();
    var subject = new ManagementSubject();
    subject.SetFullName(initialName);
    subject.SetInternalCode(initialName);
    subject.SetManagementCode("AAA");
    subject.SetBaseCountryTaxIdCode(taxIdCode);
    
    await repository.AddAsync(subject);

    // delete the item
    await repository.DeleteAsync(subject);

    // verify it's no longer there
    Assert.DoesNotContain(await repository.ListAsync(),
        subj => subj.Name == initialName);
  }
}
