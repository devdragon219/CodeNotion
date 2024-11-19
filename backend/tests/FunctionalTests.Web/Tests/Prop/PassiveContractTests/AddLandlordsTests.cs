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

namespace RealGimm.FunctionalTests.Web.Tests.Prop.PassiveContractTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class AddLandlordsTests : EmptyDbWebTest
{
  public string Mutation { get; } = $$"""
    mutation(
      $contractId: Int!
      $updatedCounterpartInputs : [{{nameof(ContractVariationUpdatedCounterpartInput)}}!]!
      $newCounterpartInputs: [{{nameof(ContractVariationNewCounterpartInput)}}!]! 
    ) {
      passiveContract {
        addLandlords(
          contractId: $contractId
          updatedCounterpartInputs : $updatedCounterpartInputs 
          newCounterpartInputs: $newCounterpartInputs
        ) {
          {{GraphQLHelper.ResultFragment()}}
        }
      }
    }
    """;

  public AddLandlordsTests(EmptyDbWebFactory factory) : base(factory)
  {
  }

  [Fact]
  public async Task Should_AddLandlords()
  {
    // Arrange
    Contract contractToAddLandlords;

    await using (var scope = Provider.CreateAsyncScope())
    {
      var seededEntities = await ContractTestsHelper.SeedEntities(scope.ServiceProvider);

      contractToAddLandlords = ContractTestsHelper.CreateContractFaker(seededEntities).Generate();
      contractToAddLandlords.Type.SetIsActive(false);
      contractToAddLandlords.SetStatus(EntryStatus.Working);

      await scope.ServiceProvider
        .GetRequiredService<IRepository<Contract>>()
        .AddAsync(contractToAddLandlords);
    }

    var updatedCounterpartInputs  = contractToAddLandlords.Counterparts
      .Select(counterpart =>
        new ContractVariationUpdatedCounterpartInput
        {
          Id = counterpart.Id,
          ContractSharePercent = 25,
          IsMainCounterpart = counterpart.IsMainCounterpart,
        })
      .ToArray();

    var newCounterpartInputs = new[]
    {
      new ContractVariationNewCounterpartInput
      {
        SubjectId = 10,
        Since = new DateOnly(2022, 01, 02),
        ContractSharePercent = 100 - updatedCounterpartInputs .Sum(input => input.ContractSharePercent),
        IsMainCounterpart = false
      }
    };

    var addLandlordsMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("contractId", contractToAddLandlords.Id)
      .SetVariableValue("updatedCounterpartInputs", updatedCounterpartInputs )
      .SetVariableValue("newCounterpartInputs", newCounterpartInputs)
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(addLandlordsMutation);

    // Assert
    Assert.NotNull(result);
    Assert.True(result.IsSuccess());

    await using (var scope = Provider.CreateAsyncScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<Contract>>();

      var counterparts = await repository
        .AsQueryable(new GetByIdSpec<Contract>(contractToAddLandlords.Id), new PassiveContractSpec())
        .AsNoTracking()
        .Select(contract => contract.Counterparts.OrderBy(counterpart => counterpart.Id).AsEnumerable())
        .SingleAsync();

      Assert.Equal(contractToAddLandlords.Counterparts.Count + newCounterpartInputs.Length, counterparts.Count());

      var updatedCounterparts = counterparts
        .Where(counterpart => updatedCounterpartInputs .Select(input => input.Id).Contains(counterpart.Id))
        .OrderBy(counterpart => counterpart.Id);

      foreach (var (input, counterpart) in updatedCounterpartInputs .Zip(updatedCounterparts))
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
