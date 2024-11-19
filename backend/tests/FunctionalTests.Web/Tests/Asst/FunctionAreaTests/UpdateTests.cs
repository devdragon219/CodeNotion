using HotChocolate.Execution;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Web.Asst.Models;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.Core.Asst.FunctionAreaAggregate;
using RealGimm.FunctionalTests.Web.Fakers.Asst;
using RealGimm.Core;
using RealGimm.Infrastructure.Asst.Data.Fakers;

namespace RealGimm.FunctionalTests.Web.Tests.Asst.FunctionAreaTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class UpdateTests : EmptyDbWebTest
{
  public string Mutation { get; } = $$"""
    mutation($id: Int!, $input: {{nameof(FunctionAreaInput)}}!) {
      functionArea {
        update(id: $id, input: $input) {
          {{GraphQLHelper.ResultFragment(
              GraphQLHelper.Asst.FunctionAreaFragment()
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
    var functionAreaToUpdate = new FunctionAreaFaker().Generate();

    using (var scope = Provider.CreateScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<FunctionArea>>();
      await repository.AddAsync(functionAreaToUpdate);
    }

    var input = new FunctionAreaInputFaker().Generate();

    var addFunctionAreaMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("id", functionAreaToUpdate.Id)
      .SetVariableValue("input", input)
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(addFunctionAreaMutation);

    // Assert
    Assert.NotNull(result);
    Assert.True(result.IsSuccess());

    using (var scope = Provider.CreateScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<FunctionArea>>();

      var updatedFuctionArea = await repository.SingleOrDefaultAsync(new GetByIdSpec<FunctionArea>(functionAreaToUpdate.Id));
      Assert.NotNull(updatedFuctionArea);
      AssertHelper.Asst.FunctionAreaEqual(input, updatedFuctionArea);
    }

    await Verify(result);
  }
}
