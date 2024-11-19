using HotChocolate.Execution;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core;
using RealGimm.Core.Asst.EstateUsageTypeAggregate;
using RealGimm.Core.Prop.ContractTypeAggregate;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.Infrastructure.Asst.Data.Fakers;
using RealGimm.Infrastructure.Prop.Data.Fakers;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.FunctionalTests.Web.Tests.Prop.ContractTypeTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class DeleteRangeTests : EmptyDbWebTest
{
  public string Mutation { get; } = $$"""
    mutation($ids: [Int!]!) {
      contractType {
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
    using var firstScope = Provider.CreateScope();
    var usageTypeRepo = firstScope.ServiceProvider.GetRequiredService<IRepository<EstateUsageType>>();
    var usageTypes = new EstateUsageTypeFaker().Generate(2);
    await usageTypeRepo.AddRangeAsync(usageTypes);

    var contractType = new ContractTypeFaker()
    {
      UsageTypes = await usageTypeRepo.AsQueryable().ToListAsync()
    }.Generate(4);
    var contractTypeToKeep = contractType.Take(2).ToArray();
    var contractTypeToDelete = contractType.Except(contractTypeToKeep).ToArray();

    await using (var scope = Provider.CreateAsyncScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<ContractType>>();
      await repository.AddRangeAsync(contractType);
    }

    var deleteMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("ids", contractTypeToDelete.Select(x => x.Id).ToArray())
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(deleteMutation);

    // Assert
    Assert.NotNull(result);
    Assert.True(result.IsSuccess());

    await using (var scope = Provider.CreateAsyncScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<ContractType>>();

      var remainingContractTypes = await repository.ListAsync();
      Assert.Equal(contractTypeToKeep.Length, remainingContractTypes.Count);
      Assert.All(contractTypeToKeep, toKeep => remainingContractTypes.Select(x => x.Id).Contains(toKeep.Id));

      Assert.DoesNotContain(
        remainingContractTypes,
        remaning => contractTypeToDelete.Select(toDelete => toDelete.Id).Contains(remaning.Id));
    }
  }
}
