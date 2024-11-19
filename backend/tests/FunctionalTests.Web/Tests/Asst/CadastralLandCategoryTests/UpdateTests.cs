using HotChocolate.Execution;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core.Shared.Specifications;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.Core;
using RealGimm.Web.Asst.Models;
using RealGimm.Infrastructure.Asst.Data.Fakers;
using RealGimm.Core.Asst.CadastralLandCategoryAggregate;
using RealGimm.FunctionalTests.Web.Fakers.Asst;

namespace RealGimm.FunctionalTests.Web.Tests.Asst.CadastralLandCategoryTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class UpdateTests : EmptyDbWebTest
{
  public string Mutation { get; } = $$"""
    mutation($id: Int!, $input: {{nameof(CadastralLandCategoryInput)}}!) {
      cadastralLandCategory {
        update(id: $id, input: $input) {
          {{GraphQLHelper.ResultFragment(
              GraphQLHelper.Asst.CadastralLandCategoryFragment()
          )}}
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
    var cadastralLandCategoryToUpdate = new CadastralLandCategoryFaker().Generate();

    using (var scope = Provider.CreateScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<CadastralLandCategory>>();
      await repository.AddAsync(cadastralLandCategoryToUpdate);
    }

    var input = new CadastralLandCategoryInputFaker().Generate();

    var addContractTypeMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("id", cadastralLandCategoryToUpdate.Id)
      .SetVariableValue("input", input)
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(addContractTypeMutation);

    // Assert
    Assert.NotNull(result);
    Assert.True(result.IsSuccess());

    await using (var scope = Provider.CreateAsyncScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<CadastralLandCategory>>();

      var updatedCadastralLandCategory = await repository.SingleOrDefaultAsync(new GetByIdSpec<CadastralLandCategory>(cadastralLandCategoryToUpdate.Id));
      Assert.NotNull(updatedCadastralLandCategory);
      AssertHelper.Asst.CadastralLandCategoryEqual(input, updatedCadastralLandCategory);
    }

    await Verify(result);
  }
}
