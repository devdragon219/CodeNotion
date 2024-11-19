using RealGimm.Core.Anag.SubjectCategoryAggregate;
using Xunit;

namespace RealGimm.IntegrationTests.Anag.SubjectCategoryData;

public class EfRepositoryAdd : BaseEfRepoTestFixture
{
  [Fact]
  public async Task AddsCategoryAndSetsId()
  {
    var testCatName = "testCategory";
    var repository = GetRepository();
    var subject = new SubjectCategory(testCatName, CategoryFunction.AgreementParty);

    await repository.AddAsync(subject);

    var newSubject = (await repository.ListAsync())
                    .FirstOrDefault();

    Assert.Equal(testCatName, newSubject?.Name);
    Assert.Equal(CategoryFunction.AgreementParty, newSubject?.Function);
    Assert.True(newSubject?.Id > 0);
  }
}
