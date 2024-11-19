using HotChocolate.Execution;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core.Shared.Specifications;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.Core;
using RealGimm.Web.Asst.Models;
using RealGimm.Core.Asst.EstateMainUsageTypeAggregate;
using RealGimm.FunctionalTests.Web.Fakers.Asst;

namespace RealGimm.FunctionalTests.Web.Tests.Asst.EstateMainUsageTypeTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class AddTests : EmptyDbWebTest
{
  public string Mutation { get; } = $$"""
    mutation($input: {{nameof(EstateMainUsageTypeInput)}}!) {
      estateMainUsageType {
        add(input: $input) {
          {{GraphQLHelper.ResultFragment(
              GraphQLHelper.Asst.EstateMainUsageTypeFragment())}}
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
    var input = new EstateMainUsageTypeInputFaker().Generate();

    var addEstateMainUsageTypeMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("input", input)
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(addEstateMainUsageTypeMutation);

    // Assert
    Assert.NotNull(result);
    Assert.True(result.IsSuccess());

    var addedEstateMainUsageTypeId = result!.Data!
      .GetDictionaryValue("estateMainUsageType")
      .GetDictionaryValue("add")
      .GetDictionaryValue("value")
      .GetValue<int>("id");

    await using (var scope = Provider.CreateAsyncScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<EstateMainUsageType>>();

      var addedEstateMainUsageType = await repository.SingleOrDefaultAsync(new GetByIdSpec<EstateMainUsageType>(addedEstateMainUsageTypeId));
      Assert.NotNull(addedEstateMainUsageType);
      AssertHelper.Asst.EstateMainUsageTypeEqual(input, addedEstateMainUsageType);
    }

    await Verify(result);
  }
}
