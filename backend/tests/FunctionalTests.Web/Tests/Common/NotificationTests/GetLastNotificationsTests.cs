using HotChocolate.Execution;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core;
using RealGimm.Core.Common.NotificationAggregate;
using RealGimm.Infrastructure.Common.Data.Fakers;
using RealGimm.SharedKernel.Interfaces;
using RealGimm.SharedKernel;

namespace RealGimm.FunctionalTests.Web.Tests.Common.NotificationTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class GetLastNotificationsTests : EmptyDbWebTest
{
  public string Query { get; } = $$"""
    query {
      notification {
        lastNotifications {
          {{GraphQLHelper.Common.NotificationFragment()}}
        }
      }
    }
    """;

  public GetLastNotificationsTests(EmptyDbWebFactory factory) : base(factory)
  {
  }

  [Fact]
  public async Task Should_ReturnAllNewNotifications_When_NewNotificationsCountIsBiggerThanLimit()
  {
    // Arrange
    await using (var scope = Provider.CreateAsyncScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<Notification>>();
      var userDataProvider = scope.ServiceProvider.GetRequiredService<IUserDataProvider>();
      var notificationFaker = new EstatePortfolioExportIsReadyNotificationFaker(userDataProvider.Username);
      
      var newNotifications = notificationFaker.Generate(Constants.COUNT_OF_LAST_NOTIFICATIONS_TO_SHOW + 1);
      foreach (var notification in newNotifications)
      {
        notification.SetStatus(NotificationStatus.New);
      }

      await repository.AddRangeAsync(newNotifications);
    }

    var query = QueryRequestBuilder.New()
      .SetQuery(Query)
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(query);

    // Assert
    Assert.NotNull(result);

    var verifySettings = new VerifySettings();
    verifySettings.DontScrubDateTimes();

    await Verify(result, verifySettings);
  }

  [Fact]
  public async Task Should_ReturnLimitCountOfLastNotifications_When_NewNotificationsCountIsLessThanLimit()
  {
    // Arrange
    await using (var scope = Provider.CreateAsyncScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<Notification>>();
      var userDataProvider = scope.ServiceProvider.GetRequiredService<IUserDataProvider>();
      var notificationFaker = new EstatePortfolioExportIsReadyNotificationFaker(userDataProvider.Username);

      var notifications = notificationFaker.Generate(Constants.COUNT_OF_LAST_NOTIFICATIONS_TO_SHOW + 1);
      foreach (var notification in notifications)
      {
        notification.SetStatus(NotificationStatus.Read);
      }

      await repository.AddRangeAsync(notifications);
    }

    var query = QueryRequestBuilder.New()
      .SetQuery(Query)
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(query);

    // Assert
    Assert.NotNull(result);

    var verifySettings = new VerifySettings();
    verifySettings.DontScrubDateTimes();

    await Verify(result, verifySettings);
  }
}
