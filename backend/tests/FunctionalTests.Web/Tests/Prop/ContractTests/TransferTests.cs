using HotChocolate.Execution;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core.Shared.Specifications;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.Core;
using RealGimm.Core.Prop.ContractAggregate;
using Microsoft.EntityFrameworkCore;

namespace RealGimm.FunctionalTests.Web.Tests.Prop.ContractTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class TransferTests : EmptyDbWebTest
{
  public string Mutation { get; } = $$"""
    mutation(
      $contractIds: [Int!]!
      $newManagementSubjectId: Int!
      $legalRepresentativeSubjectId: Int!
      $paymentDate: Date!
      $terminationDate: Date!
      $takeoverType: {{nameof(TakeoverType)}}!
    ) {
      contract {
        transferManagementSubject(
          contractIds: $contractIds
          newManagementSubjectId: $newManagementSubjectId
          legalRepresentativeSubjectId: $legalRepresentativeSubjectId
          paymentDate: $paymentDate
          terminationDate: $terminationDate
          takeoverType: $takeoverType
        ) {
          {{GraphQLHelper.ResultFragment()}}
        }
      }
    }
    """;

  public TransferTests(EmptyDbWebFactory factory) : base(factory)
  {
  }

  [Fact]
  public async Task Should_TransferManagementSubject()
  {
    // Arrange
    Contract contractToTransfer;

    await using (var scope = Provider.CreateAsyncScope())
    {
      var seededEntities = await ContractTestsHelper.SeedEntities(scope.ServiceProvider);
      var contractFaker = ContractTestsHelper.CreateContractFaker(seededEntities);

      contractToTransfer = contractFaker.Generate();
      contractToTransfer.Takeovers.Clear();

      await scope.ServiceProvider
        .GetRequiredService<IRepository<Contract>>()
        .AddAsync(contractToTransfer);
    }

    var legalRepresentativeSubjectId = 0;
    var newManagementSubjectId = 1;
    var paymentDate = new DateOnly(2020, 01, 01);
    var terminationDate = new DateOnly(2020, 01, 02);
    var takeoverType = TakeoverType.ita_T5CompanySplit;

    var transferManagementSubjectMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("contractIds", new[] { contractToTransfer.Id })
      .SetVariableValue("newManagementSubjectId", newManagementSubjectId)
      .SetVariableValue("legalRepresentativeSubjectId", legalRepresentativeSubjectId)
      .SetVariableValue("paymentDate", paymentDate.ToString("yyyy-MM-dd"))
      .SetVariableValue("terminationDate", terminationDate.ToString("yyyy-MM-dd"))
      .SetVariableValue("takeoverType", takeoverType)
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(transferManagementSubjectMutation);

    // Assert
    Assert.NotNull(result);
    Assert.True(result.IsSuccess());

    await using (var scope = Provider.CreateAsyncScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<Contract>>();

      var updatedContract = await repository
        .AsQueryable(new GetByIdSpec<Contract>(contractToTransfer.Id))
        .AsNoTracking()
        .Select(contract => new
        {
          contract.ManagementSubjectId,
          Takeover = contract.Takeovers.Single()
        })
        .SingleOrDefaultAsync();

      Assert.NotNull(updatedContract);
      Assert.Equal(newManagementSubjectId, updatedContract.ManagementSubjectId);
      Assert.Equal(contractToTransfer.ManagementSubjectId, updatedContract.Takeover.OriginalSubjectId);
      Assert.Equal(legalRepresentativeSubjectId, updatedContract.Takeover.LegalRepresentativeSubjectId);
      Assert.Equal(paymentDate, updatedContract.Takeover.TakeoverDate);
      Assert.Equal(terminationDate, updatedContract.Takeover.EffectiveDate);
      Assert.Equal(takeoverType, updatedContract.Takeover.Type);
    }
  }
}
