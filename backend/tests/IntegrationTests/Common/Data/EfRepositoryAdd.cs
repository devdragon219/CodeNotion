using RealGimm.Core;
using RealGimm.Core.Common.CityAggregate;
using Xunit;

namespace RealGimm.IntegrationTests.Common.Data;

public class EfRepositoryAdd : BaseEfRepoTestFixture
{
  [Fact]
  public async Task AddsCityAndSetsId()
  {
    var testCityName = "testCity";
    var testCityGuid = Guid.NewGuid();
    var repository = GetRepository<City>();
    var city = new City(testCityName, testCityGuid, CountryISO3.ITA, Guid.Empty);

    await repository.AddAsync(city);

    var newCity = (await repository.ListAsync())
                    .FirstOrDefault();

    Assert.Equal(testCityName, newCity?.Name);
    Assert.Equal(testCityGuid, newCity?.Guid);
    Assert.True(newCity?.Id > 0);
  }
}
