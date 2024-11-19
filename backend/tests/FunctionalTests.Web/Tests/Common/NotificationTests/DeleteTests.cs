using HotChocolate.Execution;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core;
using RealGimm.Core.Common.NotificationAggregate;
using RealGimm.Core.Common.VATRateAggregate;
using RealGimm.Core.Shared.Specifications;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.Infrastructure.Common.Data.Fakers;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.FunctionalTests.Web.Tests.Common.NotificationTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class DeleteTests : EmptyDbWebTest
{
  public string Mutation { get; } = $$"""
    mutation($id: Int!) {
      notification {
        delete(id: $id) {
          {{GraphQLHelper.ResultFragment()}}
        }
      }
    }
    """;

  public DeleteTests(EmptyDbWebFactory factory) : base(factory)
  {
  }

  [Fact]
  public async Task Should_Delete()
  {
    // Arrange
    Notification notificationToDelete;

    await using (var scope = Provider.CreateAsyncScope())
    {
      var userDataProvider = scope.ServiceProvider.GetRequiredService<IUserDataProvider>();
      notificationToDelete = new EstatePortfolioExportIsReadyNotificationFaker(userDataProvider.Username).Generate();
      
      await scope.ServiceProvider
        .GetRequiredService<IRepository<Notification>>()
        .AddAsync(notificationToDelete);
    }

    var deleteMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("id", notificationToDelete.Id)
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
      var notifications = await repository.ListAsync();

      Assert.Empty(notifications);
    }
  }
}
