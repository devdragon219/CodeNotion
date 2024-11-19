using HotChocolate.Execution;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core;
using RealGimm.Core.Asst.EstateMainUsageTypeAggregate;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.Infrastructure.Asst.Data.Fakers;

namespace RealGimm.FunctionalTests.Web.Tests.Asst.EstateMainUsageTypeTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class DeleteRangeTests : EmptyDbWebTest
{
  public string Mutation { get; } = $$"""
    mutation($ids: [Int!]!) {
      estateMainUsageType {
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
    var estateMainUsageType = new EstateMainUsageTypeFaker().Generate(5);
    var estateMainUsageTypesToKeep = estateMainUsageType.Take(3).ToArray();
    var estateMainUsageTypesToDelete = estateMainUsageType.Except(estateMainUsageTypesToKeep).ToArray();

    await using (var scope = Provider.CreateAsyncScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<EstateMainUsageType>>();
      await repository.AddRangeAsync(estateMainUsageType);
    }

    var deleteMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("ids", estateMainUsageTypesToDelete.Select(x => x.Id).ToArray())
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(deleteMutation);

    // Assert
    Assert.NotNull(result);
    Assert.True(result.IsSuccess());

    await using (var scope = Provider.CreateAsyncScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<EstateMainUsageType>>();

      var remainingEstateMainUsageTypes = await repository.ListAsync();
      Assert.Equal(estateMainUsageTypesToKeep.Length, remainingEstateMainUsageTypes.Count);
      Assert.All(estateMainUsageTypesToKeep, toKeep => remainingEstateMainUsageTypes.Select(x => x.Id).Contains(toKeep.Id));

      Assert.DoesNotContain(
        remainingEstateMainUsageTypes,
        remaning => estateMainUsageTypesToDelete.Select(toDelete => toDelete.Id).Contains(remaning.Id));
    }
  }
}
