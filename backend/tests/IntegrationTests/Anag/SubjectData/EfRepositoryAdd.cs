using RealGimm.Core.Anag.SubjectAggregate;
using Xunit;

namespace RealGimm.IntegrationTests.Anag.SubjectData;

public class EfRepositoryAdd : BaseEfRepoTestFixture
{
  [Fact]
  public async Task AddsSubjectAndSetsId()
  {
    var repository = GetPhysSubjRepository();
    var initialFirstName = Guid.NewGuid().ToString();
    var initialLastName = Guid.NewGuid().ToString();
    var subject = new PhysicalSubject();
    subject.SetInternalCode(initialFirstName);
    subject.SetNames(initialFirstName, initialLastName);

    await repository.AddAsync(subject);

    var newSubject = (await repository.ListAsync())
                    .FirstOrDefault();

    Assert.Equal(initialFirstName, newSubject?.FirstName);
    Assert.Equal(initialLastName, newSubject?.LastName);
    Assert.True(newSubject?.Id > 0);
  }

  [Fact]
  public async Task AddsLegalSubjectAndSetsId()
  {
    var testSubjectName = "testSubject";
    var repository = GetLegalSubjRepository();
    var taxIdCode = Guid.NewGuid().ToString();
    var subject = new LegalSubject();
    subject.SetFullName(testSubjectName);
    subject.SetInternalCode(taxIdCode);
    subject.SetBaseCountryTaxIdCode(taxIdCode);
    subject.SetLegalSubjectType(LegalSubjectType.ActualLegalSubject);

    await repository.AddAsync(subject);

    var newSubject = (await repository.ListAsync())
                    .FirstOrDefault();

    Assert.Equal(testSubjectName, newSubject?.Name);
    Assert.Equal(taxIdCode, newSubject?.BaseCountryTaxIdCode);
    Assert.True(newSubject?.Id > 0);
  }

  [Fact]
  public async Task AddsMgmtSubjectAndSetsId()
  {
    var testSubjectName = "testSubject";
    var repository = GetMgmtSubjRepository();
    var taxIdCode = Guid.NewGuid().ToString();
    var subject = new ManagementSubject();
    subject.SetFullName(testSubjectName);
    subject.SetInternalCode(taxIdCode);
    subject.SetManagementCode("AAA");
    subject.SetBaseCountryTaxIdCode(taxIdCode);

    await repository.AddAsync(subject);

    var newSubject = (await repository.ListAsync())
                    .FirstOrDefault();

    Assert.Equal(testSubjectName, newSubject?.Name);
    Assert.Equal(taxIdCode, newSubject?.BaseCountryTaxIdCode);
    Assert.True(newSubject?.Id > 0);
  }
}
