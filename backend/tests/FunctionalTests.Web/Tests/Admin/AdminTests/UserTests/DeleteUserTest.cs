using System.Reflection;
using HotChocolate.Execution;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core;
using RealGimm.FunctionalTests.Web.Extensions;
using UAgg = RealGimm.Core.IAM.UserAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Asst.EstateUnitTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class DeleteUserTest : BaseDeleteTests
{
  private readonly PasswordHasher<object> _passwordHasher = new();
  public DeleteUserTest(SeededDbWebFactory factory) : base(factory)
  {
  }

  protected override MethodInfo DeleteEndpoint => typeof(RealGimm.Web.Admin.Mutations.AdminMutations).GetMethod(nameof(RealGimm.Web.Admin.Mutations.AdminMutations.DeleteUser))!;
  protected override MethodInfo DeleteRangeEndpoint => typeof(RealGimm.Web.Admin.Mutations.AdminMutations).GetMethod(nameof(RealGimm.Web.Admin.Mutations.AdminMutations.DeleteUser))!;

  [Fact]
  public async Task Should_DeleteById()
  {
    // Insert user
    var newUser = new UAgg.User("demouser1@sample.com", UAgg.UserType.Internal, null);

    using (var scope = Provider.CreateScope())
    {
      var userRepo = scope.ServiceProvider.GetRequiredService<IRepository<UAgg.User>>();
      newUser.SetName("User", "Demo1");

      var hashedNewPassword = _passwordHasher.HashPassword(new object(), "pZt@p4W_ZwJVn3!");
      newUser.SetPassword(hashedNewPassword);

      var insertionResult = await userRepo.AddAsync(newUser);
      newUser.Id = insertionResult.Id;
    }

    // Arrange
    var deleteQuery = QueryRequestBuilder.New()
      .SetQuery(DeleteMutation(12).Replace("id", "userId"))
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(deleteQuery);

    // Assert
    Assert.NotNull(result);
    Assert.True(result.IsSuccess());
    using (var scope = Provider.CreateScope())
    {
      var userRepo = scope.ServiceProvider.GetRequiredService<IRepository<UAgg.User>>();
      var deletedUser = await userRepo.GetByIdAsync(newUser.Id, CancellationToken.None);
      Assert.NotNull(deletedUser?.DeletionDate);
    }
  }
}
