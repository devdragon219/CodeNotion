using RealGimm.Core.Prop.RegistrationOfficeAggregate;
using Xunit;

namespace RealGimm.IntegrationTests.Prop.RegistrationOfficeData;

public class EfRepositoryAdd : BaseEfRepoTestFixture
{
  [Fact]
  public async Task AddsOfficeAndSetsId()
  {
    var testOffice = "testOffice";
    var testOfficeCode = Guid.NewGuid().ToString();
    var repository = GetRepository();
    var office = new RegistrationOffice();
    office.SetDescription(testOffice);
    office.SetCity(7);
    office.SetExternalCode(testOfficeCode);

    await repository.AddAsync(office);

    var newOffice = (await repository.ListAsync())
                    .FirstOrDefault();

    Assert.Equal(testOffice, newOffice?.Description);
    Assert.Equal(7, newOffice?.CityId);
    Assert.Equal(testOfficeCode, newOffice?.ExternalCode);
    Assert.True(newOffice?.Id > 0);
  }
}
