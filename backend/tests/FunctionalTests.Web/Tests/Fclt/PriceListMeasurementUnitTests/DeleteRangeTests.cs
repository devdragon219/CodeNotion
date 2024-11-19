using HotChocolate.Execution;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core;
using RealGimm.Core.Fclt.PriceListMeasurementUnitAggregate;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.Infrastructure.Fclt.Data.Fakers;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.PriceListMeasurementUnitTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class DeleteRangeTests : EmptyDbWebTest
{
  public string Mutation { get; } = $$"""
    mutation($ids: [Int!]!) {
      priceListMeasurementUnit {
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
    PriceListMeasurementUnit[] priceListMeasurementUnitsToKeep;
    PriceListMeasurementUnit[] priceListMeasurementUnitsToDelete;

    await using (var scope = Provider.CreateAsyncScope())
    {
      var priceListMeasurementUnitFaker = new PriceListMeasurementUnitFaker();

      var priceListMeasurementUnits = await scope.ServiceProvider
        .GetRequiredService<IRepository<PriceListMeasurementUnit>>()
        .AddRangeAsync(priceListMeasurementUnitFaker.Generate(4));

      priceListMeasurementUnitsToKeep = priceListMeasurementUnits.Take(2).ToArray();
      priceListMeasurementUnitsToDelete = priceListMeasurementUnits.Except(priceListMeasurementUnitsToKeep).ToArray();
    }

    var deleteMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("ids", priceListMeasurementUnitsToDelete.Select(x => x.Id).ToArray())
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(deleteMutation);

    // Assert
    Assert.NotNull(result);
    Assert.True(result.IsSuccess());

    await using (var scope = Provider.CreateAsyncScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<PriceListMeasurementUnit>>();
      var remainingPriceListMeasurementUnits = await repository.ListAsync();
      Assert.True(priceListMeasurementUnitsToKeep.Zip(remainingPriceListMeasurementUnits).All(pair => pair.First.Id == pair.Second.Id));
    }
  }
}
