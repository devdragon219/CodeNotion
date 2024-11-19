using Ardalis.Specification;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core;
using RealGimm.Core.Asst.CatalogueCategoryAggregate;
using RealGimm.Core.Asst.CatalogueTypeAggregate;
using RealGimm.Core.Asst.EstateUsageTypeAggregate;
using RealGimm.Core.Fclt.CalendarAggregate;
using RealGimm.Core.Fclt.SLAAggregate;
using RealGimm.Core.Fclt.SLAAggregate.Specifications;
using RealGimm.Core.Fclt.TicketTypeAggregate;
using RealGimm.FunctionalTests.Web.Fakers.Fclt;
using RealGimm.Infrastructure.Asst.Data.Fakers;
using RealGimm.Infrastructure.Fclt.Data.Fakers;
using RealGimm.Web.Fclt.Models;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.SLATests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class AddRangeTests : BaseAddRangeTests<SLA, SLAInput>
{
  public override string ModuleName => "sla";
  public override string EntityFragment => GraphQLHelper.Fclt.SLAFragment();
  public override ISpecification<SLA>[] AdditionalSpecifications => [new SLAIncludeAllSpec()];

  public AddRangeTests(EmptyDbWebFactory factory) : base(factory)
  {
  }

  protected override async Task<SLAInput> ArrangeAsync(IServiceProvider scopedServices)
  {
    var ticketTypes = await scopedServices
      .GetRequiredService<IRepository<TicketType>>()
      .AddRangeAsync(new TicketTypeFaker().Generate(2));

    var calendars = await scopedServices
      .GetRequiredService<IRepository<Calendar>>()
      .AddRangeAsync(new CalendarFaker().Generate(2));

    var catalogueCategoryFaker = new CatalogueCategoryFaker()
      .UseSubCategoryFaker(new CatalogueSubCategoryFaker());

    var catalogueCategories = await scopedServices
      .GetRequiredService<IRepository<CatalogueCategory>>()
      .AddRangeAsync(catalogueCategoryFaker.Generate(2));

    var catalogueSubCategories = catalogueCategories
      .SelectMany(category => category.SubCategories)
      .ToList();

    var esateUsageTypes = await scopedServices
      .GetRequiredService<IRepository<EstateUsageType>>()
      .AddRangeAsync(new EstateUsageTypeFaker().Generate(2));

    var catalogueTypeFaker = new CatalogueTypeFaker()
      .UseCategories(catalogueCategories)
      .UseEstateUsageTypes(esateUsageTypes)
      .UseActivityFaker(new CatalogueTypeActivityFaker())
      .UseFieldFaker(new CatalogueTypeFieldFaker());

    var catalogueTypes = await scopedServices
      .GetRequiredService<IRepository<CatalogueType>>()
      .AddRangeAsync(catalogueTypeFaker.Generate(2));

    var slaInputFaker = new SLAInputFaker
    {
      ComplexTicketConditionInputFaker = new ComplexTicketConditionInputFaker
      {
        InternalConditionFaker = new OneOfTicketConditionInputFaker
        {
          TicketTypes = ticketTypes,
          Calendars = calendars,
          CatalogueCategories = catalogueCategories,
          CatalogueSubCategories = catalogueSubCategories,
          CatalogueTypes = catalogueTypes
        }
      }
    };

    var input = slaInputFaker.Generate();

    return input;
  }

  protected override async Task AssertAsync(IServiceProvider scopedServices, SLAInput input, SLA addedEntity)
  {
    var repository = scopedServices.GetRequiredService<IReadRepository<SLA>>();
    await repository.LoadNavigationsAsync(addedEntity.IfCondition, CancellationToken.None);
    await repository.LoadNavigationsAsync(addedEntity.ThenCondition, CancellationToken.None);

    AssertHelper.Fclt.SLAEqual(input, addedEntity);
  }
}
