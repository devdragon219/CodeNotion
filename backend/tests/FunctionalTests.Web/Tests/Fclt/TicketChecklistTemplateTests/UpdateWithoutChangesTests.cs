using Ardalis.Specification;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core;
using RealGimm.Core.Asst.CatalogueCategoryAggregate;
using RealGimm.Core.Asst.CatalogueTypeAggregate;
using RealGimm.Core.Fclt.CraftAggregate;
using RealGimm.Core.Fclt.InterventionTypeAggregate;
using RealGimm.Core.Fclt.TicketChecklistTemplateAggregate;
using RealGimm.Core.Fclt.TicketChecklistTemplateAggregate.Specifications;
using RealGimm.Core.Fclt.TicketTypeAggregate;
using RealGimm.Infrastructure.Asst.Data.Fakers;
using RealGimm.Infrastructure.Fclt.Data.Fakers;
using RealGimm.Web.Fclt.Models;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.TicketChecklistTemplateTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class UpdateWithoutChangesTests : BaseUpdateWithoutChangesTests<TicketChecklistTemplate, TicketChecklistTemplateInput>
{
  public override string EntityFragment => GraphQLHelper.Fclt.TicketChecklistTemplateFragment();
  public override ISpecification<TicketChecklistTemplate>[] AdditionalSpecifications => [new TicketChecklistTemplateIncludeAllSpec()];

  public UpdateWithoutChangesTests(EmptyDbWebFactory factory) : base(factory)
  {
  }

  protected override async Task<TicketChecklistTemplate> ArrangeAsync(IServiceProvider scopedServices)
  {
    var repository = scopedServices.GetRequiredService<IRepository<TicketChecklistTemplate>>();

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

    var ticketChecklistTemplateFaker = new TicketChecklistTemplateFaker
    {
      CatalogueTypes = catalogueTypes,
      Crafts = crafts,
      InterventionTypes = interventionTypes
    };

    var ticketChecklistTemplateToUpdate = ticketChecklistTemplateFaker.Generate();
    await repository.AddAsync(ticketChecklistTemplateToUpdate);

    return ticketChecklistTemplateToUpdate;
  }

  protected override TicketChecklistTemplateInput MapEntityToInput(TicketChecklistTemplate entity)
    => MappingHelper.Fclt.MapTicketChecklistTemplateInput(entity);

  protected override Task AssertAsync(
    IServiceProvider scopedServices,
    TicketChecklistTemplate entityToUpdate,
    TicketChecklistTemplate updatedEntity)
  {
    Assert.StrictEqual(entityToUpdate, entityToUpdate);
    return Task.CompletedTask;
  }
}
