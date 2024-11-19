using HotChocolate.Execution;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core.Shared.Specifications;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.Core;
using RealGimm.Core.Prop.ContractAggregate;
using Microsoft.EntityFrameworkCore;
using RealGimm.FunctionalTests.Web.Tests.Prop.ContractTests;

namespace RealGimm.FunctionalTests.Web.Tests.Prop.ActiveContractTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class TakeoverLandlordTests : EmptyDbWebTest
{
  public string Mutation { get; } = $$"""
    mutation($contractId: Int!, $legalRepresentativeSubjectId: Int!, $paymentDate: Date!, $successorIds: [Int!]!) {
      activeContract {
        takeoverLandlord(
          contractId: $contractId
          legalRepresentativeSubjectId: $legalRepresentativeSubjectId
          paymentDate: $paymentDate
          successorIds: $successorIds
        ) {
          {{GraphQLHelper.ResultFragment()}}
        }
      }
    }
    """;

  public TakeoverLandlordTests(EmptyDbWebFactory factory) : base(factory)
  {
  }

  [Fact]
  public async Task Should_TakeoverLandlord()
  {
    // Arrange
    Contract contractToTakeoverLandlord;

    await using (var scope = Provider.CreateAsyncScope())
    {
      var seededEntities = await ContractTestsHelper.SeedEntities(scope.ServiceProvider);
      var contractFaker = ContractTestsHelper.CreateContractFaker(seededEntities);

      contractToTakeoverLandlord = contractFaker.Generate();
      contractToTakeoverLandlord.Type.SetIsActive(true);
      contractToTakeoverLandlord.Takeovers.Clear();

      await scope.ServiceProvider
        .GetRequiredService<IRepository<Contract>>()
        .AddAsync(contractToTakeoverLandlord);
    }

    var legalRepresentativeSubjectId = 0;
    var paymentDate = new DateOnly(2020, 01, 01);
    var successorIds = new[] { 1 };

    var takeoverLandlordMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("contractId", contractToTakeoverLandlord.Id)
      .SetVariableValue("legalRepresentativeSubjectId", legalRepresentativeSubjectId)
      .SetVariableValue("paymentDate", paymentDate.ToString("yyyy-MM-dd"))
      .SetVariableValue("successorIds", successorIds)
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(takeoverLandlordMutation);

    // Assert
    Assert.NotNull(result);
    Assert.True(result.IsSuccess());

    await using (var scope = Provider.CreateAsyncScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<Contract>>();

      var takeovers = await repository
        .AsQueryable(new GetByIdSpec<Contract>(contractToTakeoverLandlord.Id))
        .AsNoTracking()
        .SelectMany(contract => contract.Takeovers)
        .ToListAsync();

      Assert.Equal(successorIds.Length, takeovers.Count);

      var oldLandlord = contractToTakeoverLandlord.Counterparts.Single(counterpart => counterpart.IsMainCounterpart);

      foreach (var (successorId, takeover) in successorIds.Zip(takeovers))
      {
        Assert.Equal(oldLandlord.SubjectId, takeover.OriginalSubjectId);
        Assert.Equal(successorId, takeover.NewSubjectId);
        Assert.Equal(legalRepresentativeSubjectId, takeover.LegalRepresentativeSubjectId);
        Assert.Equal(paymentDate, takeover.EffectiveDate);
        Assert.Equal(paymentDate, takeover.TakeoverDate);
        Assert.Equal(TakeoverType.ita_T2RightsTransfer, takeover.Type);
      }
    }
  }
}
