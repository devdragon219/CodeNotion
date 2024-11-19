using HotChocolate.Execution;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core;
using RealGimm.Core.Asst.CatalogueCategoryAggregate;
using RealGimm.Core.Asst.CatalogueTypeAggregate;
using RealGimm.Core.Fclt.CraftAggregate;
using RealGimm.Core.Fclt.InterventionTypeAggregate;
using RealGimm.Core.Fclt.PriceListArticleAggregate;
using RealGimm.Core.Fclt.TicketTypeAggregate;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.Infrastructure.Asst.Data.Fakers;
using RealGimm.Infrastructure.Fclt.Data.Fakers;
using RealGimm.Core.Fclt.SLAAggregate;
using RealGimm.FunctionalTests.Web.Fakers.Fclt;
using RealGimm.Core.Fclt.ContractTypeAggregate;
using RealGimm.Core.Fclt.PenaltyAggregate;
using RealGimm.Core.Fclt.PriceListAggregate;
using RealGimm.Core.Fclt.PriceListMeasurementUnitAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.PriceListArticleTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class DeleteRangeTests : EmptyDbWebTest
{
  public string Mutation { get; } = $$"""
    mutation($ids: [Int!]!) {
      priceListArticle {
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
    PriceListArticle[] priceListArticlesToKeep;
    PriceListArticle[] priceListArticlesToDelete;

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

      var priceListArticles = await scope.ServiceProvider
        .GetRequiredService<IRepository<PriceListArticle>>()
        .AddRangeAsync(priceListArticleFaker.Generate(4));

      priceListArticlesToKeep = priceListArticles.Take(2).ToArray();
      priceListArticlesToDelete = priceListArticles.Except(priceListArticlesToKeep).ToArray();
    }

    var deleteMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("ids", priceListArticlesToDelete.Select(x => x.Id).ToArray())
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
      var remainingPriceListArticles = await repository.ListAsync();
      Assert.True(priceListArticlesToKeep.Zip(remainingPriceListArticles).All(pair => pair.First.Id == pair.Second.Id));
    }
  }
}
