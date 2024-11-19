using HotChocolate.Execution;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core;
using RealGimm.Core.Fclt.TicketTypeAggregate;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.Infrastructure.Fclt.Data.Fakers;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.TicketTypeTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class DeleteRangeTests : EmptyDbWebTest
{
  public string Mutation { get; } = $$"""
    mutation($ids: [Int!]!) {
      ticketType {
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
    TicketType[] ticketTypesToKeep;
    TicketType[] ticketTypesToDelete;

    await using (var scope = Provider.CreateAsyncScope())
    {
      var ticketTypeFaker = new TicketTypeFaker();

      var ticketTypes = await scope.ServiceProvider
        .GetRequiredService<IRepository<TicketType>>()
        .AddRangeAsync(ticketTypeFaker.Generate(4));

      ticketTypesToKeep = ticketTypes.Take(2).ToArray();
      ticketTypesToDelete = ticketTypes.Except(ticketTypesToKeep).ToArray();
    }

    var deleteMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("ids", ticketTypesToDelete.Select(x => x.Id).ToArray())
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(deleteMutation);

    // Assert
    Assert.NotNull(result);
    Assert.True(result.IsSuccess());

    await using (var scope = Provider.CreateAsyncScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<TicketType>>();
      var remainingTicketTypes = await repository.ListAsync();
      Assert.True(ticketTypesToKeep.Zip(remainingTicketTypes).All(pair => pair.First.Id == pair.Second.Id));
    }
  }
}
