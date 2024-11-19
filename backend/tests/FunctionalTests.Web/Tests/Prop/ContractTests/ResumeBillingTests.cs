using HotChocolate.Execution;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core.Shared.Specifications;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.Core;
using RealGimm.Core.Prop.ContractAggregate;
using Microsoft.EntityFrameworkCore;

namespace RealGimm.FunctionalTests.Web.Tests.Prop.ContractTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class ResumeBillingTests : EmptyDbWebTest
{
  public string Mutation { get; } = $$"""
    mutation($contractId: Int!, $pauseEndDate: Date!, $isRecoveryArrears: Boolean!, $notes: String) {
      contract {
        resumeBilling(
          contractId: $contractId,
          pauseEndDate: $pauseEndDate,
          isRecoveryArrears: $isRecoveryArrears,
          notes: $notes
        ) {
          {{GraphQLHelper.ResultFragment(
              GraphQLHelper.Prop.Contract.BillingPauseFragment()
          )}}
        }
      }
    }
    """;

  public ResumeBillingTests(EmptyDbWebFactory factory) : base(factory)
  {
  }

  [Fact]
  public async Task Should_PauseBilling()
  {
    // Arrange
    Contract contractToResumeBilling;
    var pausedSince = new DateOnly(2019, 11, 01);

    await using (var scope = Provider.CreateAsyncScope())
    {
      var seededEntities = await ContractTestsHelper.SeedEntities(scope.ServiceProvider);
      var contractFaker = ContractTestsHelper.CreateContractFaker(seededEntities);

      contractToResumeBilling = contractFaker.Generate();
      contractToResumeBilling.BillingPauses.Clear();

      var billingPause = new BillingPause();
      billingPause.SetSince(pausedSince);

      contractToResumeBilling.BillingPauses.Add(billingPause);

      await scope.ServiceProvider
        .GetRequiredService<IRepository<Contract>>()
        .AddAsync(contractToResumeBilling);
    }

    var pauseEndDate = new DateOnly(2020, 01, 01);
    var notes = "notes";
    var isRecoveryArrears = true;

    var pauseBillingMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("contractId", contractToResumeBilling.Id)
      .SetVariableValue("pauseEndDate", pauseEndDate.ToString("yyyy-MM-dd"))
      .SetVariableValue("isRecoveryArrears", isRecoveryArrears)
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

      var billingPauses = await repository
        .AsQueryable(new GetByIdSpec<Contract>(contractToResumeBilling.Id))
        .AsNoTracking()
        .SelectMany(contract => contract.BillingPauses)
        .ToListAsync();

      var billingPause = Assert.Single(billingPauses);
      Assert.Equal(pausedSince, billingPause.Since);
      Assert.Equal(pauseEndDate, billingPause.Until);
      Assert.Equal(isRecoveryArrears, billingPause.IsRecoveryArrears);
      Assert.Equal(notes, billingPause.Notes);
    }

    await Verify(result);
  }
}
