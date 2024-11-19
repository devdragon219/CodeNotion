using RealGimm.Core.Asst.CatalogueCategoryAggregate;
using RealGimm.Core.Asst.CatalogueTypeAggregate;
using RealGimm.Core.Fclt.CalendarAggregate;
using RealGimm.Core.Fclt.SLAAggregate;
using RealGimm.Core.Fclt.TicketTypeAggregate;
using RealGimm.Core.Shared;
using RealGimm.Infrastructure;
using RealGimm.Web.Fclt.Models;

namespace RealGimm.FunctionalTests.Web.Fakers.Fclt;

public sealed class OneOfTicketConditionInputFaker : BaseSeededFaker<OneOfTicketConditionInput>
{
  public required IEnumerable<TicketType> TicketTypes { get; init; }
  public required IEnumerable<Calendar> Calendars { get; init; }
  public required IEnumerable<CatalogueCategory> CatalogueCategories { get; init; }
  public required IEnumerable<CatalogueSubCategory> CatalogueSubCategories { get; init; }
  public required IEnumerable<CatalogueType> CatalogueTypes { get; init; }

  public OneOfTicketConditionInputFaker() : base(seed: 1)
  {
    CustomInstantiator(faker =>
    {
      if (faker.Random.Bool(weight: 0.25f))
      {
        var complexConditionInputFaker = new ComplexTicketConditionInputFaker
        {
          InternalConditionFaker = this
        };

        return new OneOfTicketConditionInput
        {
          Complex = complexConditionInputFaker.Generate()
        };
      }

      switch (faker.Random.Int(1, 6))
      {
        case 1:
        {
          var ticketTypeEqualityConditionInputFaker = new TicketTypeEqualityConditionInputFaker
          {
            TicketTypes = TicketTypes!
          };

          return new OneOfTicketConditionInput
          {
            TicketTypeEquality = ticketTypeEqualityConditionInputFaker.Generate()
          };
        }

        case 2:
        {
          var ticketMasterStatusConditionInputFaker = new TicketMasterStatusConditionInputFaker
          {
            Calendars = Calendars!
          };

          return new OneOfTicketConditionInput
          {
            MasterStatus = ticketMasterStatusConditionInputFaker.Generate()
          };
        }

        case 3:
        {
          var ticketCatalogueCategoryEqualityConditionInputFaker = new TicketCatalogueCategoryEqualityConditionInputFaker
          {
            CatalogueCategories = CatalogueCategories!
          };

          return new OneOfTicketConditionInput
          {
            CatalogueCategoryEquality = ticketCatalogueCategoryEqualityConditionInputFaker.Generate()
          };
        }

        case 4:
        {
          var ticketCatalogueSubCategoryEqualityConditionInputFaker = new TicketCatalogueSubCategoryEqualityConditionInputFaker
          {
            CatalogueSubCategories = CatalogueSubCategories!
          };

          return new OneOfTicketConditionInput
          {
            CatalogueSubCategoryEquality = ticketCatalogueSubCategoryEqualityConditionInputFaker.Generate()
          };
        }

        case 5:
        {
          var ticketCatalogueTypeEqualityConditionInputFaker = new TicketCatalogueTypeEqualityConditionInputFaker
          {
            CatalogueTypes = CatalogueTypes!
          };

          return new OneOfTicketConditionInput
          {
            CatalogueTypeEquality = ticketCatalogueTypeEqualityConditionInputFaker.Generate()
          };
        }

        case 6:
        {
          var ticketPriorityEqualityConditionInputFaker = new TicketPriorityEqualityConditionInputFaker();

          return new OneOfTicketConditionInput
          {
            PriorityEquality = ticketPriorityEqualityConditionInputFaker.Generate()
          };
        }

        default: throw new InvalidOperationException();
      }
    });
  }
}

public sealed class TicketTypeEqualityConditionInputFaker : BaseSeededFaker<TicketTypeEqualityConditionInput>
{
  public required IEnumerable<TicketType> TicketTypes { get; init; }

  public TicketTypeEqualityConditionInputFaker() : base(seed: 1)
  {
    CustomInstantiator(faker =>
    {
      var input = new TicketTypeEqualityConditionInput()
      {
        Operator = faker.PickRandom<EqualityOperator>(),
        TargetTicketTypeId = faker.PickRandom(TicketTypes).Id
      };

      return input;
    });
  }
}
