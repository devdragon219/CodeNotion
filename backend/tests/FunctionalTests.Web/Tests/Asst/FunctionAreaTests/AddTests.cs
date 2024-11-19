using HotChocolate.Execution;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Web.Asst.Models;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.Core.Asst.FunctionAreaAggregate;
using RealGimm.FunctionalTests.Web.Fakers.Asst;
using RealGimm.Core;

namespace RealGimm.FunctionalTests.Web.Tests.Asst.FunctionAreaTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class AddTests : EmptyDbWebTest
{
  public string Mutation { get; } = $$"""
    mutation($input: {{nameof(FunctionAreaInput)}}!) {
      functionArea {
        add(input: $input) {
          {{GraphQLHelper.ResultFragment(
              GraphQLHelper.Asst.FunctionAreaFragment()
          )}}
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
    var input = new FunctionAreaInputFaker().Generate();

    var addFunctionAreaMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("input", input)
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(addFunctionAreaMutation);

    // Assert
    Assert.NotNull(result);
    Assert.True(result.IsSuccess());

    var addedFunctionAreaId = result!.Data!
      .GetDictionaryValue("functionArea")
      .GetDictionaryValue("add")
      .GetDictionaryValue("value")
      .GetValue<int>("id");

    using (var scope = Provider.CreateScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<FunctionArea>>();

      var addedFuctionArea = await repository.SingleOrDefaultAsync(new GetByIdSpec<FunctionArea>(addedFunctionAreaId));
      Assert.NotNull(addedFuctionArea);
      AssertHelper.Asst.FunctionAreaEqual(input, addedFuctionArea);
    }

    await Verify(result);
  }
}
