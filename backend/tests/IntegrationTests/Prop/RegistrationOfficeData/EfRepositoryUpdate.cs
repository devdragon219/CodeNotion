using Microsoft.EntityFrameworkCore;
using Xunit;
using RealGimm.Core.Prop.RegistrationOfficeAggregate;

namespace RealGimm.IntegrationTests.Prop.RegistrationOfficeData;

public class EfRepositoryUpdate : BaseEfRepoTestFixture
{
  [Fact]
  public async Task UpdatesItemAfterAddingIt()
  {
    // add a subject
    var testOffice = "testOffice";
    var testOfficeCode = Guid.NewGuid().ToString();
    var repository = GetRepository();
    var office = new RegistrationOffice();
    office.SetDescription(testOffice);
    office.SetCity(7);
    office.SetExternalCode(testOfficeCode);

    await repository.AddAsync(office);

    // detach the item so we get a different instance
    _dbContext.Entry(office).State = EntityState.Detached;

    // fetch the item and update its title
    var newOffice = (await repository.ListAsync())
        .FirstOrDefault(office => office.Description == testOffice);
    
    Assert.NotNull(newOffice);
    
    Assert.NotSame(office, newOffice);
    var newName = Guid.NewGuid().ToString();
    newOffice.SetDescription(newName);

    // Update the item
    await repository.UpdateAsync(newOffice);

    // Fetch the updated item
    var updatedItem = (await repository.ListAsync())
        .FirstOrDefault(office => office.Description == newName);

    Assert.NotNull(updatedItem);
    Assert.NotEqual(office.Description, updatedItem?.Description);
    Assert.Equal(office.ExternalCode, updatedItem?.ExternalCode);
    Assert.Equal(newOffice.Id, updatedItem?.Id);
  }
}
