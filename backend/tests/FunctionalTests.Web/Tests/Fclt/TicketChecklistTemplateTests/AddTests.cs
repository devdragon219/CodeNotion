using Ardalis.Specification;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core;
using RealGimm.Core.Asst.CatalogueCategoryAggregate;
using RealGimm.Core.Asst.CatalogueTypeAggregate;
using RealGimm.Core.Fclt.CraftAggregate;
using RealGimm.Core.Fclt.InterventionTypeAggregate;
using RealGimm.Core.Fclt.TicketChecklistTemplateAggregate;
using RealGimm.Core.Fclt.TicketChecklistTemplateAggregate.Specifications;
using RealGimm.FunctionalTests.Web.Fakers.Fclt;
using RealGimm.Infrastructure.Asst.Data.Fakers;
using RealGimm.Infrastructure.Fclt.Data.Fakers;
using RealGimm.Web.Fclt.Models;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.TicketChecklistTemplateTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class AddTests : BaseAddTests<TicketChecklistTemplate, TicketChecklistTemplateInput>
{
  public override string EntityFragment => GraphQLHelper.Fclt.TicketChecklistTemplateFragment();
  public override ISpecification<TicketChecklistTemplate>[] AdditionalSpecifications => [new TicketChecklistTemplateIncludeAllSpec()];

  public AddTests(EmptyDbWebFactory factory) : base(factory)
  {
  }

  protected override async Task<TicketChecklistTemplateInput> ArrangeAsync(IServiceProvider scopedServices)
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
      .AddRangeAsync(catalogueTypeFaker.Generate(2));

    var crafts = await scopedServices
      .GetRequiredService<IRepository<Craft>>()
      .AddRangeAsync(new CraftFaker().Generate(2));

    var interventionTypes = await scopedServices
      .GetRequiredService<IRepository<InterventionType>>()
      .AddRangeAsync(new InterventionTypeFaker().Generate(2));

    var ticketChecklistTemplateInputFaker = new TicketChecklistTemplateInputFaker
    {
      CatalogueTypes = catalogueTypes,
      Crafts = crafts,
      InterventionTypes = interventionTypes
    };

    var input = ticketChecklistTemplateInputFaker.Generate();

    return input;
  }

  protected override Task AssertAsync(
    IServiceProvider scopedServices,
    TicketChecklistTemplateInput input,
    TicketChecklistTemplate addedEntity)
  {
    AssertHelper.Fclt.TicketChecklistTemplateEqual(input, addedEntity);
    return Task.CompletedTask;
  }
}
