using HotChocolate.Execution;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core;
using RealGimm.Core.Asst.CadastralLandCategoryAggregate;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.Infrastructure.Asst.Data.Fakers;

namespace RealGimm.FunctionalTests.Web.Tests.Asst.CadastralLandCategoryTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class DeleteRangeTests : EmptyDbWebTest
{
  public string Mutation { get; } = $$"""
    mutation($ids: [Int!]!) {
      cadastralLandCategory {
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
    var cadastralLandCategory = new CadastralLandCategoryFaker().Generate(5);
    var cadastralLandCategorysToKeep = cadastralLandCategory.Take(3).ToArray();
    var cadastralLandCategorysToDelete = cadastralLandCategory.Except(cadastralLandCategorysToKeep).ToArray();

    await using (var scope = Provider.CreateAsyncScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<CadastralLandCategory>>();
      await repository.AddRangeAsync(cadastralLandCategory);
    }

    var deleteMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("ids", cadastralLandCategorysToDelete.Select(x => x.Id).ToArray())
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(deleteMutation);

    // Assert
    Assert.NotNull(result);
    Assert.True(result.IsSuccess());

    await using (var scope = Provider.CreateAsyncScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<CadastralLandCategory>>();

      var remainingCadastralLandCategorys = await repository.ListAsync();
      Assert.Equal(cadastralLandCategorysToKeep.Length, remainingCadastralLandCategorys.Count);
      Assert.All(cadastralLandCategorysToKeep, toKeep => remainingCadastralLandCategorys.Select(x => x.Id).Contains(toKeep.Id));

      Assert.DoesNotContain(
        remainingCadastralLandCategorys,
        remaning => cadastralLandCategorysToDelete.Select(toDelete => toDelete.Id).Contains(remaning.Id));
    }
  }
}
