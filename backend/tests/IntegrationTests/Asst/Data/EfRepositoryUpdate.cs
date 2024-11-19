using RealGimm.Core.Asst.EstateAggregate;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Asst.EstateMainUsageTypeAggregate;
using RealGimm.Core.Asst.EstateUsageTypeAggregate;

namespace RealGimm.IntegrationTests.Asst.Data;

public class EfRepositoryUpdate : BaseEfRepoTestFixture
{
  [Fact]
  public async Task UpdatesItemAfterAddingIt()
  {
    // add a project
    var repository = GetAsstRepository<Estate>();
    var initialName = Guid.NewGuid().ToString();
    var estate = new Estate();
    estate.SetName(initialName);
    estate.SetInternalCode(initialName);
    estate.SetStatus(EstateStatus.Operational);
    estate.SetType(EstateType.LandPlotUndeveloped);
    estate.SetOwnership(EstateOwnership.Leasing);
    var emut = new EstateMainUsageType();
    emut.SetName("Main Usage");
    emut.SetInternalCode("C001");
    estate.SetMainUsageType(emut);
    var eut = new EstateUsageType();
    eut.SetName("Usage");
    eut.SetInternalCode("C001");
    estate.SetUsageType(eut);
    estate.SetManagement(8, null);

    await repository.AddAsync(estate);

    // detach the item so we get a different instance
    _asstDbContext.Entry(estate).State = EntityState.Detached;

    // fetch the item and update its title
    var newEstate = (await repository.ListAsync())
        .FirstOrDefault(project => project.Name == initialName);
    if (newEstate == null)
    {
      Assert.NotNull(newEstate);
      return;
    }
    Assert.NotSame(estate, newEstate);
    var newName = Guid.NewGuid().ToString();
    newEstate.SetName(newName);

    // Update the item
    await repository.UpdateAsync(newEstate);

    // Fetch the updated item
    var updatedItem = (await repository.ListAsync())
        .FirstOrDefault(subj => subj.Name == newName);

    Assert.NotNull(updatedItem);
    Assert.NotEqual(estate.Name, updatedItem?.Name);
    Assert.Equal(estate.Status, updatedItem?.Status);
    Assert.Equal(newEstate.Id, updatedItem?.Id);
  }

  [Fact]
  public async Task UpdatesItemAddAddress()
  {
    // add a project
    var repository = GetAsstRepository<Estate>();
    var initialName = Guid.NewGuid().ToString();
    var estate = new Estate();
    estate.SetName(initialName);
    estate.SetInternalCode(initialName);
    estate.SetStatus(EstateStatus.Operational);
    estate.SetType(EstateType.LandPlotUndeveloped);
    estate.SetOwnership(EstateOwnership.Leasing);
    var emut = new EstateMainUsageType();
    emut.SetName("Main Usage");
    emut.SetInternalCode("C001");
    estate.SetMainUsageType(emut);
    var eut = new EstateUsageType();
    eut.SetName("Usage");
    eut.SetInternalCode("C001");
    estate.SetUsageType(eut);
    estate.SetManagement(9, null);
    
    await repository.AddAsync(estate);

    // detach the item so we get a different instance
    _asstDbContext.Entry(estate).State = EntityState.Detached;

    // fetch the item and update its title
    var newEstate = (await repository.ListAsync())
        .FirstOrDefault(project => project.Name == initialName);
    if (newEstate == null)
    {
      Assert.NotNull(newEstate);
      return;
    }
    Assert.NotSame(estate, newEstate);

    var na = new Address();
    na.SetType(AddressType.Primary);
    na.SetToponymy("street Name");
    na.SetCity("city Name", null);

    newEstate.AddAddress(na);

    // Update the item
    await repository.UpdateAsync(newEstate);

    // Fetch the updated item
    var updatedItem = (await repository.ListAsync())
        .FirstOrDefault(subj => subj.Name == newEstate.Name);

    Assert.NotNull(updatedItem);

    Assert.NotEmpty(updatedItem.Addresses);

    Assert.Collection(updatedItem.Addresses,
      address =>
      {
        Assert.Equal("city Name", address.CityName);
        Assert.Equal("street Name", address.Toponymy);
        Assert.Equal(AddressType.Primary, address.AddressType);
      });

    Assert.Equal(estate.Status, updatedItem?.Status);
    Assert.Equal(newEstate.Id, updatedItem?.Id);
  }

}
