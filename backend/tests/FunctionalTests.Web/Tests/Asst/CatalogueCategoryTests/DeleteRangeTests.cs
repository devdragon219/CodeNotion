using HotChocolate.Execution;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core;
using RealGimm.Core.Asst.CatalogueCategoryAggregate;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.Infrastructure.Asst.Data.Fakers;

namespace RealGimm.FunctionalTests.Web.Tests.Asst.CatalogueCategoryTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class DeleteRangeTests : EmptyDbWebTest
{
  public string Mutation { get; } = $$"""
    mutation($ids: [Int!]!) {
      catalogueCategory {
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
    var catalogueCategories = new CatalogueCategoryFaker().Generate(4);
    var catalogueCategoriesToKeep = catalogueCategories.Take(2).ToArray();
    var catalogueCategoriesToDelete = catalogueCategories.Except(catalogueCategoriesToKeep).ToArray();

    using (var scope = Provider.CreateScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<CatalogueCategory>>();
      await repository.AddRangeAsync(catalogueCategories);
    }

    var deleteMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("ids", catalogueCategoriesToDelete.Select(x => x.Id).ToArray())
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(deleteMutation);

    // Assert
    Assert.NotNull(result);
    Assert.True(result.IsSuccess());

    using (var scope = Provider.CreateScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<CatalogueCategory>>();

      var remainingCatalogueCategories = await repository.ListAsync();
      Assert.Equal(catalogueCategoriesToKeep.Length, remainingCatalogueCategories.Count);
      Assert.All(catalogueCategoriesToKeep, toKeep => remainingCatalogueCategories.Select(x => x.Id).Contains(toKeep.Id));
      
      Assert.DoesNotContain(
        remainingCatalogueCategories,
        remaning => catalogueCategoriesToDelete.Select(toDelete => toDelete.Id).Contains(remaning.Id));
    }
  }
}
