using HotChocolate.Execution;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core;
using RealGimm.Core.Common.VATRateAggregate;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.Infrastructure.Common.Data.Fakers;

namespace RealGimm.FunctionalTests.Web.Tests.Common.VATRateTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class DeleteRangeTests : EmptyDbWebTest
{
  public string Mutation { get; } = $$"""
    mutation($ids: [Int!]!) {
      vatRate {
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
    var vatRate = new VATRateFaker().Generate(4);
    var vatRatesToKeep = vatRate.Take(2).ToArray();
    var vatRatesToDelete = vatRate.Except(vatRatesToKeep).ToArray();

    await using (var scope = Provider.CreateAsyncScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<VATRate>>();
      await repository.AddRangeAsync(vatRate);
    }

    var deleteMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("ids", vatRatesToDelete.Select(x => x.Id).ToArray())
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(deleteMutation);

    // Assert
    Assert.NotNull(result);
    Assert.True(result.IsSuccess());

    await using (var scope = Provider.CreateAsyncScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<VATRate>>();

      var remainingVATRates = await repository.ListAsync();
      Assert.Equal(vatRatesToKeep.Length, remainingVATRates.Count);
      Assert.All(vatRatesToKeep, toKeep => remainingVATRates.Select(x => x.Id).Contains(toKeep.Id));

      Assert.DoesNotContain(
        remainingVATRates,
        remaning => vatRatesToDelete.Select(toDelete => toDelete.Id).Contains(remaning.Id));
    }
  }
}
