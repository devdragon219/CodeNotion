using RealGimm.Core.Asst.CatalogueTypeAggregate;
using RealGimm.Core.Shared;
using RealGimm.Infrastructure;
using RealGimm.Web.Fclt.Models;

namespace RealGimm.FunctionalTests.Web.Fakers.Fclt;

public sealed class TicketCatalogueTypeEqualityConditionInputFaker : BaseSeededFaker<TicketCatalogueTypeEqualityConditionInput>
{
  public required IEnumerable<CatalogueType> CatalogueTypes { get; init; }

  public TicketCatalogueTypeEqualityConditionInputFaker() : base(seed: 1)
  {
    CustomInstantiator(faker =>
    {
      var input = new TicketCatalogueTypeEqualityConditionInput()
      {
        Operator = faker.PickRandom<EqualityOperator>(),
        TargetCatalogueTypeId = faker.PickRandom(CatalogueTypes).Id
      };

      return input;
    });
  }
}
