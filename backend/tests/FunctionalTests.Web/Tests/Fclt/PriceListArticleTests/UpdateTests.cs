using Ardalis.Specification;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core;
using RealGimm.Core.Asst.CatalogueCategoryAggregate;
using RealGimm.Core.Asst.CatalogueTypeAggregate;
using RealGimm.Core.Fclt.PriceListArticleAggregate;
using RealGimm.Core.Fclt.PriceListArticleAggregate.Specifications;
using RealGimm.FunctionalTests.Web.Fakers.Fclt;
using RealGimm.Infrastructure.Asst.Data.Fakers;
using RealGimm.Infrastructure.Fclt.Data.Fakers;
using RealGimm.Web.Fclt.Models;
using RealGimm.Core.Fclt.PriceListAggregate;
using RealGimm.Core.Fclt.PriceListMeasurementUnitAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.PriceListArticleTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class UpdateTests : BaseUpdateWithIdParameterTests<PriceListArticle, UpdatePriceListArticleInput>
{
  public override string EntityFragment => GraphQLHelper.Fclt.PriceListArticleFragment();
  public override ISpecification<PriceListArticle>[] AdditionalSpecifications => [new PriceListArticleIncludeAllSpec()];

  public UpdateTests(EmptyDbWebFactory factory) : base(factory)
  {
  }

  protected override async Task<(PriceListArticle EntityToUpdate, UpdatePriceListArticleInput Input)> ArrangeAsync(
    IServiceProvider scopedServices)
  {
    var repository = scopedServices.GetRequiredService<IRepository<PriceListArticle>>();

    var catalogueCategoryFaker = new CatalogueCategoryFaker()
      .UseSubCategoryFaker(new CatalogueSubCategoryFaker());

    var catalogueCategories = await scopedServices
      .GetRequiredService<IRepository<CatalogueCategory>>()
      .AddRangeAsync(catalogueCategoryFaker.Generate(2));

    var catalogueTypeFaker = new CatalogueTypeFaker()
      .UseActivityFaker(new CatalogueTypeActivityFaker())
      .UseCategories(catalogueCategories)
      .UseEstateUsageTypes(new EstateUsageTypeFaker().Generate(2))
      .UseFieldFaker(new CatalogueTypeFieldFaker());

    var catalogueTypes = await scopedServices
      .GetRequiredService<IRepository<CatalogueType>>()
      .AddRangeAsync(catalogueTypeFaker.Generate(3));

    var priceLists = await scopedServices
      .GetRequiredService<IRepository<PriceList>>()
      .AddRangeAsync(new PriceListFaker().Generate(2));

    var priceListMeasurementUnits = await scopedServices
      .GetRequiredService<IRepository<PriceListMeasurementUnit>>()
      .AddRangeAsync(new PriceListMeasurementUnitFaker().Generate(2));

    var priceListArticleFaker = new PriceListArticleFaker()
    {
      CatalogueTypes = catalogueTypes,
      PriceLists = priceLists,
      PriceListMeasurementUnits = priceListMeasurementUnits
    };

    var priceListArticleToUpdate = priceListArticleFaker.Generate();
    await repository.AddAsync(priceListArticleToUpdate);

    var priceListArticleInputFaker = new UpdatePriceListArticleInputFaker
    {
      CatalogueTypes = catalogueTypes,
      PriceLists = priceLists,
      PriceListMeasurementUnits = priceListMeasurementUnits
    };

    var input = priceListArticleInputFaker.Generate();

    return (priceListArticleToUpdate, input);
  }

  protected override Task AssertAsync(
    IServiceProvider scopedServices,
    UpdatePriceListArticleInput input,
    PriceListArticle updatedEntity)
  {
    AssertHelper.Fclt.PriceListArticleEqual(input, updatedEntity);
    return Task.CompletedTask;
  }
}
