using RealGimm.Core.Asst.CatalogueTypeAggregate;
using RealGimm.Core.Fclt.CraftAggregate;
using RealGimm.Core.Fclt.InterventionTypeAggregate;
using RealGimm.Core.Fclt.TicketChecklistAggregate;
using RealGimm.Core.Fclt.TicketChecklistTemplateAggregate;
using RealGimm.Infrastructure;
using RealGimm.Web.Fclt.Models;

namespace RealGimm.FunctionalTests.Web.Fakers.Fclt;

public sealed class TicketChecklistTemplateInputFaker : BaseSeededFaker<TicketChecklistTemplateInput>
{
  private int _generatedInputsCount = 0;

  public required IEnumerable<InterventionType> InterventionTypes { get; init; }
  public required IEnumerable<Craft> Crafts { get; init; }
  public required IEnumerable<CatalogueType> CatalogueTypes { get; init; }

  public TicketChecklistTemplateInputFaker() : base(seed: 1)
  {
    CustomInstantiator(faker =>
    {
      var input = new TicketChecklistTemplateInput();

      var type = faker.PickRandom<TicketChecklistTemplateType>();

      input.Type = type;
      input.Name = faker.Company.CompanyName();
      input.InternalCode = $"SM{(_generatedInputsCount + 1).ToString().PadLeft(2, '0')}";

      var catalogueType = faker.PickRandom(CatalogueTypes);
      input.CatalogueTypeId = catalogueType.Id;

      var rawCost = decimal.Round(faker.Random.Decimal(100, 1000), 2);
      input.RawWorkCost = rawCost;
      input.SafetyCost = rawCost + 100m;
      input.CostBaseFactor = faker.PickRandom<CostBaseFactor>();

      if (type is TicketChecklistTemplateType.PreventativeAndOnTriggerCondition or TicketChecklistTemplateType.Preventative)
      {
        var preventativeActivities = faker.PickRandom(catalogueType.Activities, amountToPick: faker.Random.Int(1, 5));
        var preventativePlannedPeriod = faker.Random.Bool(0.8f) ? faker.PickRandom<PlannedPeriod>() : (PlannedPeriod?)null;
        
        input.PreventativePlannedPeriod = preventativePlannedPeriod;
        input.PreventativeDaysOfWeek = (preventativePlannedPeriod is PlannedPeriod.Midweek) ? [faker.PickRandom<DayOfWeek>()] : null;
        input.PreventativeToleranceDays = faker.Random.Int(0, 2);
        input.PreventativeInterventionTypeId = faker.Random.Bool(0.8f) ? faker.PickRandom(InterventionTypes).Id : null;
        input.PreventativeCraftId = faker.Random.Bool(0.8f) ? faker.PickRandom(Crafts).Id : null;
        input.PreventativeActivityIds = preventativeActivities.Select(activity => activity.Id).ToArray();
      }

      if (type is TicketChecklistTemplateType.PreventativeAndOnTriggerCondition or TicketChecklistTemplateType.OnTriggerCondition)
      {
        var onTriggerActivities = faker.PickRandom(catalogueType.Activities, amountToPick: faker.Random.Int(1, 5));
        input.OnTriggerInterventionTypeId = faker.Random.Bool(0.8f) ? faker.PickRandom(InterventionTypes).Id : null;
        input.OnTriggerCraftId = faker.Random.Bool(0.8f) ? faker.PickRandom(Crafts).Id : null;
        input.OnTriggerActivityIds = onTriggerActivities.Select(activity => activity.Id).ToArray();
      }

      return input;
    });

    FinishWith((faker, input) => _generatedInputsCount++);
  }
}
