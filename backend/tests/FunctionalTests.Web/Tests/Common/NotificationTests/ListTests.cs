using HotChocolate.Execution;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core;
using RealGimm.Core.Common.NotificationAggregate;
using RealGimm.Infrastructure.Common.Data.Fakers;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.FunctionalTests.Web.Tests.Common.NotificationTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class ListTests : EmptyDbWebTest
{
  public string Query { get; } = $$"""
    query {
      notification {
        listNotifications {
          {{GraphQLHelper.PagableListFragment(GraphQLHelper.Common.NotificationFragment())}}
        }
      }
    }
    """;

  public ListTests(EmptyDbWebFactory factory) : base(factory)
  {
  }

  [Fact]
  public async Task Should_ListFirstFiveNotifications()
  {
    // Arrange
    await using (var scope = Provider.CreateAsyncScope())
    {
      var userDataProvider = scope.ServiceProvider.GetRequiredService<IUserDataProvider>();
      var notificationFaker = new EstatePortfolioExportIsReadyNotificationFaker(userDataProvider.Username);
      var notificationRepository = scope.ServiceProvider.GetRequiredService<IRepository<Notification>>();

      await notificationRepository.AddRangeAsync(notificationFaker.Generate(5));
    }

    var listQuery = QueryRequestBuilder.New()
      .SetQuery(Query)
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(listQuery);

    // Assert
    await Verify(result);
  }
}
