using HotChocolate.Execution;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core;
using RealGimm.Core.Fclt.InterventionTypeAggregate;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.Infrastructure.Fclt.Data.Fakers;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.InterventionTypeTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class DeleteRangeTests : EmptyDbWebTest
{
  public string Mutation { get; } = $$"""
    mutation($ids: [Int!]!) {
      interventionType {
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
    InterventionType[] interventionTypesToKeep;
    InterventionType[] interventionTypesToDelete;

    await using (var scope = Provider.CreateAsyncScope())
    {
      var interventionTypeFaker = new InterventionTypeFaker();

      var interventionTypes = await scope.ServiceProvider
        .GetRequiredService<IRepository<InterventionType>>()
        .AddRangeAsync(interventionTypeFaker.Generate(4));

      interventionTypesToKeep = interventionTypes.Take(2).ToArray();
      interventionTypesToDelete = interventionTypes.Except(interventionTypesToKeep).ToArray();
    }

    var deleteMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("ids", interventionTypesToDelete.Select(x => x.Id).ToArray())
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(deleteMutation);

    // Assert
    Assert.NotNull(result);
    Assert.True(result.IsSuccess());

    await using (var scope = Provider.CreateAsyncScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<InterventionType>>();
      var remainingInterventionTypes = await repository.ListAsync();
      Assert.True(interventionTypesToKeep.Zip(remainingInterventionTypes).All(pair => pair.First.Id == pair.Second.Id));
    }
  }
}
