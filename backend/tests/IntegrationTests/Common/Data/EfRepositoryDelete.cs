using RealGimm.Core;
using RealGimm.Core.Common.CityAggregate;
using Xunit;

namespace RealGimm.IntegrationTests.Common.Data;

public class EfRepositoryDelete : BaseEfRepoTestFixture
{
  [Fact]
  public async Task DeletesItemAfterAddingIt()
  {
    // add a project
    var repository = GetRepository<City>();
    var initialName = Guid.NewGuid().ToString();
    var initialGuid = Guid.NewGuid();
    var city = new City(initialName, initialGuid, CountryISO3.ITA, Guid.Empty);
    await repository.AddAsync(city);

    // delete the item
    await repository.DeleteAsync(city);

    // verify it's no longer there
    Assert.DoesNotContain(await repository.ListAsync(),
        subj => subj.Name == initialName);
  }
}
