using RealGimm.Core.Anag.SubjectCategoryAggregate;
using Xunit;

namespace RealGimm.IntegrationTests.Anag.CategoryData;

public class EfRepositoryAdd : BaseEfRepoTestFixture
{
  [Fact]
  public async Task AddsCategoryAndSetsId()
  {
    var testName = "testCategory";
    var repository = GetRepository();
    var subject = new SubjectCategory(testName, CategoryFunction.None);

    await repository.AddAsync(subject);

    var newSubject = (await repository.ListAsync())
                    .FirstOrDefault();

    Assert.Equal(testName, newSubject?.Name);
    Assert.True(newSubject?.Id > 0);
  }
}
