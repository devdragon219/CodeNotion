using HotChocolate.Execution;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core;
using RealGimm.Core.Fclt.PriceListAggregate;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.Infrastructure.Fclt.Data.Fakers;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.PriceListTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class DeleteRangeTests : EmptyDbWebTest
{
  public string Mutation { get; } = $$"""
    mutation($ids: [Int!]!) {
      priceList {
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
    PriceList[] priceListsToKeep;
    PriceList[] priceListsToDelete;

    await using (var scope = Provider.CreateAsyncScope())
    {
      var priceListFaker = new PriceListFaker();

      var priceLists = await scope.ServiceProvider
        .GetRequiredService<IRepository<PriceList>>()
        .AddRangeAsync(priceListFaker.Generate(4));

      priceListsToKeep = priceLists.Take(2).ToArray();
      priceListsToDelete = priceLists.Except(priceListsToKeep).ToArray();
    }

    var deleteMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("ids", priceListsToDelete.Select(x => x.Id).ToArray())
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(deleteMutation);

    // Assert
    Assert.NotNull(result);
    Assert.True(result.IsSuccess());

    await using (var scope = Provider.CreateAsyncScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<PriceList>>();
      var remainingPriceLists = await repository.ListAsync();
      Assert.True(priceListsToKeep.Zip(remainingPriceLists).All(pair => pair.First.Id == pair.Second.Id));
    }
  }
}
