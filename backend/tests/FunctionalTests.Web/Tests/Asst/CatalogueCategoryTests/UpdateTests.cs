using HotChocolate.Execution;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Web.Asst.Models;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.FunctionalTests.Web.Fakers.Asst;
using RealGimm.Core.Asst.CatalogueCategoryAggregate;
using RealGimm.Infrastructure.Asst.Data.Fakers;
using RealGimm.Core.Asst.CatalogueCategoryAggregate.Specifications;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core;

namespace RealGimm.FunctionalTests.Web.Tests.Asst.CatalogueCategoryTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class UpdateTests : EmptyDbWebTest
{
  public string Mutation { get; } = $$"""
    mutation($id: Int!, $input: {{nameof(CatalogueCategoryInput)}}!) {
      catalogueCategory {
        update(id: $id, input: $input) {
          {{
            GraphQLHelper.ResultFragment(
              GraphQLHelper.Asst.CatalogueCategoryFragment())
          }}
        }
      }
    }
    """;

  public UpdateTests(EmptyDbWebFactory factory) : base(factory)
  {
  }

  [Fact]
  public async Task Should_Update()
  {
    // Arrange
    var categoryToUpdate = new CatalogueCategoryFaker().Generate();

    using (var scope = Provider.CreateScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<CatalogueCategory>>();
      await repository.AddAsync(categoryToUpdate);
    }

    var input = new CatalogueCategoryInputFaker().Generate();

    var updateCategoryMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("id", categoryToUpdate.Id)
      .SetVariableValue("input", input)
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(updateCategoryMutation);

    // Assert
    Assert.NotNull(result);
    Assert.True(result.IsSuccess());

    using (var scope = Provider.CreateScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<CatalogueCategory>>();

      var updatedCategory = await repository
        .AsQueryable(new GetByIdSpec<CatalogueCategory>(categoryToUpdate.Id), new CatalogueCategoryIncludeAllSpec())
        .SingleOrDefaultAsync();

      Assert.NotNull(updatedCategory);
      AssertHelper.Asst.CatalogueCategoryEqual(input, updatedCategory);
    }

    await Verify(result);
  }
}
