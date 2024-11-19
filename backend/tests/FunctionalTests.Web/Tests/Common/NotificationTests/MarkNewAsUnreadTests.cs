using HotChocolate.Execution;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core;
using RealGimm.Core.Common.NotificationAggregate;
using RealGimm.Core.Shared.Specifications;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.Infrastructure.Common.Data.Fakers;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.FunctionalTests.Web.Tests.Common.NotificationTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class MarkNewAsUnreadTests : EmptyDbWebTest
{
  public string Mutation { get; } = $$"""
    mutation($ids: [Int!]) {
      notification {
        markNewAsUnread(ids: $ids) {
          {{GraphQLHelper.ResultFragment()}}
        }
      }
    }
    """;

  public MarkNewAsUnreadTests(EmptyDbWebFactory factory) : base(factory)
  {
  }


  [Fact]
  public async Task Should_MarkNewAsUnread()
  {
    // Arrange
    Notification[] notificationsToNotChange;
    Notification notificationToMarkAsUnread;

    await using (var scope = Provider.CreateAsyncScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<Notification>>();
      var userDataProvider = scope.ServiceProvider.GetRequiredService<IUserDataProvider>();
      var notificationFaker = new EstatePortfolioExportIsReadyNotificationFaker(userDataProvider.Username);
      
      notificationsToNotChange = notificationFaker.Generate(2).ToArray();
      await repository.AddRangeAsync(notificationsToNotChange);

      notificationToMarkAsUnread = notificationFaker.Generate();
      notificationToMarkAsUnread.SetStatus(NotificationStatus.New);
      await repository.AddAsync(notificationToMarkAsUnread);
    }

    var mutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("ids", new[] { notificationToMarkAsUnread.Id })
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(mutation);

    // Assert
    Assert.NotNull(result);
    Assert.True(result.IsSuccess());

    await using (var scope = Provider.CreateAsyncScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<Notification>>();

      var unchangedNotifications = await repository
        .ListAsync(new GetByIdsSpec<Notification>(notificationsToNotChange.Select(notification => notification.Id)));

      Assert.True(notificationsToNotChange
        .Zip(unchangedNotifications)
        .All(notification => notification.First.Status == notification.Second.Status));

      var unreadNotification = await repository.SingleOrDefaultAsync(new GetByIdSpec<Notification>(notificationToMarkAsUnread.Id));
      Assert.NotNull(unreadNotification);
      Assert.Equal(NotificationStatus.Unread, unreadNotification.Status);
    }
  }
}
