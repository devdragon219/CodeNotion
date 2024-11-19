using RealGimm.Core.IAM.UserAggregate;
using RealGimm.Core.IAM.GroupAggregate;
using Xunit;
using RealGimm.Core.IAM;

namespace RealGimm.IntegrationTests.IAM.Data;

public class EfRepositoryAdd : BaseEfRepoTestFixture
{
  [Fact]
  public async Task AddsUserAndSetsId()
  {
    //Note! It will be converted to lowercase. Ensure to specify at least one uppercase
    // for the checks to verify more cases (fails if there is no uppercase characters)
    var testUserName = "testUser";
    var repository = GetUserRepository();
    var passwordHash = Guid.NewGuid().ToString();
    var user = new User(testUserName, UserType.Internal, passwordHash);

    await repository.AddAsync(user);

    var newUser = (await repository.ListAsync())
                    .FirstOrDefault();

    Assert.Equal(testUserName.ToLowerInvariant(), newUser?.UserName);
    Assert.NotEqual(testUserName, newUser?.UserName);
    Assert.Equal(passwordHash, newUser?.PasswordHash);
    Assert.True(newUser?.Id > 0);
  }

  [Fact]
  public async Task AddsGroupAndSetsId()
  {
    var testGroupName = "testGroup";
    var repository = GetGroupRepository();
    var group = new Group(testGroupName);

    await repository.AddAsync(group);

    var newGroup = (await repository.ListAsync())
                    .FirstOrDefault();

    Assert.Equal(testGroupName, newGroup?.Name);
    Assert.True(newGroup?.Id > 0);
  }

  [Fact]
  public async Task AddsGroupPermissionsAndGetItBackSimple()
  {
    var testGroupName = Guid.NewGuid().ToString();
    var repository = GetGroupRepository();
    var group = new Group(testGroupName);

    group.SetFeature(Features.ANAG_SUBJECT_BASE, true, false, true, false);

    var newGroup = await repository.AddAsync(group);

    var grpPermSvc = GetGroupPermissionService();

    var psum = await grpPermSvc.GetPermissionSummaryAsync(new[] { newGroup.Id });

    Assert.Collection(psum, p =>
    {
      Assert.Equal(Features.ANAG_SUBJECT_BASE, p.Feature);
      Assert.True(p.CanRead);
      Assert.False(p.CanCreate);
      Assert.True(p.CanUpdate);
      Assert.False(p.CanDelete);
    });
  }

  [Fact]
  public async Task AddsGroupPermissionsAndGetItBackComplex()
  {
    var repository = GetGroupRepository();

    //Add all features in the ADMIN group
    var testGroupName = Guid.NewGuid().ToString();
    var group = new Group(testGroupName);

    group.SetFeature(Features.ADMIN_AUDIT_LOG, true, false, true, false);
    group.SetFeature(Features.ADMIN_SETTINGS, true, false, true, false);
    group.SetFeature(Features.ADMIN_USERS_AND_GROUPS, true, false, true, false);
    group.SetFeature(Features.ADMIN_CONFIG, true, false, true, false);

    var newGroup = await repository.AddAsync(group);

    var grpPermSvc = GetGroupPermissionService();

    var psum = await grpPermSvc.GetPermissionSummaryAsync(new[] { newGroup.Id });

    var featureTotal = Features.ADMIN_AUDIT_LOG[..^2] + "00";

    Assert.Collection(psum, p =>
    {
      Assert.Equal(featureTotal, p.Feature);
      Assert.True(p.CanRead);
      Assert.False(p.CanCreate);
      Assert.True(p.CanUpdate);
      Assert.False(p.CanDelete);
    });
  }
}
