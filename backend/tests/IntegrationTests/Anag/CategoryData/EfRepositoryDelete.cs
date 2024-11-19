using RealGimm.Core.Anag.SubjectCategoryAggregate;
using Xunit;

namespace RealGimm.IntegrationTests.Anag.CategoryData;

public class EfRepositoryDelete : BaseEfRepoTestFixture
{
  [Fact]
  public async Task DeletesItemAfterAddingIt()
  {
    // add a project
    var repository = GetRepository();
    var initialName = Guid.NewGuid().ToString();
    var category = new SubjectCategory(initialName, CategoryFunction.None);
    await repository.AddAsync(category);

    // delete the item
    await repository.DeleteAsync(category);

    // verify it's no longer there
    Assert.DoesNotContain(await repository.ListAsync(),
        subj => subj.Name == initialName);
  }
}
