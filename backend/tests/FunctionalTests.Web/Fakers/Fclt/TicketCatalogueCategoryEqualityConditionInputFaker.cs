using RealGimm.Core.Asst.CatalogueCategoryAggregate;
using RealGimm.Core.Shared;
using RealGimm.Infrastructure;
using RealGimm.Web.Fclt.Models;

namespace RealGimm.FunctionalTests.Web.Fakers.Fclt;

public sealed class TicketCatalogueCategoryEqualityConditionInputFaker : BaseSeededFaker<TicketCatalogueCategoryEqualityConditionInput>
{
  public required IEnumerable<CatalogueCategory> CatalogueCategories { get; init; }

  public TicketCatalogueCategoryEqualityConditionInputFaker() : base(seed: 1)
  {
    CustomInstantiator(faker =>
    {
      var input = new TicketCatalogueCategoryEqualityConditionInput()
      {
        Operator = faker.PickRandom<EqualityOperator>(),
        TargetCatalogueCategoryId = faker.PickRandom(CatalogueCategories).Id
      };

      return input;
    });
  }
}
