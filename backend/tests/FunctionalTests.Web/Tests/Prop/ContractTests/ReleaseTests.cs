using HotChocolate.Execution;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core.Shared.Specifications;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.Core;
using RealGimm.Core.Prop.ContractAggregate;
using Microsoft.EntityFrameworkCore;

namespace RealGimm.FunctionalTests.Web.Tests.Prop.ContractTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class ReleaseTests : EmptyDbWebTest
{
  public string Mutation { get; } = $$"""
    mutation(
      $id: Int!,
      $releaseReason: ReleaseReason,
      $releaseDate: Date,
      $isOccupiedWithoutRight: Boolean!
    ) {
      contract {
        release(
          id: $id,
          releaseReason: $releaseReason,
          releaseDate: $releaseDate
          isOccupiedWithoutRight: $isOccupiedWithoutRight
        ) {
          {{GraphQLHelper.ResultFragment()}}
        }
      }
    }
    """;

  public ReleaseTests(EmptyDbWebFactory factory) : base(factory)
  {
  }

  [Fact]
  public async Task Should_ReleaseContract()
  {
    // Arrange
    Contract contractToRelease;

    await using (var scope = Provider.CreateAsyncScope())
    {
      var seededEntities = await ContractTestsHelper.SeedEntities(scope.ServiceProvider);
      var contractFaker = ContractTestsHelper.CreateContractFaker(seededEntities);

      contractToRelease = contractFaker.Generate();
      contractToRelease.SetReleaseDetails(null, null, null);

      await scope.ServiceProvider
        .GetRequiredService<IRepository<Contract>>()
        .AddAsync(contractToRelease);
    }

    var releaseReason = ReleaseReason.Withdrawal;
    var releaseDate = new DateOnly(2025, 01, 01);
    var isOccupiedWithoutRight = false;

    var releaseMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("id", contractToRelease.Id)
      .SetVariableValue("releaseReason", releaseReason)
      .SetVariableValue("releaseDate", releaseDate.ToString("yyyy-MM-dd"))
      .SetVariableValue("isOccupiedWithoutRight", isOccupiedWithoutRight)
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(releaseMutation);

    // Assert
    Assert.NotNull(result);
    Assert.True(result.IsSuccess());

    await using (var scope = Provider.CreateAsyncScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<Contract>>();

      var contract = await repository
        .AsQueryable(new GetByIdSpec<Contract>(contractToRelease.Id))
        .Select(contract => new
        {
          contract.ReleaseDate,
          contract.ReleaseReason,
          contract.IsOccupiedWithoutRight
        })
        .SingleOrDefaultAsync();

      Assert.NotNull(contract);
      Assert.Equal(releaseDate, contract.ReleaseDate);
      Assert.Equal(releaseReason, contract.ReleaseReason);
      Assert.Equal(isOccupiedWithoutRight, contract.IsOccupiedWithoutRight);
    }
  }
}
