using RealGimm.Core.IAM.GroupAggregate;
using RealGimm.Core.IAM.UserAggregate;
using Xunit;

namespace RealGimm.IntegrationTests.IAM.Data;

public class EfRepositoryDelete : BaseEfRepoTestFixture
{
  [Fact]
  public async Task DeletesUserAfterAddingIt()
  {
    // add a project
    var repository = GetUserRepository();
    var initialName = Guid.NewGuid().ToString();
    var initialPassword = Guid.NewGuid().ToString();
    var user = new User(initialName, UserType.Internal, initialPassword);
    await repository.AddAsync(user);

    // delete the item
    await repository.DeleteAsync(user);

    // verify it's no longer there
    Assert.DoesNotContain(await repository.ListAsync(),
        subj => subj.UserName == initialName);
  }
  
  [Fact]
  public async Task DeletesGroupAfterAddingIt()
  {
    // add a project
    var repository = GetGroupRepository();
    var initialName = Guid.NewGuid().ToString();
    var group = new Group(initialName);
    await repository.AddAsync(group);

    // delete the item
    await repository.DeleteAsync(group);

    // verify it's no longer there
    Assert.DoesNotContain(await repository.ListAsync(),
        subj => subj.Name == initialName);
  }
}
