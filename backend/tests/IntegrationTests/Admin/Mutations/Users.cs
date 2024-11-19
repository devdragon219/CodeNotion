using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using NSubstitute;
using Xunit;
using RealGimm.Infrastructure.IAM.Data;
using RealGimm.Core.IAM.UserAggregate;
using RealGimm.Web.Admin.Models;
using RealGimm.Core.IAM.GroupAggregate;
using RealGimm.Core.EventSystem;
using RealGimm.Infrastructure;

namespace RealGimm.IntegrationTests.Admin.Mutations;

public class Users
{
  [Fact]
  protected async Task Should_CreateUser()
  {
    // Arrange
    await using var context = CreateDbContext();
    var userRepo = new IAMEfRepository<User>(context);
    var groupRepo = new IAMEfRepository<Group>(context);
    var userMutations = new Web.Admin.Mutations.AdminMutations();
    var userName = Guid.NewGuid().ToString();
    var userFirstName = Guid.NewGuid().ToString();
    var userLastName = Guid.NewGuid().ToString();

    var newPassword = Guid.NewGuid().ToString("N");
    var userToCreate = new AdminUserInput(
      userFirstName,
      userLastName,
      userName,
      UserType.Internal,
      OfficeAccess.Both,
      null,
      UserStatus.Active,
      null,
      null,
      DateTime.Now,
      null,
      null,
      null,
      null,
      null,
      newPassword,
      newPassword);

    // Act
    var result = await userMutations.AddUser(userToCreate,
      userRepo,
      groupRepo);

    context.ChangeTracker.Clear();

    // Assert
    Assert.True(result.IsSuccess);

    var createdUser = await context.Set<User>().AsNoTracking()
      .SingleAsync(subject => subject.Id == result.Value.Id);

    Assert.Equal(userName, createdUser.UserName);
    Assert.Equal(userFirstName, createdUser.FirstName);
    Assert.Equal(userLastName, createdUser.LastName);
  }

  [Fact]
  protected async Task Should_CreateUserAndListIt()
  {
    // Arrange
    await using var context = CreateDbContext();
    var userRepo = new IAMEfRepository<User>(context);
    var groupRepo = new IAMEfRepository<Group>(context);
    var userMutations = new Web.Admin.Mutations.AdminMutations();
    var userQueries = new Web.Admin.Queries.AdminQueries();
    var userName = Guid.NewGuid().ToString();
    var userFirstName = Guid.NewGuid().ToString();
    var userLastName = Guid.NewGuid().ToString();

    var newPassword = Guid.NewGuid().ToString("N");

    var userToCreate = new AdminUserInput(
      userFirstName,
      userLastName,
      userName,
      UserType.Internal,
      OfficeAccess.Both,
      null,
      UserStatus.Active,
      null,
      null,
      DateTime.Now,
      null,
      null,
      null,
      null,
      null,
      newPassword,
      newPassword);

    var result = await userMutations.AddUser(userToCreate, userRepo, groupRepo);
    context.ChangeTracker.Clear();

    // Act
    // var foundUser = await userQueries.ListUsers(userRepo)
    //   .FirstOrDefaultAsync(ft => ft.UserName == userName);

    // // Assert
    // Assert.True(result.IsSuccess);
    // Assert.NotNull(foundUser);
    // Assert.NotEqual(0, foundUser.Id);
  }

  protected IAMDbContext CreateDbContext()
    => new(
      CreateNewContextOptions(),
      null,
      SupportedDbDialect.InMemory,
      Substitute.For<IDomainEventDispatcher>());

  private static DbContextOptions<IAMDbContext> CreateNewContextOptions()
  {
    var serviceProvider = new ServiceCollection()
        .AddEntityFrameworkInMemoryDatabase()
        .BuildServiceProvider();

    var builder = new DbContextOptionsBuilder<IAMDbContext>()
      .UseInMemoryDatabase("cleanarchitecture")
      .UseInternalServiceProvider(serviceProvider);

    return builder.Options;
  }
}
