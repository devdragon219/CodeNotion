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
public sealed class MarkReadTests : EmptyDbWebTest
{
  public string Mutation { get; } = $$"""
    mutation($ids: [Int!]) {
      notification {
        markAsRead(ids: $ids) {
          {{GraphQLHelper.ResultFragment()}}
        }
      }
    }
    """;

  public MarkReadTests(EmptyDbWebFactory factory) : base(factory)
  {
  }


  [Theory]
  [InlineData(NotificationStatus.New)]
  [InlineData(NotificationStatus.Unread)]
  public async Task Should_MarkAsRead(NotificationStatus notificationToMarkAsReadInitialStatus)
  {
    // Arrange
    Notification[] notificationsToNotChange;
    Notification notificationToMarkAsRead;

    await using (var scope = Provider.CreateAsyncScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<Notification>>();
      var userDataProvider = scope.ServiceProvider.GetRequiredService<IUserDataProvider>();
      var notificationFaker = new EstatePortfolioExportIsReadyNotificationFaker(userDataProvider.Username);

      notificationsToNotChange = notificationFaker.Generate(2).ToArray();
      await repository.AddRangeAsync(notificationsToNotChange);

      notificationToMarkAsRead = notificationFaker.Generate();
      notificationToMarkAsRead.SetStatus(notificationToMarkAsReadInitialStatus);
      await repository.AddAsync(notificationToMarkAsRead);
    }

    var mutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("ids", new[] { notificationToMarkAsRead.Id })
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

      var unreadNotification = await repository.SingleOrDefaultAsync(new GetByIdSpec<Notification>(notificationToMarkAsRead.Id));
      Assert.NotNull(unreadNotification);
      Assert.Equal(NotificationStatus.Read, unreadNotification.Status);
    }
  }
}
