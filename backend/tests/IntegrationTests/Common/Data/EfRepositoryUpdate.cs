using RealGimm.Core.Common.CityAggregate;
using Microsoft.EntityFrameworkCore;
using Xunit;
using RealGimm.Core;

namespace RealGimm.IntegrationTests.Common.Data;

public class EfRepositoryUpdate : BaseEfRepoTestFixture
{
  [Fact]
  public async Task UpdatesItemAfterAddingIt()
  {
    // add a project
    var repository = GetRepository<City>();
    var initialName = Guid.NewGuid().ToString();
    var initialGuid = Guid.NewGuid();
    var city = new City(initialName, initialGuid, CountryISO3.ITA, Guid.Empty);

    await repository.AddAsync(city);

    // detach the item so we get a different instance
    _dbContext.Entry(city).State = EntityState.Detached;

    // fetch the item and update its title
    var newCity = (await repository.ListAsync())
        .FirstOrDefault(city => city.Name == initialName);

    if (newCity == null)
    {
      Assert.NotNull(newCity);
      return;
    }

    Assert.NotSame(city, newCity);
    var newName = Guid.NewGuid().ToString();
    newCity.SetNames(newName, null, null);

    // Update the item
    await repository.UpdateAsync(newCity);

    // Fetch the updated item
    var updatedItem = (await repository.ListAsync())
        .FirstOrDefault(subj => subj.Name == newName);

    Assert.NotNull(updatedItem);
    Assert.NotEqual(city.Name, updatedItem?.Name);
    Assert.Equal(city.Guid, updatedItem?.Guid);
    Assert.Equal(newCity.Id, updatedItem?.Id);
  }
}
