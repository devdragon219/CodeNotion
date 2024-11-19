using Ardalis.Specification;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core;
using RealGimm.Core.Asst.CatalogueCategoryAggregate;
using RealGimm.Core.Asst.CatalogueTypeAggregate;
using RealGimm.Core.Asst.EstateUsageTypeAggregate;
using RealGimm.Core.Fclt.CalendarAggregate;
using RealGimm.Core.Fclt.PenaltyAggregate;
using RealGimm.Core.Fclt.PenaltyAggregate.Specifications;
using RealGimm.Core.Fclt.TicketTypeAggregate;
using RealGimm.Infrastructure.Asst.Data.Fakers;
using RealGimm.Infrastructure.Fclt.Data.Fakers;
using RealGimm.Web.Fclt.Models;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.PenaltyTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class UpdateWithoutChangesTests : BaseUpdateWithoutChangesTests<Penalty, PenaltyInput>
{
  public override string EntityFragment => GraphQLHelper.Fclt.PenaltyFragment();
  public override ISpecification<Penalty>[] AdditionalSpecifications => [new PenaltyIncludeAllSpec()];

  public UpdateWithoutChangesTests(EmptyDbWebFactory factory) : base(factory)
  {
  }

  protected override async Task<Penalty> ArrangeAsync(IServiceProvider scopedServices)
  {
    var repository = scopedServices.GetRequiredService<IRepository<Penalty>>();

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

    var penaltyFaker = new PenaltyFaker
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

    var penaltyToUpdate = penaltyFaker.Generate();
    await repository.AddAsync(penaltyToUpdate);

    return penaltyToUpdate;
  }

  protected override PenaltyInput MapEntityToInput(Penalty entity) => MappingHelper.Fclt.MapPenaltyInput(entity);

  protected override async Task AssertAsync(IServiceProvider scopedServices, Penalty entityToUpdate, Penalty updatedEntity)
  {
    var repository = scopedServices.GetRequiredService<IReadRepository<Penalty>>();
    await repository.LoadNavigationsAsync(updatedEntity.IfCondition, CancellationToken.None);

    Assert.StrictEqual(entityToUpdate, entityToUpdate);
  }
}
