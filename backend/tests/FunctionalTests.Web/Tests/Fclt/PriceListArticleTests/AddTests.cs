﻿using Ardalis.Specification;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core;
using RealGimm.Core.Asst.CatalogueCategoryAggregate;
using RealGimm.Core.Asst.CatalogueTypeAggregate;
using RealGimm.Core.Fclt.CraftAggregate;
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
public sealed class AddTests : BaseAddTests<PriceListArticle, AddPriceListArticleInput>
{
  public override string EntityFragment => GraphQLHelper.Fclt.PriceListArticleFragment();
  public override ISpecification<PriceListArticle>[] AdditionalSpecifications => [new PriceListArticleIncludeAllSpec()];

  public AddTests(EmptyDbWebFactory factory) : base(factory)
  {
  }

  protected override async Task<AddPriceListArticleInput> ArrangeAsync(IServiceProvider scopedServices)
  {
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

    var priceListArticleInputFaker = new AddPriceListArticleInputFaker
    {
      CatalogueTypes = catalogueTypes,
      PriceLists = priceLists,
      PriceListMeasurementUnits = priceListMeasurementUnits
    };

    var input = priceListArticleInputFaker.Generate();

    return input;
  }

  protected override Task AssertAsync(
    IServiceProvider scopedServices,
    AddPriceListArticleInput input,
    PriceListArticle addedEntity)
  {
    AssertHelper.Fclt.PriceListArticleEqual(input, addedEntity);
    return Task.CompletedTask;
  }
}