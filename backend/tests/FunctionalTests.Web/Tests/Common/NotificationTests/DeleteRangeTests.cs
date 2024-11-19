using HotChocolate.Execution;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core;
using RealGimm.Core.Common.NotificationAggregate;
using RealGimm.Core.Common.VATRateAggregate;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.Infrastructure.Common.Data.Fakers;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.FunctionalTests.Web.Tests.Common.NotificationTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class DeleteRangeTests : EmptyDbWebTest
{
  public string Mutation { get; } = $$"""
    mutation($ids: [Int!]!) {
      notification {
        deleteRange(ids: $ids) {
          {{GraphQLHelper.ResultFragment()}}
        }
      }
    }
    """;

  public DeleteRangeTests(EmptyDbWebFactory factory) : base(factory)
  {
  }


  [Fact]
  public async Task Should_DeleteRange()
  {
    // Arrange
    Notification[] notificationsToKeep;
    Notification[] notificationsToDelete;

    await using (var scope = Provider.CreateAsyncScope())
    {
      var userDataProvider = scope.ServiceProvider.GetRequiredService<IUserDataProvider>();
      var notificationFaker = new EstatePortfolioExportIsReadyNotificationFaker(userDataProvider.Username);
      
      notificationsToKeep = notificationFaker.Generate(2).ToArray();
      notificationsToDelete = notificationFaker.Generate(2).ToArray();

      var repository = scope.ServiceProvider.GetRequiredService<IRepository<Notification>>();
      await repository.AddRangeAsync(notificationsToKeep);
      await repository.AddRangeAsync(notificationsToDelete);
    }

    var deleteMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("ids", notificationsToDelete.Select(x => x.Id).ToArray())
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(deleteMutation);

    // Assert
    Assert.NotNull(result);
    Assert.True(result.IsSuccess());

    await using (var scope = Provider.CreateAsyncScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<Notification>>();

      var remainingNotifications = await repository.ListAsync();
      Assert.Equal(notificationsToKeep.Length, remainingNotifications.Count);
      Assert.True(notificationsToKeep.All(toKeep => remainingNotifications.Select(x => x.Id).Contains(toKeep.Id)));

      Assert.DoesNotContain(
        remainingNotifications,
        remaning => notificationsToDelete.Select(toDelete => toDelete.Id).Contains(remaning.Id));
    }
  }
}
