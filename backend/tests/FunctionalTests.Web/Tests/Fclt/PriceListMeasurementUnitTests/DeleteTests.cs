using HotChocolate.Execution;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core;
using RealGimm.Core.Fclt.PriceListMeasurementUnitAggregate;
using RealGimm.Core.Shared.Specifications;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.Infrastructure.Fclt.Data.Fakers;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.PriceListMeasurementUnitTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class DeleteTests : EmptyDbWebTest
{
  public string Mutation => $$"""
    mutation($id: Int!) {
      priceListMeasurementUnit {
        delete(id: $id) {
          {{GraphQLHelper.ResultFragment()}}
        }
      }
    }
    """;

  public DeleteTests(EmptyDbWebFactory factory) : base(factory)
  {
  }

  [Fact]
  public async Task Should_Delete()
  {
    // Arrange
    PriceListMeasurementUnit priceListMeasurementUnitToDelete;

    await using (var scope = Provider.CreateAsyncScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<PriceListMeasurementUnit>>();
      var qualificationFaker = new PriceListMeasurementUnitFaker();

      priceListMeasurementUnitToDelete = await scope.ServiceProvider
        .GetRequiredService<IRepository<PriceListMeasurementUnit>>()
        .AddAsync(qualificationFaker.Generate());
    }

    var deleteMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("id", priceListMeasurementUnitToDelete.Id)
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

      var deletedPriceListMeasurementUnit = await repository.SingleOrDefaultAsync(
        new GetByIdSpec<PriceListMeasurementUnit>(priceListMeasurementUnitToDelete.Id));

      Assert.Null(deletedPriceListMeasurementUnit);
    }
  }
}
