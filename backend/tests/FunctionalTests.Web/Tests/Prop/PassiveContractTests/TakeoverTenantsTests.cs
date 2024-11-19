using HotChocolate.Execution;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core.Shared.Specifications;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.Core;
using RealGimm.Core.Prop.ContractAggregate;
using Microsoft.EntityFrameworkCore;
using RealGimm.FunctionalTests.Web.Tests.Prop.ContractTests;

namespace RealGimm.FunctionalTests.Web.Tests.Prop.PassiveContractTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class TakeoverTenantsTests : EmptyDbWebTest
{
  public string Mutation { get; } = $$"""
    mutation($contractId: Int!, $legalRepresentativeSubjectId: Int!, $paymentDate: Date!, $successorIds: [Int!]!) {
      passiveContract {
        takeoverTenants(
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

  public TakeoverTenantsTests(EmptyDbWebFactory factory) : base(factory)
  {
  }

  [Fact]
  public async Task Should_TakeoverTenants()
  {
    // Arrange
    Contract contractToTakeoverTenant;

    await using (var scope = Provider.CreateAsyncScope())
    {
      var seededEntities = await ContractTestsHelper.SeedEntities(scope.ServiceProvider);
      var contractFaker = ContractTestsHelper.CreateContractFaker(seededEntities);

      contractToTakeoverTenant = contractFaker.Generate();
      contractToTakeoverTenant.Type.SetIsActive(false);
      contractToTakeoverTenant.Takeovers.Clear();

      await scope.ServiceProvider
        .GetRequiredService<IRepository<Contract>>()
        .AddAsync(contractToTakeoverTenant);
    }

    var legalRepresentativeSubjectId = 0;
    var paymentDate = new DateOnly(2020, 01, 01);
    var successorIds = new[] { 1 };

    var takeoverTenantsMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("contractId", contractToTakeoverTenant.Id)
      .SetVariableValue("legalRepresentativeSubjectId", legalRepresentativeSubjectId)
      .SetVariableValue("paymentDate", paymentDate.ToString("yyyy-MM-dd"))
      .SetVariableValue("successorIds", successorIds)
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(takeoverTenantsMutation);

    // Assert
    Assert.NotNull(result);
    Assert.True(result.IsSuccess());

    await using (var scope = Provider.CreateAsyncScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<Contract>>();

      var takeovers = await repository
        .AsQueryable(new GetByIdSpec<Contract>(contractToTakeoverTenant.Id))
        .AsNoTracking()
        .SelectMany(contract => contract.Takeovers)
        .ToListAsync();

      var oldTenants = contractToTakeoverTenant.Counterparts.Where(counterpart => !counterpart.IsMainCounterpart);
      foreach (var oldTenant in oldTenants)
      {
        var tenantTakeovers = takeovers.Where(takeover => takeover.OriginalSubjectId == oldTenant.SubjectId);
        foreach (var (successorId, takeover) in successorIds.Zip(tenantTakeovers))
        {
          Assert.Equal(successorId, takeover.NewSubjectId);
          Assert.Equal(legalRepresentativeSubjectId, takeover.LegalRepresentativeSubjectId);
          Assert.Equal(paymentDate, takeover.EffectiveDate);
          Assert.Equal(paymentDate, takeover.TakeoverDate);
          Assert.Equal(TakeoverType.ita_T2RightsTransfer, takeover.Type);
        }
      }
    }
  }
}
