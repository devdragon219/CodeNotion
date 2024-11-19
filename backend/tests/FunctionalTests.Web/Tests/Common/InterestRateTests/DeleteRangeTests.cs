using HotChocolate.Execution;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core;
using RealGimm.Core.Common.InterestRateAggregate;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.Infrastructure.Common.Data.Fakers;

namespace RealGimm.FunctionalTests.Web.Tests.Common.InterestRateTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class DeleteRangeTests : EmptyDbWebTest
{
  public string Mutation { get; } = $$"""
    mutation($ids: [Int!]!) {
      interestRate {
        deleteRange(ids: $ids) {
          {{GraphQLHelper.ResultFragment()}}
        }
      }
    }
    """;

  public DeleteRangeTests(EmptyDbWebFactory factory) : base(factory)
  {
  }


  [Fact]
  public async Task Should_DeleteRange()
  {
    // Arrange
    var interestRate = new InterestRateFaker().Generate(4);
    var interestRatesToKeep = interestRate.Take(2).ToArray();
    var interestRatesToDelete = interestRate.Except(interestRatesToKeep).ToArray();

    await using (var scope = Provider.CreateAsyncScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<InterestRate>>();
      await repository.AddRangeAsync(interestRate);
    }

    var deleteMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("ids", interestRatesToDelete.Select(x => x.Id).ToArray())
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(deleteMutation);

    // Assert
    Assert.NotNull(result);
    Assert.True(result.IsSuccess());

    await using (var scope = Provider.CreateAsyncScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<InterestRate>>();

      var remainingInterestRates = await repository.ListAsync();
      Assert.Equal(interestRatesToKeep.Length, remainingInterestRates.Count);
      Assert.All(interestRatesToKeep, toKeep => remainingInterestRates.Select(x => x.Id).Contains(toKeep.Id));

      Assert.DoesNotContain(
        remainingInterestRates,
        remaning => interestRatesToDelete.Select(toDelete => toDelete.Id).Contains(remaning.Id));
    }
  }
}
