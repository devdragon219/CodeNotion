using HotChocolate.Execution;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core;
using RealGimm.Core.Asst.CatalogueCategoryAggregate;
using RealGimm.Core.Asst.CatalogueTypeAggregate;
using RealGimm.Core.Asst.EstateUsageTypeAggregate;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.Infrastructure.Asst.Data.Fakers;

namespace RealGimm.FunctionalTests.Web.Tests.Asst.CatalogueTypeTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class DeleteRangeTests : EmptyDbWebTest
{
  public string Mutation { get; } = $$"""
    mutation($ids: [Int!]!) {
      catalogueType {
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
    ICollection<CatalogueType> typesToKeep;
    ICollection<CatalogueType> typesToDelete;

    using (var scope = Provider.CreateScope())
    {
      var categoriesRepository = scope.ServiceProvider.GetRequiredService<IRepository<CatalogueCategory>>();
      var typeRepository = scope.ServiceProvider.GetRequiredService<IRepository<CatalogueType>>();
      var estateUsageTypeRepo = scope.ServiceProvider.GetRequiredService<IRepository<EstateUsageType>>();

      var categories = new CatalogueCategoryFaker().Generate(10);
      await categoriesRepository.AddRangeAsync(categories);

      var estateUsageTypes = new EstateUsageTypeFaker().Generate(10);
      await estateUsageTypeRepo.AddRangeAsync(estateUsageTypes);

      var types = new CatalogueTypeFaker()
        .UseCategories(categories)
        .UseEstateUsageTypes(estateUsageTypes)
        .Generate(4);
      await typeRepository.AddRangeAsync(types);

      typesToKeep = types.Take(2).ToArray();
      typesToDelete = types.Except(typesToKeep).ToArray();
    }

    var deleteMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("ids", typesToDelete.Select(x => x.Id).ToArray())
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(deleteMutation);

    // Assert
    Assert.NotNull(result);
    Assert.True(result.IsSuccess());

    using (var scope = Provider.CreateScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<CatalogueType>>();

      var remainingTypes = await repository.ListAsync();
      Assert.Equal(typesToKeep.Count, remainingTypes.Count);
      Assert.All(typesToKeep, toKeep => remainingTypes.Select(x => x.Id).Contains(toKeep.Id));
      
      Assert.DoesNotContain(
        remainingTypes,
        remaning => typesToDelete.Select(toDelete => toDelete.Id).Contains(remaning.Id));
    }
  }
}
