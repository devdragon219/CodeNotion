using Ardalis.Specification;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core;
using RealGimm.Core.Asst.CatalogueCategoryAggregate;
using RealGimm.Core.Asst.CatalogueTypeAggregate;
using RealGimm.Core.Fclt.CraftAggregate;
using RealGimm.Core.Fclt.InterventionTypeAggregate;
using RealGimm.Core.Fclt.ContractTemplateAggregate;
using RealGimm.Core.Fclt.ContractTemplateAggregate.Specifications;
using RealGimm.FunctionalTests.Web.Fakers.Fclt;
using RealGimm.Infrastructure.Asst.Data.Fakers;
using RealGimm.Infrastructure.Fclt.Data.Fakers;
using RealGimm.Web.Fclt.Models;
using RealGimm.Core.Fclt.ContractTypeAggregate;
using RealGimm.Core.Fclt.SLAAggregate;
using RealGimm.Core.Fclt.TicketTypeAggregate;
using RealGimm.Core.Fclt.PenaltyAggregate;
using RealGimm.Core.Fclt.CalendarAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.ContractTemplateTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class AddTests : BaseAddTests<ContractTemplate, ContractTemplateInput>
{
  public override string EntityFragment => GraphQLHelper.Fclt.ContractTemplateFragment();
  public override ISpecification<ContractTemplate>[] AdditionalSpecifications => [new ContractTemplateIncludeAllSpec()];

  public AddTests(EmptyDbWebFactory factory) : base(factory)
  {
  }

  protected override async Task<ContractTemplateInput> ArrangeAsync(IServiceProvider scopedServices)
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

    var catalogueSubCategories = catalogueCategories
      .SelectMany(category => category.SubCategories)
      .ToList();

    var contractTypes = await scopedServices
      .GetRequiredService<IRepository<ContractType>>()
      .AddRangeAsync(new ContractTypeFaker().Generate(2));
    
    var ticketTypes = await scopedServices
      .GetRequiredService<IRepository<TicketType>>()
      .AddRangeAsync(new TicketTypeFaker().Generate(2));

    var calendars = await scopedServices
      .GetRequiredService<IRepository<Calendar>>()
      .AddRangeAsync(new CalendarFaker().Generate(2));

    var complexTicketConditionFaker = new ComplexTicketConditionFaker
    {
      InternalConditionFaker = new TicketConditionFaker
      {
        TicketTypes = ticketTypes,
        Calendars = calendars,
        CatalogueCategories = catalogueCategories,
        CatalogueSubCategories = catalogueSubCategories,
        CatalogueTypes = catalogueTypes
      }
    };

    var slaFaker = new SLAFaker
    {
      ComplexTicketConditionFaker = complexTicketConditionFaker
    };

    var slas = await scopedServices
      .GetRequiredService<IRepository<SLA>>()
      .AddRangeAsync(slaFaker.Generate(3));

    var penaltyFaker = new PenaltyFaker
    {
      ComplexTicketConditionFaker = complexTicketConditionFaker
    };

    var penalties = await scopedServices
      .GetRequiredService<IRepository<Penalty>>()
      .AddRangeAsync(penaltyFaker.Generate(3));

    var contractTemplateInputFaker = new ContractTemplateInputFaker
    {
      CatalogueTypes = catalogueTypes,
      ContractTypes = contractTypes,
      SLAs = slas,
      Penalties = penalties
    };

    var input = contractTemplateInputFaker.Generate();

    return input;
  }

  protected override Task AssertAsync(
    IServiceProvider scopedServices,
    ContractTemplateInput input,
    ContractTemplate addedEntity)
  {
    AssertHelper.Fclt.ContractTemplateEqual(input, addedEntity);
    return Task.CompletedTask;
  }
}
