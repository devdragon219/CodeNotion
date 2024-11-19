using HotChocolate.Execution;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core.Shared.Specifications;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.Web.Common.Models;
using RealGimm.Core.Common.VATRateAggregate;
using RealGimm.FunctionalTests.Web.Fakers.Common;
using RealGimm.Core;

namespace RealGimm.FunctionalTests.Web.Tests.Common.VATRateTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class AddTests : EmptyDbWebTest
{
  public string Mutation { get; } = $$"""
    mutation($input: {{nameof(VATRateInput)}}!) {
      vatRate {
        add(input: $input) {
          {{
            GraphQLHelper.ResultFragment(
              GraphQLHelper.Common.VATRateFragment())
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
    var input = new VATRateInputFaker().Generate();

    var addVATRateMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("input", input)
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(addVATRateMutation);

    // Assert
    Assert.NotNull(result);
    Assert.True(result.IsSuccess());

    var addedVATRateId = result!.Data!
      .GetDictionaryValue("vatRate")
      .GetDictionaryValue("add")
      .GetDictionaryValue("value")
      .GetValue<int>("id");

    await using (var scope = Provider.CreateAsyncScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<VATRate>>();

      var addedVATRate = await repository.SingleOrDefaultAsync(new GetByIdSpec<VATRate>(addedVATRateId));
      Assert.NotNull(addedVATRate);
      AssertHelper.Common.VATRateEqual(input, addedVATRate);
    }

    await Verify(result);
  }
}
