using HotChocolate.Execution;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core;
using RealGimm.Core.Asst.CatalogueCategoryAggregate;
using RealGimm.Core.Asst.CatalogueTypeAggregate;
using RealGimm.Core.Fclt.CraftAggregate;
using RealGimm.Core.Fclt.InterventionTypeAggregate;
using RealGimm.Core.Fclt.PriceListArticleAggregate;
using RealGimm.Core.Fclt.TicketTypeAggregate;
using RealGimm.Core.Shared.Specifications;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.Infrastructure.Asst.Data.Fakers;
using RealGimm.Infrastructure.Fclt.Data.Fakers;
using RealGimm.Core.Fclt.SLAAggregate;
using RealGimm.FunctionalTests.Web.Fakers.Fclt;
using RealGimm.Core.Fclt.PenaltyAggregate;
using RealGimm.Core.Fclt.ContractTypeAggregate;
using RealGimm.Core.Fclt.PriceListAggregate;
using RealGimm.Core.Fclt.PriceListMeasurementUnitAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.PriceListArticleTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class DeleteTests : EmptyDbWebTest
{
  public string Mutation => $$"""
    mutation($id: Int!) {
      priceListArticle {
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
    PriceListArticle priceListArticleToDelete;

    await using (var scope = Provider.CreateAsyncScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<PriceListArticle>>();

      var catalogueCategoryFaker = new CatalogueCategoryFaker()
        .UseSubCategoryFaker(new CatalogueSubCategoryFaker());

      var catalogueCategories = await scope.ServiceProvider
        .GetRequiredService<IRepository<CatalogueCategory>>()
        .AddRangeAsync(catalogueCategoryFaker.Generate(2));

      var catalogueTypeFaker = new CatalogueTypeFaker()
        .UseActivityFaker(new CatalogueTypeActivityFaker())
        .UseCategories(catalogueCategories)
        .UseEstateUsageTypes(new EstateUsageTypeFaker().Generate(2))
        .UseFieldFaker(new CatalogueTypeFieldFaker());

      var catalogueTypes = await scope.ServiceProvider
        .GetRequiredService<IRepository<CatalogueType>>()
        .AddRangeAsync(catalogueTypeFaker.Generate(3));

      var priceLists = await scope.ServiceProvider
        .GetRequiredService<IRepository<PriceList>>()
        .AddRangeAsync(new PriceListFaker().Generate(2));

      var priceListMeasurementUnits = await scope.ServiceProvider
        .GetRequiredService<IRepository<PriceListMeasurementUnit>>()
        .AddRangeAsync(new PriceListMeasurementUnitFaker().Generate(2));

      var priceListArticleFaker = new PriceListArticleFaker()
      {
        CatalogueTypes = catalogueTypes,
        PriceLists = priceLists,
        PriceListMeasurementUnits = priceListMeasurementUnits
      };

      priceListArticleToDelete = await scope.ServiceProvider
        .GetRequiredService<IRepository<PriceListArticle>>()
        .AddAsync(priceListArticleFaker.Generate());
    }

    var deleteMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("id", priceListArticleToDelete.Id)
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(deleteMutation);

    // Assert
    Assert.NotNull(result);
    Assert.True(result.IsSuccess());

    await using (var scope = Provider.CreateAsyncScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<PriceListArticle>>();

      var deletedPriceListArticle = await repository.SingleOrDefaultAsync(
        new GetByIdSpec<PriceListArticle>(priceListArticleToDelete.Id));

      Assert.Null(deletedPriceListArticle);
    }
  }
}
