using HotChocolate.Execution;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core.Shared.Specifications;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.Web.Common.Models;
using RealGimm.Core.Common.InterestRateAggregate;
using RealGimm.FunctionalTests.Web.Fakers.Common;
using RealGimm.Core;

namespace RealGimm.FunctionalTests.Web.Tests.Common.InterestRateTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class AddTests : EmptyDbWebTest
{
  public string Mutation { get; } = $$"""
    mutation($input: {{nameof(InterestRateInput)}}!) {
      interestRate {
        add(input: $input) {
          {{
            GraphQLHelper.ResultFragment(
              GraphQLHelper.Common.InterestRateFragment())
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
    var input = new InterestRateInputFaker().Generate();

    var addInterestRateMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("input", input)
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(addInterestRateMutation);

    // Assert
    Assert.NotNull(result);
    Assert.True(result.IsSuccess());

    var addedInterestRateId = result!.Data!
      .GetDictionaryValue("interestRate")
      .GetDictionaryValue("add")
      .GetDictionaryValue("value")
      .GetValue<int>("id");

    await using (var scope = Provider.CreateAsyncScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<InterestRate>>();

      var addedInterestRate = await repository.SingleOrDefaultAsync(new GetByIdSpec<InterestRate>(addedInterestRateId));
      Assert.NotNull(addedInterestRate);
      AssertHelper.Common.InterestRateEqual(input, addedInterestRate);
    }

    await Verify(result);
  }
}
