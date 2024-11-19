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
using RealGimm.Web.Anag.Models;

namespace RealGimm.FunctionalTests.Web.Tests.Prop.PassiveContractTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class TakeoverDeadLandlordTests : EmptyDbWebTest
{
  public string Mutation { get; } = $$"""
    mutation(
      $contractId: Int!
      $deadCounterpartId: Int!
      $heirInputs: [{{nameof(ContractDeathVariationNewCounterpartInput)}}!]! 
      $updatedCounterpartInputs: [{{nameof(ContractVariationUpdatedCounterpartInput)}}!]! 
    ) {
      passiveContract {
        takeoverDeadLandlord(
          contractId: $contractId
          deadCounterpartId: $deadCounterpartId
          heirInputs: $heirInputs
          updatedCounterpartInputs: $updatedCounterpartInputs
        ) {
          {{GraphQLHelper.ResultFragment()}}
        }
      }
    }
    """;

  public TakeoverDeadLandlordTests(EmptyDbWebFactory factory) : base(factory)
  {
  }

  [Fact]
  public async Task Should_TakeoverDeadLandlord()
  {
    // Arrange
    Contract contractToTakeoverDeadLandlord;

    await using (var scope = Provider.CreateAsyncScope())
    {
      var seededEntities = await ContractTestsHelper.SeedEntities(scope.ServiceProvider);
      
      contractToTakeoverDeadLandlord = ContractTestsHelper.CreateContractFaker(seededEntities).Generate();
      contractToTakeoverDeadLandlord.Type.SetIsActive(false);
      contractToTakeoverDeadLandlord.SetStatus(EntryStatus.Working);
      contractToTakeoverDeadLandlord.Takeovers.Clear();

      await scope.ServiceProvider
        .GetRequiredService<IRepository<Contract>>()
        .AddAsync(contractToTakeoverDeadLandlord);
    }

    var deadCounterpart = contractToTakeoverDeadLandlord.Counterparts.First();

    var updatedCounterpartInputs = contractToTakeoverDeadLandlord.Counterparts
      .Except(new[] { deadCounterpart })
      .Select(counterpart => new ContractVariationUpdatedCounterpartInput
      {
        Id = counterpart.Id,
        IsMainCounterpart = false,
        ContractSharePercent = 5,
      })
      .ToArray();

    var heirInputs = new[]
    {
      new ContractDeathVariationNewCounterpartInput
      {
        SubjectId = 10,
        IsMainCounterpart = true,
        ContractSharePercent = 100 - updatedCounterpartInputs.Sum(input => input.ContractSharePercent),
        TakeoverDate = new DateOnly(2020, 01, 01)
      }
    };

    var takeoverLandlordsMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("contractId", contractToTakeoverDeadLandlord.Id)
      .SetVariableValue("deadCounterpartId", deadCounterpart.Id)
      .SetVariableValue("heirInputs", heirInputs)
      .SetVariableValue("updatedCounterpartInputs", updatedCounterpartInputs)
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
        .AsQueryable(new GetByIdSpec<Contract>(contractToTakeoverDeadLandlord.Id), new PassiveContractSpec())
        .AsNoTracking()
        .Select(contract => new
        {
          contract.Counterparts,
          contract.Takeovers,
        })
        .SingleAsync();

      Assert.DoesNotContain(updatedContract.Counterparts, counterpart => counterpart.Id == deadCounterpart.Id);

      var updatedCounterparts = updatedContract.Counterparts.Where(couterpart =>
        updatedCounterpartInputs.Select(input => input.Id).Contains(couterpart.Id));

      foreach (var (input, counterpart) in updatedCounterpartInputs.Zip(updatedCounterparts))
      {
        Assert.Equal(input.IsMainCounterpart, counterpart.IsMainCounterpart);
        Assert.Equal(input.ContractSharePercent, counterpart.ContractSharePercent);
      }

      var heirs = updatedContract.Counterparts.Where(counterpart =>
        !contractToTakeoverDeadLandlord.Counterparts.Select(c => c.Id).Contains(counterpart.Id));

      foreach (var (input, heir) in heirInputs.Zip(heirs))
      {
        Assert.Equal(input.ContractSharePercent, heir.ContractSharePercent);
        Assert.Equal(input.IsMainCounterpart, heir.IsMainCounterpart);
        Assert.Equal(input.SubjectId, heir.SubjectId);
        Assert.Equal(input.Type, heir.Type);
        Assert.Equal(input.TakeoverDate, heir.Since);
        Assert.Null(heir.Until);

        var takeover = updatedContract.Takeovers.Single(takeover => takeover.NewSubjectId == heir.SubjectId);
        Assert.Equal(input.TakeoverDate, takeover.TakeoverDate);
        Assert.Equal(input.TakeoverDate, takeover.EffectiveDate);
        Assert.Equal(TakeoverType.ita_T1Demise, takeover.Type);
        Assert.Equal(input.SubjectId, takeover.NewSubjectId);
        Assert.Equal(deadCounterpart.SubjectId, takeover.OriginalSubjectId);
      }
    }
  }
}
