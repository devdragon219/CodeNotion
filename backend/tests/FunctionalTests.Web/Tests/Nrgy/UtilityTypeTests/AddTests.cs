using HotChocolate.Execution;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core.Shared.Specifications;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.Core;
using RealGimm.Web.Nrgy.Models;
using RealGimm.Core.Nrgy.UtilityTypeAggregate;
using RealGimm.FunctionalTests.Web.Fakers.Nrgy;

namespace RealGimm.FunctionalTests.Web.Tests.Nrgy.UtilityTypeTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class AddTests : EmptyDbWebTest
{
  public string Mutation { get; } = $$"""
    mutation($input: {{nameof(UtilityTypeInput)}}!) {
      utilityType {
        add(input: $input) {
          {{GraphQLHelper.ResultFragment(
              GraphQLHelper.Nrgy.UtilityTypeFragment())}}
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
    var input = new UtilityTypeInputFaker().Generate();

    var addUtilityTypeMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("input", input)
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(addUtilityTypeMutation);

    // Assert
    Assert.NotNull(result);
    Assert.True(result.IsSuccess());

    var addedUtilityTypeId = result!.Data!
      .GetDictionaryValue("utilityType")
      .GetDictionaryValue("add")
      .GetDictionaryValue("value")
      .GetValue<int>("id");

    await using (var scope = Provider.CreateAsyncScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<UtilityType>>();

      var addedUtilityType = await repository.SingleOrDefaultAsync(new GetByIdSpec<UtilityType>(addedUtilityTypeId));
      Assert.NotNull(addedUtilityType);
      AssertHelper.Nrgy.UtilityTypeEqual(input, addedUtilityType);
    }

    await Verify(result);
  }
}
