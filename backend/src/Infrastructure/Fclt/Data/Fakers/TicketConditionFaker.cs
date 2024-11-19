using RealGimm.Core.Asst.CatalogueCategoryAggregate;
using RealGimm.Core.Asst.CatalogueTypeAggregate;
using RealGimm.Core.Fclt.CalendarAggregate;
using RealGimm.Core.Fclt.SLAAggregate;
using RealGimm.Core.Fclt.TicketTypeAggregate;

namespace RealGimm.Infrastructure.Fclt.Data.Fakers;

public sealed class TicketConditionFaker : BaseSeededFaker<TicketCondition>
{
  public required IEnumerable<TicketType> TicketTypes { get; init; }
  public required IEnumerable<Calendar> Calendars { get; init; }
  public required IEnumerable<CatalogueCategory> CatalogueCategories { get; init; }
  public required IEnumerable<CatalogueSubCategory> CatalogueSubCategories { get; init; }
  public required IEnumerable<CatalogueType> CatalogueTypes { get; init; }

  public TicketConditionFaker()
  {
    CustomInstantiator(faker =>
    {
      if (faker.Random.Bool(weight: 1f / 5f))
      {
        var complexConditionFaker = new ComplexTicketConditionFaker
        {
          InternalConditionFaker = this
        };

        return complexConditionFaker.Generate();
      }

      switch (faker.Random.Int(1, 6))
      {
        case 1:
        {
          var ticketTypeEqualityConditionFaker = new TicketTypeEqualityConditionFaker
          {
            TicketTypes = TicketTypes!
          };

          return ticketTypeEqualityConditionFaker.Generate();
        }

        case 2:
        {
          var ticketMasterStatusConditionFaker = new TicketMasterStatusConditionFaker
          {
            Calendars = Calendars!
          };

          return ticketMasterStatusConditionFaker.Generate();
        }

        case 3:
        {
          var ticketCatalogueCategoryEqualityConditionFaker = new TicketCatalogueCategoryEqualityConditionFaker
          {
            CatalogueCategories = CatalogueCategories!
          };

          return ticketCatalogueCategoryEqualityConditionFaker.Generate();
        }

        case 4:
        {
          var ticketCatalogueSubCategoryEqualityConditionFaker = new TicketCatalogueSubCategoryEqualityConditionFaker
          {
            CatalogueSubCategories = CatalogueSubCategories!
          };
          return ticketCatalogueSubCategoryEqualityConditionFaker.Generate();
        }

        case 5:
        {
          var ticketCatalogueTypeEqualityConditionFaker = new TicketCatalogueTypeEqualityConditionFaker
          {
            CatalogueTypes = CatalogueTypes!
          };
          return ticketCatalogueTypeEqualityConditionFaker.Generate();
        }

        case 6:
        {
          var ticketPriorityEqualityConditionFaker = new TicketPriorityEqualityConditionFaker();
          return ticketPriorityEqualityConditionFaker.Generate();
        }

        default: throw new InvalidOperationException();
      }
    });

    FinishWith((faker, condition) => EnsureValid(condition));
  }
}
