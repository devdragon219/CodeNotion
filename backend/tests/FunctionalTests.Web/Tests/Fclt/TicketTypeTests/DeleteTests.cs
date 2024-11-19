using HotChocolate.Execution;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core;
using RealGimm.Core.Fclt.TicketTypeAggregate;
using RealGimm.Core.Shared.Specifications;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.Infrastructure.Fclt.Data.Fakers;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.TicketTypeTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class DeleteTests : EmptyDbWebTest
{
  public string Mutation => $$"""
    mutation($id: Int!) {
      ticketType {
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
    TicketType ticketTypeToDelete;

    await using (var scope = Provider.CreateAsyncScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<TicketType>>();
      var qualificationFaker = new TicketTypeFaker();

      ticketTypeToDelete = await scope.ServiceProvider
        .GetRequiredService<IRepository<TicketType>>()
        .AddAsync(qualificationFaker.Generate());
    }

    var deleteMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("id", ticketTypeToDelete.Id)
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

      var deletedTicketType = await repository.SingleOrDefaultAsync(
        new GetByIdSpec<TicketType>(ticketTypeToDelete.Id));

      Assert.Null(deletedTicketType);
    }
  }
}
