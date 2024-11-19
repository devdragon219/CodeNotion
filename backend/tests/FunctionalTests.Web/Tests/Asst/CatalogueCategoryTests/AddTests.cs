using HotChocolate.Execution;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Web.Asst.Models;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.FunctionalTests.Web.Fakers.Asst;
using RealGimm.Core.Asst.CatalogueCategoryAggregate;
using RealGimm.Core.Asst.CatalogueCategoryAggregate.Specifications;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core;

namespace RealGimm.FunctionalTests.Web.Tests.Asst.CatalogueCategoryTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class AddTests : EmptyDbWebTest
{
  public string Mutation { get; } = $$"""
    mutation($input: {{nameof(CatalogueCategoryInput)}}!) {
      catalogueCategory {
        add(input: $input) {
          {{
            GraphQLHelper.ResultFragment(
              GraphQLHelper.Asst.CatalogueCategoryFragment())
          }}
        }
      }
    }
    """;

  public AddTests(EmptyDbWebFactory factory) : base(factory)
  {
  }

  [Fact]
  public async Task Should_Add()
  {
    // Arrange
    var input = new CatalogueCategoryInputFaker().Generate();

    var addCategoryMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("input", input)
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(addCategoryMutation);

    // Assert
    Assert.NotNull(result);
    Assert.True(result.IsSuccess());

    var addedCategoryId = result.Data!
      .GetDictionaryValue("catalogueCategory")
      .GetDictionaryValue("add")
      .GetDictionaryValue("value")
      .GetValue<int>("id");

    using (var scope = Provider.CreateScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<CatalogueCategory>>();

      var addedCategory = await repository
        .AsQueryable(new GetByIdSpec<CatalogueCategory>(addedCategoryId), new CatalogueCategoryIncludeAllSpec())
        .SingleOrDefaultAsync();

      Assert.NotNull(addedCategory);
      AssertHelper.Asst.CatalogueCategoryEqual(input, addedCategory);
    }

    await Verify(result);
  }
}
