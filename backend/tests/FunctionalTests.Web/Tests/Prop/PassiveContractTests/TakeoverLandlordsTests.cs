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
public sealed class TakeoverLandlordsTests : EmptyDbWebTest
{
  public string Mutation { get; } = $$"""
    mutation(
      $contractId: Int!
      $takeoverDate: Date!
      $takeoverType: {{nameof(TakeoverType)}}!
      $updatedCounterpartInputs: [{{nameof(ContractNoDateUpdateCounterpartInput)}}!]! 
      $newCounterpartInputs: [{{nameof(ContractNoDateNewCounterpartInput)}}!]! 
    ) {
      passiveContract {
        takeoverLandlords(
          contractId: $contractId
          takeoverDate: $takeoverDate
          takeoverType: $takeoverType
          updatedCounterpartInputs: $updatedCounterpartInputs
          newCounterpartInputs: $newCounterpartInputs
        ) {
          {{GraphQLHelper.ResultFragment()}}
        }
      }
    }
    """;

  public TakeoverLandlordsTests(EmptyDbWebFactory factory) : base(factory)
  {
  }

  [Fact]
  public async Task Should_AddLandlords()
  {
    // Arrange
    Contract contractToTakeoverLandlords;

    await using (var scope = Provider.CreateAsyncScope())
    {
      var seededEntities = await ContractTestsHelper.SeedEntities(scope.ServiceProvider);

      contractToTakeoverLandlords = ContractTestsHelper.CreateContractFaker(seededEntities).Generate();
      contractToTakeoverLandlords.Type.SetIsActive(false);
      contractToTakeoverLandlords.SetStatus(EntryStatus.Working);
      contractToTakeoverLandlords.Takeovers.Clear();

      await scope.ServiceProvider
        .GetRequiredService<IRepository<Contract>>()
        .AddAsync(contractToTakeoverLandlords);
    }

    var updatedCounterpartInputs = contractToTakeoverLandlords.Counterparts
      .Where(counterpart => counterpart.IsMainCounterpart)
      .Select(counterpart => new ContractNoDateUpdateCounterpartInput
      {
        Id = counterpart.Id,
        ContractSharePercent = 10,
        IsMainCounterpart = false
      })
      .ToArray();

    var newCounterpartInputs = new[]
    {
      new ContractNoDateNewCounterpartInput
      {
        SubjectId = 10,
        IsMainCounterpart = true,
        ContractSharePercent = 100 - updatedCounterpartInputs.Sum(input => input.ContractSharePercent)
      }
    };

    var takeoverDate = new DateOnly(2020, 01, 01);
    var takeoverType = TakeoverType.ita_T3CompanyTransformation;

    var takeoverLandlordsMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("contractId", contractToTakeoverLandlords.Id)
      .SetVariableValue("takeoverDate", takeoverDate.ToString("yyyy-MM-dd"))
      .SetVariableValue("takeoverType", takeoverType)
      .SetVariableValue("updatedCounterpartInputs", updatedCounterpartInputs)
      .SetVariableValue("newCounterpartInputs", newCounterpartInputs)
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(takeoverLandlordsMutation);

    // Assert
    Assert.NotNull(result);
    Assert.True(result.IsSuccess());

    await using (var scope = Provider.CreateAsyncScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<Contract>>();

      var updatedContract = await repository
        .AsQueryable(new GetByIdSpec<Contract>(contractToTakeoverLandlords.Id), new PassiveContractSpec())
        .AsNoTracking()
        .Select(contract => new
        {
          contract.Counterparts,
          contract.Takeovers,
        })
        .SingleAsync();

      var updatedCounterparts = updatedContract.Counterparts.Where(couterpart =>
        updatedCounterpartInputs.Select(input => input.Id).Contains(couterpart.Id));

      foreach (var (input, counterpart) in updatedCounterpartInputs.Zip(updatedCounterparts))
      {
        Assert.Equal(input.ContractSharePercent, counterpart.ContractSharePercent);
        Assert.Equal(input.IsMainCounterpart, counterpart.IsMainCounterpart);
      }

      var newCounterparts = updatedContract.Counterparts.Where(counterpart =>
        !contractToTakeoverLandlords.Counterparts.Select(c => c.Id).Contains(counterpart.Id));

      var outgoingCounterparts = contractToTakeoverLandlords.Counterparts
        .Where(counterpart => !updatedContract.Counterparts.Select(c => c.Id).Contains(counterpart.Id))
        .OrderBy(counterpart => counterpart.SubjectId);

      foreach (var (newInput, counterpart) in newCounterpartInputs.Zip(newCounterparts))
      {
        Assert.Equal(newInput.ContractSharePercent, counterpart.ContractSharePercent);
        Assert.Equal(newInput.IsMainCounterpart, counterpart.IsMainCounterpart);
        Assert.Equal(newInput.SubjectId, counterpart.SubjectId);
        Assert.Equal(newInput.Type, counterpart.Type);
        Assert.Equal(takeoverDate, counterpart.Since);
        Assert.Null(counterpart.Until);

        var takeovers = updatedContract.Takeovers
          .Where(takeover => takeover.NewSubjectId == counterpart.SubjectId)
          .OrderBy(takeover => takeover.NewSubjectId);

        Assert.Equal(outgoingCounterparts.Count(), takeovers.Count());

        foreach (var (takeover, outgoingCounterpart) in takeovers.Zip(outgoingCounterparts))
        {
          Assert.Equal(takeoverDate, takeover.TakeoverDate);
          Assert.Equal(takeoverDate, takeover.EffectiveDate);
          Assert.Equal(takeoverType, takeover.Type);
          Assert.Equal(newInput.SubjectId, takeover.NewSubjectId);
          Assert.Equal(outgoingCounterpart.SubjectId, takeover.OriginalSubjectId);
        }
      }
    }
  }
}
