using HotChocolate.Execution;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core.Prop.ContractAggregate;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Core;
using RealGimm.FunctionalTests.Web.Tests.Prop.ContractTests;
using RealGimm.Web.Prop.Models;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.Core.Prop.ContractAggregate.Specifications;
using Microsoft.EntityFrameworkCore;
using System.Collections.Immutable;
using RealGimm.Core.Common;

namespace RealGimm.FunctionalTests.Web.Tests.Prop.ActiveContractTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class AddTenantsTests : EmptyDbWebTest
{
  public string Mutation { get; } = $$"""
    mutation(
      $contractId: Int!
      $updatedCounterpartInputs: [{{nameof(ContractVariationUpdatedCounterpartInput)}}!]!
      $newCounterpartInputs: [{{nameof(ContractVariationNewCounterpartInput)}}!]! 
    ) {
      activeContract {
        addTenants(
          contractId: $contractId
          updatedCounterpartInputs: $updatedCounterpartInputs
          newCounterpartInputs: $newCounterpartInputs
        ) {
          {{GraphQLHelper.ResultFragment()}}
        }
      }
    }
    """;

  public AddTenantsTests(EmptyDbWebFactory factory) : base(factory)
  {
  }

  [Fact]
  public async Task Should_AddTenants()
  {
    // Arrange
    Contract contractToAddTenants;

    await using (var scope = Provider.CreateAsyncScope())
    {
      var seededEntities = await ContractTestsHelper.SeedEntities(scope.ServiceProvider);
      
      contractToAddTenants = ContractTestsHelper.CreateContractFaker(seededEntities).Generate();
      contractToAddTenants.Type.SetIsActive(true);
      contractToAddTenants.SetStatus(EntryStatus.Working);

      await scope.ServiceProvider
        .GetRequiredService<IRepository<Contract>>()
        .AddAsync(contractToAddTenants);
    }

    var updatedCounterpartInputs = contractToAddTenants.Counterparts
      .Select(counterpart =>
        new ContractVariationUpdatedCounterpartInput
        {
          Id = counterpart.Id,
          ContractSharePercent = 25,
          Type = CounterpartType.NonProfit,
          IsMainCounterpart = counterpart.IsMainCounterpart,
        })
      .ToArray();

    var newCounterpartInputs = new[]
    {
      new ContractVariationNewCounterpartInput
      {
        SubjectId = 10,
        Since = new DateOnly(2022, 01, 02),
        Type = CounterpartType.Regular,
        ContractSharePercent = 100 - updatedCounterpartInputs.Sum(input => input.ContractSharePercent),
        IsMainCounterpart = false
      }
    };

    var addTenantsMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("contractId", contractToAddTenants.Id)
      .SetVariableValue("updatedCounterpartInputs", updatedCounterpartInputs)
      .SetVariableValue("newCounterpartInputs", newCounterpartInputs)
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(addTenantsMutation);

    // Assert
    Assert.NotNull(result);
    Assert.True(result.IsSuccess());

    await using (var scope = Provider.CreateAsyncScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<Contract>>();

      var counterparts = await repository
        .AsQueryable(new GetByIdSpec<Contract>(contractToAddTenants.Id), new ActiveContractSpec())
        .AsNoTracking()
        .Select(contract => contract.Counterparts.OrderBy(counterpart => counterpart.Id).AsEnumerable())
        .SingleAsync();

      Assert.Equal(contractToAddTenants.Counterparts.Count + newCounterpartInputs.Length, counterparts.Count());

      var updatedCounterparts = counterparts
        .Where(counterpart => updatedCounterpartInputs.Select(input => input.Id).Contains(counterpart.Id))
        .OrderBy(counterpart => counterpart.Id);

      foreach (var (input, counterpart) in updatedCounterpartInputs.Zip(updatedCounterparts))
      {
        Assert.Equal(input.ContractSharePercent, counterpart.ContractSharePercent);
        Assert.Equal(input.Type, counterpart.Type);
        Assert.Equal(input.IsMainCounterpart, counterpart.IsMainCounterpart);
      }

      var newCounterparts = counterparts.Except(updatedCounterparts).OrderBy(tenant => tenant.Id);      
      foreach (var (input, counterpart) in newCounterpartInputs.Zip(newCounterparts))
      {
        Assert.Equal(input.ContractSharePercent, counterpart.ContractSharePercent);
        Assert.Equal(input.Type, counterpart.Type);
        Assert.Equal(input.Since, counterpart.Since);
        Assert.Equal(input.SubjectId, counterpart.SubjectId);
        Assert.Equal(input.IsMainCounterpart, counterpart.IsMainCounterpart);
      }
    }
  }
}
