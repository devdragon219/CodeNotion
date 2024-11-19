using FunctionalTests.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core;
using RealGimm.Core.IAM.Tasks;
using RealGimm.Core.IAM.UserAggregate;
using RealGimm.Core.IAM.UserAggregate.Specifications;
using RealGimm.SharedKernel;

namespace RealGimm.FunctionalTests.Tasks.IAM;

[Collection(nameof(EmptyDbCollection))]
public class PasswordExpirationJobTests : JobTest<PasswordExpirationJob>
{
  public PasswordExpirationJobTests(EmptyDbHostProvider host) : base(host)
  {
  }

  public override async Task DisposeAsync()
  {
    const int AdminUserId = 1;

    // since db reset ignores IAM tables, we need to manually cleanup it
    await using (var scope = Services.CreateAsyncScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<User>>();
      var usersToDelete = await repository.AsQueryable().Where(user => user.Id != AdminUserId).ToListAsync();
      
      await repository.DeleteRangeAsync(usersToDelete);
    }

    await base.DisposeAsync();
  }

  [Fact]
  public async Task Should_SetExpirationDate_When_PasswordExpired()
  {
    // Arrange
    var currentDateTime = DateTime.UtcNow;
    var username = "user with expired password";

    await using (var scope = Services.CreateAsyncScope())
    {
      var user = new User(username, UserType.Internal, "password");
      user.SetLastPasswordUpdated(currentDateTime.AddDays(-Constants.DEFAULT_PASSWORD_EXPIRATION_DAYS - 1));

      await scope.ServiceProvider.GetRequiredService<IRepository<User>>().AddAsync(user);
    }

    // Act
    await ExecuteJobAsync();

    // Assert
    await using (var scope = Services.CreateAsyncScope())
    {
      var userRepository = scope.ServiceProvider.GetRequiredService<IRepository<User>>();
      var user = await userRepository.SingleOrDefaultAsync(new UserByUsernameSpec(username));
      Assert.NotNull(user);
      Assert.True(user!.PasswordExpiredSince.HasValue);
    }
  }

  [Fact]
  public async Task Should_RemovePassword_When_PasswordExpiredLongAgo()
  {
    // Arrange
    var currentDateTime = DateTime.UtcNow;
    var username = "user with expired password";

    await using (var scope = Services.CreateAsyncScope())
    {
      var user = new User(username, UserType.Internal, "password");
      user.SetLastPasswordUpdated(currentDateTime.AddDays(-Constants.DEFAULT_PASSWORD_EXPIRATION_DAYS - 1));
      user.RemovePassword(currentDateTime.AddDays(-Constants.EXPIRED_PASSWORD_REMOVAL_DAYS - 1));

      await scope.ServiceProvider.GetRequiredService<IRepository<User>>().AddAsync(user);
    }

    // Act
    await ExecuteJobAsync();

    // Assert
    await using (var scope = Services.CreateAsyncScope())
    {
      var userRepository = scope.ServiceProvider.GetRequiredService<IRepository<User>>();
      var user = await userRepository.SingleOrDefaultAsync(new UserByUsernameSpec(username));
      Assert.NotNull(user);
      Assert.Null(user!.PasswordHash);
    }
  }


  [Fact]
  public async Task Should_SendNotification_When_PasswordEpirationIsSoon()
  {
    // Arrange
    var currentDateTime = DateTime.UtcNow;
    var username = "user with a password which is about to expire soon";

    await using (var scope = Services.CreateAsyncScope())
    {
      var user = new User(username, UserType.Internal, "password");
      user.SetLastPasswordUpdated(currentDateTime.AddDays(-Constants.DEFAULT_PASSWORD_EXPIRATION_DAYS + 1));

      await scope.ServiceProvider.GetRequiredService<IRepository<User>>().AddAsync(user);
    }

    // Act
    await ExecuteJobAsync();

    // Assert
    await using (var scope = Services.CreateAsyncScope())
    {
      var userRepository = scope.ServiceProvider.GetRequiredService<IRepository<User>>();
      var user = await userRepository.SingleOrDefaultAsync(new UserByUsernameSpec(username));
      Assert.NotNull(user);
      Assert.NotNull(user.PasswordHash);
    }
  }
}
