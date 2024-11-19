using HotChocolate.Execution;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core;
using RealGimm.Core.Fclt.CalendarAggregate;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.Infrastructure.Fclt.Data.Fakers;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.CalendarTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class DeleteRangeTests : EmptyDbWebTest
{
  public string Mutation { get; } = $$"""
    mutation($ids: [Int!]!) {
      calendar {
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
    Calendar[] calendarsToKeep;
    Calendar[] calendarsToDelete;

    await using (var scope = Provider.CreateAsyncScope())
    {
      var calendarFaker = new CalendarFaker();

      var calendars = await scope.ServiceProvider
        .GetRequiredService<IRepository<Calendar>>()
        .AddRangeAsync(calendarFaker.Generate(4));

      calendarsToKeep = calendars.Take(2).ToArray();
      calendarsToDelete = calendars.Except(calendarsToKeep).ToArray();
    }

    var deleteMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("ids", calendarsToDelete.Select(x => x.Id).ToArray())
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(deleteMutation);

    // Assert
    Assert.NotNull(result);
    Assert.True(result.IsSuccess());

    await using (var scope = Provider.CreateAsyncScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<Calendar>>();
      var remainingCalendars = await repository.ListAsync();
      Assert.True(calendarsToKeep.Zip(remainingCalendars).All(pair => pair.First.Id == pair.Second.Id));
    }
  }
}
