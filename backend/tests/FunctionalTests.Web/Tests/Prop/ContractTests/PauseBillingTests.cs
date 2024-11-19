using HotChocolate.Execution;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core.Shared.Specifications;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.Core;
using RealGimm.Core.Prop.ContractAggregate;
using Microsoft.EntityFrameworkCore;

namespace RealGimm.FunctionalTests.Web.Tests.Prop.ContractTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class PauseBillingTests : EmptyDbWebTest
{
  public string Mutation { get; } = $$"""
    mutation($contractId: Int!, $since: Date!, $notes: String) {
      contract {
        pauseBilling(contractId: $contractId, since: $since, notes: $notes) {
          {{GraphQLHelper.ResultFragment(
              GraphQLHelper.Prop.Contract.BillingPauseFragment()
          )}}
        }
      }
    }
    """;

  public PauseBillingTests(EmptyDbWebFactory factory) : base(factory)
  {
  }

  [Fact]
  public async Task Should_PauseBilling()
  {
    // Arrange
    Contract contractToPauseBilling;

    await using (var scope = Provider.CreateAsyncScope())
    {
      var seededEntities = await ContractTestsHelper.SeedEntities(scope.ServiceProvider);
      var contractFaker = ContractTestsHelper.CreateContractFaker(seededEntities);

      contractToPauseBilling = contractFaker.Generate();
      contractToPauseBilling.BillingPauses.Clear();

      await scope.ServiceProvider
        .GetRequiredService<IRepository<Contract>>()
        .AddAsync(contractToPauseBilling);
    }

    var since = new DateOnly(2020, 01, 01);
    var notes = "notes";

    var pauseBillingMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("contractId", contractToPauseBilling.Id)
      .SetVariableValue("since", since.ToString("yyyy-MM-dd"))
      .SetVariableValue("notes", notes)
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(pauseBillingMutation);

    // Assert
    Assert.NotNull(result);
    Assert.True(result.IsSuccess());

    await using (var scope = Provider.CreateAsyncScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<Contract>>();

      var lastBillingPause = await repository
        .AsQueryable(new GetByIdSpec<Contract>(contractToPauseBilling.Id))
        .AsNoTracking()
        .Select(contract => contract.BillingPauses
          .OrderBy(pause => pause.Since)
          .ThenBy(pause => pause.Until)
          .LastOrDefault())
        .SingleOrDefaultAsync();

      Assert.NotNull(lastBillingPause);
      Assert.Null(lastBillingPause.Until);
      Assert.Null(lastBillingPause.IsRecoveryArrears);
      Assert.Equal(since, lastBillingPause.Since);
      Assert.Equal(notes, lastBillingPause.Notes);
    }

    await Verify(result);
  }
}
