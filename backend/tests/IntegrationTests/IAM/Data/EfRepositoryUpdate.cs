using RealGimm.Core.IAM;
using RealGimm.Core.IAM.GroupAggregate;
using RealGimm.Core.IAM.UserAggregate;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace RealGimm.IntegrationTests.IAM.Data;

public class EfRepositoryUpdate : BaseEfRepoTestFixture
{
  [Fact]
  public async Task UpdatesUserAfterAddingIt()
  {
    // add a project
    var repository = GetUserRepository();
    var initialName = Guid.NewGuid().ToString();
    var initialPassword = Guid.NewGuid().ToString();
    var user = new User(initialName, UserType.Internal, initialPassword);

    await repository.AddAsync(user);

    // detach the item so we get a different instance
    _dbContext.Entry(user).State = EntityState.Detached;

    // fetch the item and update its title
    var newUser = (await repository.ListAsync())
        .FirstOrDefault(project => project.UserName == initialName);

    if (newUser == null)
    {
      Assert.NotNull(newUser);
      return;
    }

    Assert.NotSame(user, newUser);
    
    var newPassword = Guid.NewGuid().ToString();
    newUser.SetPassword(newPassword);

    // Update the item
    await repository.UpdateAsync(newUser);

    // Fetch the updated item
    var updatedItem = (await repository.ListAsync())
        .FirstOrDefault(subj => subj.UserName == initialName);

    Assert.NotNull(updatedItem);
    Assert.NotEqual(user.PasswordHash, updatedItem?.PasswordHash);
    Assert.Equal(newUser.Id, updatedItem?.Id);
  }

  [Fact]
  public async Task AddGroupToUser()
  {
    var userRepo = GetUserRepository();
    var groupRepo = GetGroupRepository();
    var initialName = Guid.NewGuid().ToString();
    var initialPassword = Guid.NewGuid().ToString();
    var user = new User(initialName, UserType.Internal, initialPassword);

    await userRepo.AddAsync(user);

    var initialGroupName = Guid.NewGuid().ToString();
    var group = new Group(initialGroupName);

    await groupRepo.AddAsync(group);

    user.AddGroup(group);

    await userRepo.UpdateAsync(user);

    var newUser = await userRepo.GetByIdAsync(user.Id);

    Assert.NotNull(newUser);

    Assert.Collection(newUser.Groups, g => {
      Assert.Equal(initialGroupName, g.Name);
    });
  }

  [Fact]
  public async Task UpdatesGroupAfterAddingIt()
  {
    // add a group
    var repository = GetGroupRepository();
    var initialName = Guid.NewGuid().ToString();
    var group = new Group(initialName);

    await repository.AddAsync(group);

    // detach the item so we get a different instance
    _dbContext.Entry(group).State = EntityState.Detached;

    // fetch the item and update its title
    var newGroup = (await repository.ListAsync())
        .FirstOrDefault(g => g.Name == initialName);

    if (newGroup == null)
    {
      Assert.NotNull(newGroup);
      return;
    }

    Assert.NotSame(group, newGroup);
    
    var newName = Guid.NewGuid().ToString();
    newGroup.SetGroupName(newName);

    // Update the item
    await repository.UpdateAsync(newGroup);

    // Fetch the updated item
    var updatedItem = (await repository.ListAsync())
        .FirstOrDefault(g => g.Name == newName);

    Assert.NotNull(updatedItem);
    Assert.NotEqual(group.Name, updatedItem?.Name);
    Assert.Equal(newGroup.Id, updatedItem?.Id);
  }

  [Fact]
  public async Task AddsFeatureToGroup()
  {
    var groupRepo = GetGroupRepository();
    var initialName = Guid.NewGuid().ToString();
    var group = new Group(initialName);

    await groupRepo.AddAsync(group);

    group.SetFeature(Features.ADMIN_SETTINGS, true, false, true, false);

    await groupRepo.UpdateAsync(group);

    var newGroup = await groupRepo.GetByIdAsync(group.Id);

    Assert.NotNull(newGroup);
    
    Assert.Collection(newGroup.Features, f => {
      Assert.Equal(Features.ADMIN_SETTINGS, f.Feature);
      Assert.True(f.CanRead);
      Assert.True(f.CanUpdate);
      Assert.False(f.CanCreate);
      Assert.False(f.CanDelete);
    });
  }
}
