using HotChocolate.Execution;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core;
using RealGimm.Core.Nrgy.UtilityTypeAggregate;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.Infrastructure.Nrgy.Data.Fakers;

namespace RealGimm.FunctionalTests.Web.Tests.Nrgy.UtilityTypeTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class DeleteRangeTests : EmptyDbWebTest
{
  public string Mutation { get; } = $$"""
    mutation($ids: [Int!]!) {
      utilityType {
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
    var utilityType = new UtilityTypeFaker().Generate(4);
    var utilityTypesToKeep = utilityType.Take(2).ToArray();
    var utilityTypesToDelete = utilityType.Except(utilityTypesToKeep).ToArray();

    await using (var scope = Provider.CreateAsyncScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<UtilityType>>();
      await repository.AddRangeAsync(utilityType);
    }

    var deleteMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("ids", utilityTypesToDelete.Select(x => x.Id).ToArray())
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(deleteMutation);

    // Assert
    Assert.NotNull(result);
    Assert.True(result.IsSuccess());

    await using (var scope = Provider.CreateAsyncScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<UtilityType>>();
      var remainingUtilityTypes = await repository.ListAsync();
      Assert.True(utilityTypesToKeep.Zip(remainingUtilityTypes).All(pair => pair.First.Id == pair.Second.Id));
    }
  }
}
