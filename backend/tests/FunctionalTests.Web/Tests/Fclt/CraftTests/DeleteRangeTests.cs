using HotChocolate.Execution;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core;
using RealGimm.Core.Fclt.CraftAggregate;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.Infrastructure.Fclt.Data.Fakers;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.CraftTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class DeleteRangeTests : EmptyDbWebTest
{
  public string Mutation { get; } = $$"""
    mutation($ids: [Int!]!) {
      craft {
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
    Craft[] craftsToKeep;
    Craft[] craftsToDelete;

    await using (var scope = Provider.CreateAsyncScope())
    {
      var craftFaker = new CraftFaker();

      var crafts = await scope.ServiceProvider
        .GetRequiredService<IRepository<Craft>>()
        .AddRangeAsync(craftFaker.Generate(4));

      craftsToKeep = crafts.Take(2).ToArray();
      craftsToDelete = crafts.Except(craftsToKeep).ToArray();
    }

    var deleteMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("ids", craftsToDelete.Select(x => x.Id).ToArray())
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(deleteMutation);

    // Assert
    Assert.NotNull(result);
    Assert.True(result.IsSuccess());

    await using (var scope = Provider.CreateAsyncScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<Craft>>();
      var remainingCrafts = await repository.ListAsync();
      Assert.True(craftsToKeep.Zip(remainingCrafts).All(pair => pair.First.Id == pair.Second.Id));
    }
  }
}
