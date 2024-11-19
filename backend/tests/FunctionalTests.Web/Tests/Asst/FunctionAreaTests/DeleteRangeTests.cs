using HotChocolate.Execution;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core;
using RealGimm.Core.Asst.FunctionAreaAggregate;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.FunctionalTests.Web.Fakers.Asst;
using RealGimm.Infrastructure.Asst.Data.Fakers;

namespace RealGimm.FunctionalTests.Web.Tests.Asst.FunctionAreaTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class DeleteRangeTests : EmptyDbWebTest
{
  public string Mutation { get; } = $$"""
    mutation($ids: [Int!]!) {
      functionArea {
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
    var functionAreas = new FunctionAreaFaker().Generate(4);
    var functionAreasToKeep = functionAreas.Take(2).ToArray();
    var functionAreasToDelete = functionAreas.Except(functionAreasToKeep).ToArray();

    using (var scope = Provider.CreateScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<FunctionArea>>();
      await repository.AddRangeAsync(functionAreas);
    }

    var deleteMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("ids", functionAreasToDelete.Select(x => x.Id).ToArray())
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(deleteMutation);

    // Assert
    Assert.NotNull(result);
    Assert.True(result.IsSuccess());

    using (var scope = Provider.CreateScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<FunctionArea>>();

      var remainingFunctionAreas = await repository.ListAsync();
      Assert.Equal(functionAreasToKeep.Length, remainingFunctionAreas.Count);
      Assert.All(functionAreasToKeep, toKeep => remainingFunctionAreas.Select(x => x.Id).Contains(toKeep.Id));
      
      Assert.DoesNotContain(
        remainingFunctionAreas,
        remaning => functionAreasToDelete.Select(toDelete => toDelete.Id).Contains(remaning.Id));
    }
  }
}
