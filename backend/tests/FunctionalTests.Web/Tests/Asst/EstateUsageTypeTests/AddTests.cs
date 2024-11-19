using HotChocolate.Execution;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core.Shared.Specifications;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.Core;
using RealGimm.Web.Asst.Models;
using RealGimm.Core.Asst.EstateUsageTypeAggregate;
using RealGimm.FunctionalTests.Web.Fakers.Asst;

namespace RealGimm.FunctionalTests.Web.Tests.Asst.EstateUsageTypeTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class AddTests : EmptyDbWebTest
{
  public string Mutation { get; } = $$"""
    mutation($input: {{nameof(EstateUsageTypeInput)}}!) {
      estateUsageType {
        add(input: $input) {
          {{GraphQLHelper.ResultFragment(
              GraphQLHelper.Asst.EstateUsageTypeFragment())}}
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
    var input = new EstateUsageTypeInputFaker().Generate();

    var addEstateUsageTypeMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("input", input)
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(addEstateUsageTypeMutation);

    // Assert
    Assert.NotNull(result);
    Assert.True(result.IsSuccess());

    var addedEstateUsageTypeId = result!.Data!
      .GetDictionaryValue("estateUsageType")
      .GetDictionaryValue("add")
      .GetDictionaryValue("value")
      .GetValue<int>("id");

    await using (var scope = Provider.CreateAsyncScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<EstateUsageType>>();

      var addedEstateUsageType = await repository.SingleOrDefaultAsync(new GetByIdSpec<EstateUsageType>(addedEstateUsageTypeId));
      Assert.NotNull(addedEstateUsageType);
      AssertHelper.Asst.EstateUsageTypeEqual(input, addedEstateUsageType);
    }

    await Verify(result);
  }
}
