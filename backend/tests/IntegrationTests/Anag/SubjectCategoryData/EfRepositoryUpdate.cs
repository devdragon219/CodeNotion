using Microsoft.EntityFrameworkCore;
using Xunit;
using RealGimm.Core.Anag.SubjectCategoryAggregate;

namespace RealGimm.IntegrationTests.Anag.SubjectCategoryData;

public class EfRepositoryUpdate : BaseEfRepoTestFixture
{
  [Fact]
  public async Task UpdatesItemAfterAddingIt()
  {
    // add a subject
    var repository = GetRepository();
    var initialName = Guid.NewGuid().ToString();
    var category = new SubjectCategory(initialName, CategoryFunction.Supplier);

    await repository.AddAsync(category);

    // detach the item so we get a different instance
    _dbContext.Entry(category).State = EntityState.Detached;

    // fetch the item and update its title
    var newSubject = (await repository.ListAsync())
        .FirstOrDefault(cat => cat.Name == initialName);
    if (newSubject == null)
    {
      Assert.NotNull(newSubject);
      return;
    }
    Assert.NotSame(category, newSubject);
    var newName = Guid.NewGuid().ToString();
    newSubject.UpdateName(newName);

    // Update the item
    await repository.UpdateAsync(newSubject);

    // Fetch the updated item
    var updatedItem = (await repository.ListAsync())
        .FirstOrDefault(cat => cat.Name == newName);

    Assert.NotNull(updatedItem);
    Assert.NotEqual(category.Name, updatedItem?.Name);
    Assert.Equal(category.Function, updatedItem?.Function);
    Assert.Equal(newSubject.Id, updatedItem?.Id);
  }
}
