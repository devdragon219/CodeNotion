using HotChocolate.Execution;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core.Shared.Specifications;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.Core;
using RealGimm.Web.Asst.Models;
using RealGimm.Core.Asst.CadastralLandCategoryAggregate;
using RealGimm.FunctionalTests.Web.Fakers.Asst;

namespace RealGimm.FunctionalTests.Web.Tests.Asst.CadastralLandCategoryTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class AddTests : EmptyDbWebTest
{
  public string Mutation { get; } = $$"""
    mutation($input: {{nameof(CadastralLandCategoryInput)}}!) {
      cadastralLandCategory {
        add(input: $input) {
          {{GraphQLHelper.ResultFragment(
              GraphQLHelper.Asst.CadastralLandCategoryFragment())}}
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
    var input = new CadastralLandCategoryInputFaker().Generate();

    var addCadastralLandCategoryMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("input", input)
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(addCadastralLandCategoryMutation);

    // Assert
    Assert.NotNull(result);
    Assert.True(result.IsSuccess());

    var addedCadastralLandCategoryId = result!.Data!
      .GetDictionaryValue("cadastralLandCategory")
      .GetDictionaryValue("add")
      .GetDictionaryValue("value")
      .GetValue<int>("id");

    await using (var scope = Provider.CreateAsyncScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<CadastralLandCategory>>();

      var addedCadastralLandCategory = await repository.SingleOrDefaultAsync(new GetByIdSpec<CadastralLandCategory>(addedCadastralLandCategoryId));
      Assert.NotNull(addedCadastralLandCategory);
      AssertHelper.Asst.CadastralLandCategoryEqual(input, addedCadastralLandCategory);
    }

    await Verify(result);
  }
}
