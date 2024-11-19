using RealGimm.Core.Asst.CatalogueTypeAggregate;
using RealGimm.Core.Fclt.CraftAggregate;
using RealGimm.Core.Fclt.InterventionTypeAggregate;
using RealGimm.Core.Fclt.TicketChecklistAggregate;
using RealGimm.Core.Fclt.TicketChecklistTemplateAggregate;

namespace RealGimm.Infrastructure.Fclt.Data.Fakers;

public sealed class TicketChecklistTemplateFaker : BaseSeededFaker<TicketChecklistTemplate>
{
  private int _generatedObjectsCount = 0;

  public required IEnumerable<InterventionType> InterventionTypes { get; init; }
  public required IEnumerable<Craft> Crafts { get; init; }
  public required IEnumerable<CatalogueType> CatalogueTypes { get; init; }

  public TicketChecklistTemplateFaker()
  {
    CustomInstantiator(faker =>
    {
      var template = new TicketChecklistTemplate();
      
      var type = faker.PickRandom<TicketChecklistTemplateType>();

      template.SetBaseData(
        type,
        name: faker.Company.CompanyName(),
        internalCode: $"SM{(_generatedObjectsCount + 1).ToString().PadLeft(2, '0')}");

      var catalogueType = faker.PickRandom(CatalogueTypes);
      template.SetCatalogueTypeId(catalogueType.Id);
      
      var rawCost = decimal.Round(faker.Random.Decimal(100, 1000), 2);
      template.SetCosts(rawCost, safetyCost: rawCost + 100m, costBaseFactor: faker.PickRandom<CostBaseFactor>());

      if (type is TicketChecklistTemplateType.PreventativeAndOnTriggerCondition or TicketChecklistTemplateType.Preventative)
      {
        var preventativeActivities = faker.PickRandom(catalogueType.Activities, amountToPick: faker.Random.Int(1, 5));
        var preventativePlannedPeriod = faker.Random.Bool(0.8f) ? faker.PickRandom<PlannedPeriod>() : (PlannedPeriod?)null;

        template.SetPreventativeSpecifics(
          plannedPeriod: preventativePlannedPeriod,
          daysOfWeek: (preventativePlannedPeriod is PlannedPeriod.Midweek) ? [faker.PickRandom<DayOfWeek>()] : null,
          toleranceDays: faker.Random.Int(0, 2),
          interventionType: faker.Random.Bool(0.8f) ? faker.PickRandom(InterventionTypes) : null,
          craft: faker.Random.Bool(0.8f) ? faker.PickRandom(Crafts) : null,
          activityIds: preventativeActivities.Select(activity => activity.Id).ToArray());
      }

      if (type is TicketChecklistTemplateType.PreventativeAndOnTriggerCondition or TicketChecklistTemplateType.OnTriggerCondition)
      {
        var onTriggerActivities = faker.PickRandom(catalogueType.Activities, amountToPick: faker.Random.Int(1, 5));

        template.SetOnTriggerSpecifics(
          interventionType: faker.Random.Bool(0.8f) ? faker.PickRandom(InterventionTypes) : null,
          craft: faker.Random.Bool(0.8f) ? faker.PickRandom(Crafts) : null,
          activityIds: onTriggerActivities.Select(activity => activity.Id).ToArray());
      }

      return template;
    });

    FinishWith((faker, template) =>
    {
      EnsureValid(template);
      _generatedObjectsCount++;
    });
  }
}
