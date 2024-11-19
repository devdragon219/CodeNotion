using HotChocolate.Execution;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core;
using RealGimm.Core.Asst.EstateUsageTypeAggregate;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.Infrastructure.Asst.Data.Fakers;

namespace RealGimm.FunctionalTests.Web.Tests.Asst.EstateUsageTypeTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class DeleteRangeTests : EmptyDbWebTest
{
  public string Mutation { get; } = $$"""
    mutation($ids: [Int!]!) {
      estateUsageType {
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
    var estateUsageType = new EstateUsageTypeFaker().Generate(5);
    var estateUsageTypesToKeep = estateUsageType.Take(3).ToArray();
    var estateUsageTypesToDelete = estateUsageType.Except(estateUsageTypesToKeep).ToArray();

    await using (var scope = Provider.CreateAsyncScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<EstateUsageType>>();
      await repository.AddRangeAsync(estateUsageType);
    }

    var deleteMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("ids", estateUsageTypesToDelete.Select(x => x.Id).ToArray())
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(deleteMutation);

    // Assert
    Assert.NotNull(result);
    Assert.True(result.IsSuccess());

    await using (var scope = Provider.CreateAsyncScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<EstateUsageType>>();

      var remainingEstateUsageTypes = await repository.ListAsync();
      Assert.Equal(estateUsageTypesToKeep.Length, remainingEstateUsageTypes.Count);
      Assert.All(estateUsageTypesToKeep, toKeep => remainingEstateUsageTypes.Select(x => x.Id).Contains(toKeep.Id));

      Assert.DoesNotContain(
        remainingEstateUsageTypes,
        remaning => estateUsageTypesToDelete.Select(toDelete => toDelete.Id).Contains(remaning.Id));
    }
  }
}
