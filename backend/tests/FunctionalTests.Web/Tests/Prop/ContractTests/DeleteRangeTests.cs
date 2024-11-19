using HotChocolate.Execution;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core;
using RealGimm.Core.Prop.ContractAggregate;
using RealGimm.Core.Prop.ContractTypeAggregate;
using RealGimm.FunctionalTests.Web.Extensions;

namespace RealGimm.FunctionalTests.Web.Tests.Prop.ContractTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class DeleteRangeTests : EmptyDbWebTest
{
  public string Mutation { get; } = $$"""
    mutation($ids: [Int!]!) {
      contract {
        deleteRange(ids: $ids) {
          {{GraphQLHelper.ResultFragment()}}
        }
      }
    }
    """;

  public DeleteRangeTests(EmptyDbWebFactory factory) : base(factory)
  {
  }


  [Fact]
  public async Task Should_DeleteRange()
  {
    // Arrange
    IEnumerable<Contract> contracts;

    await using (var scope = Provider.CreateAsyncScope())
    {
      var seededEntities = await ContractTestsHelper.SeedEntities(scope.ServiceProvider);
      var contractFaker = ContractTestsHelper.CreateContractFaker(seededEntities);

      contracts = await scope.ServiceProvider
        .GetRequiredService<IRepository<Contract>>()
        .AddRangeAsync(contractFaker.Generate(3));
    }

    var contractsToKeep = contracts.Take(1).ToArray();
    var contractsToDelete = contracts.Except(contractsToKeep).ToArray();

    var deleteMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("ids", contractsToDelete.Select(x => x.Id).ToArray())
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(deleteMutation);

    // Assert
    Assert.NotNull(result);
    Assert.True(result.IsSuccess());

    await using (var scope = Provider.CreateAsyncScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<Contract>>();

      var remainingContract = await repository.ListAsync();
      Assert.Equal(contractsToKeep.Length, remainingContract.Count);
      Assert.All(contractsToKeep, toKeep => remainingContract.Select(x => x.Id).Contains(toKeep.Id));

      Assert.DoesNotContain(
        remainingContract,
        remaning => contractsToDelete.Select(toDelete => toDelete.Id).Contains(remaning.Id));
    }
  }
}
