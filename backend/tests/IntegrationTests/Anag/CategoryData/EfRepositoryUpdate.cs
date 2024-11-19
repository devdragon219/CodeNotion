using RealGimm.Core.Anag.SubjectCategoryAggregate;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace RealGimm.IntegrationTests.Anag.CategoryData;

public class EfRepositoryUpdate : BaseEfRepoTestFixture
{
  [Fact]
  public async Task UpdatesItemAfterAddingIt()
  {
    // add a project
    var repository = GetRepository();
    var initialName = Guid.NewGuid().ToString();
    var subject = new SubjectCategory(initialName, CategoryFunction.Employee);

    await repository.AddAsync(subject);

    // detach the item so we get a different instance
    _dbContext.Entry(subject).State = EntityState.Detached;

    // fetch the item and update its title
    var newSubject = (await repository.ListAsync())
        .FirstOrDefault(project => project.Name == initialName);
    if (newSubject == null)
    {
      Assert.NotNull(newSubject);
      return;
    }
    Assert.NotSame(subject, newSubject);
    var newName = Guid.NewGuid().ToString();
    newSubject.UpdateName(newName);

    // Update the item
    await repository.UpdateAsync(newSubject);

    // Fetch the updated item
    var updatedItem = (await repository.ListAsync())
        .FirstOrDefault(subj => subj.Name == newName);

    Assert.NotNull(updatedItem);
    Assert.NotEqual(subject.Name, updatedItem?.Name);
    Assert.Equal(subject.Function, updatedItem?.Function);
    Assert.Equal(newSubject.Id, updatedItem?.Id);
  }
}
