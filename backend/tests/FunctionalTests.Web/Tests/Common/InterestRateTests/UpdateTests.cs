using HotChocolate.Execution;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core.Shared.Specifications;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.Web.Common.Models;
using RealGimm.Infrastructure.Common.Data.Fakers;
using RealGimm.Core.Common.InterestRateAggregate;
using RealGimm.FunctionalTests.Web.Fakers.Common;
using RealGimm.Core;

namespace RealGimm.FunctionalTests.Web.Tests.Common.InterestRateTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class UpdateTests : EmptyDbWebTest
{
  public string Mutation { get; } = $$"""
    mutation($id: Int!, $input: {{nameof(InterestRateInput)}}!) {
      interestRate {
        update(id: $id, input: $input) {
          {{GraphQLHelper.ResultFragment(
              GraphQLHelper.Common.InterestRateFragment()
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
    var interestRateToUpdate = new InterestRateFaker().Generate();

    using (var scope = Provider.CreateScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<InterestRate>>();
      await repository.AddAsync(interestRateToUpdate);
    }

    var input = new InterestRateInputFaker().Generate();

    var addContractTypeMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("id", interestRateToUpdate.Id)
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
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<InterestRate>>();

      var updatedInterestRate = await repository.SingleOrDefaultAsync(new GetByIdSpec<InterestRate>(interestRateToUpdate.Id));
      Assert.NotNull(updatedInterestRate);
      AssertHelper.Common.InterestRateEqual(input, updatedInterestRate);
    }

    await Verify(result);
  }
}
