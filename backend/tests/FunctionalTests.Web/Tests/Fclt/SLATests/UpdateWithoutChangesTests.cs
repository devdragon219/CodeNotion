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
using RealGimm.Infrastructure.Asst.Data.Fakers;
using RealGimm.Infrastructure.Fclt.Data.Fakers;
using RealGimm.Web.Fclt.Models;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.SLATests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class UpdateWithoutChangesTests : BaseUpdateWithoutChangesTests<SLA, SLAInput>
{
  public override string ModuleName => "sla";
  public override string EntityFragment => GraphQLHelper.Fclt.SLAFragment();
  public override ISpecification<SLA>[] AdditionalSpecifications => [new SLAIncludeAllSpec()];

  public UpdateWithoutChangesTests(EmptyDbWebFactory factory) : base(factory)
  {
  }

  protected override async Task<SLA> ArrangeAsync(IServiceProvider scopedServices)
  {
    var repository = scopedServices.GetRequiredService<IRepository<SLA>>();

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

    var slaFaker = new SLAFaker
    {
      ComplexTicketConditionFaker = new ComplexTicketConditionFaker
      {
        InternalConditionFaker = new TicketConditionFaker
        {
          TicketTypes = ticketTypes,
          Calendars = calendars,
          CatalogueCategories = catalogueCategories,
          CatalogueSubCategories = catalogueSubCategories,
          CatalogueTypes = catalogueTypes
        }
      }
    };

    var slaToUpdate = slaFaker.Generate();
    await repository.AddAsync(slaToUpdate);

    return slaToUpdate;
  }

  protected override SLAInput MapEntityToInput(SLA entity) => MappingHelper.Fclt.MapSLAInput(entity);

  protected override async Task AssertAsync(IServiceProvider scopedServices, SLA entityToUpdate, SLA updatedEntity)
  {
    var repository = scopedServices.GetRequiredService<IReadRepository<SLA>>();
    await repository.LoadNavigationsAsync(updatedEntity.IfCondition, CancellationToken.None);
    await repository.LoadNavigationsAsync(updatedEntity.ThenCondition, CancellationToken.None);

    Assert.StrictEqual(entityToUpdate, entityToUpdate);
  }
}
