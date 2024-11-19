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
public sealed class AddRangeTests : EmptyDbWebTest
{
  public string Mutation { get; } = $$"""
    mutation($inputs: [{{nameof(FunctionAreaInput)}}!]!) {
      functionArea {
        addRange(inputs: $inputs) {
          {{GraphQLHelper.ResultFragment(
              GraphQLHelper.Asst.FunctionAreaFragment()
          )}}
        }
      }
    }
    """;

  public AddRangeTests(EmptyDbWebFactory factory) : base(factory)
  {
  }

  [Fact]
  public async Task Should_AddRange()
  {
    // Arrange
    var inputs = new FunctionAreaInputFaker().Generate(2);

    var addFunctionAreaRangeMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("inputs", inputs)
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(addFunctionAreaRangeMutation);

    // Assert
    Assert.NotNull(result);
    Assert.True(result.IsSuccess());

    var addedFunctionAreasIds = result!.Data!
      .GetDictionaryValue("functionArea")
      .GetDictionaryValue("addRange")
      .GetListOfDictionariesValue("value")
      .Select(value => value.GetValue<int>("id"));

    using (var scope = Provider.CreateScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<FunctionArea>>();

      var addedFuctionAreas = await repository.ListAsync(new GetByIdsSpec<FunctionArea>(addedFunctionAreasIds));
      Assert.Equal(inputs.Count, addedFuctionAreas.Count);

      foreach (var (input, functionArea) in inputs.Zip(addedFuctionAreas))
      {
        AssertHelper.Asst.FunctionAreaEqual(input, functionArea);
      }
    }

    await Verify(result);
  }
}
