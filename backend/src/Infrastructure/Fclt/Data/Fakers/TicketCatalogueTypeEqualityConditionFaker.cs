using RealGimm.Core.Asst.CatalogueTypeAggregate;
using RealGimm.Core.Fclt.SLAAggregate;
using RealGimm.Core.Shared;

namespace RealGimm.Infrastructure.Fclt.Data.Fakers;

public sealed class TicketCatalogueTypeEqualityConditionFaker : BaseSeededFaker<TicketCatalogueTypeEqualityCondition>
{
  public required IEnumerable<CatalogueType> CatalogueTypes { get; init; }

  public TicketCatalogueTypeEqualityConditionFaker()
  {
    CustomInstantiator(faker =>
    {
      var condition = new TicketCatalogueTypeEqualityCondition();
      condition.SetOperator(faker.PickRandom<EqualityOperator>());
      condition.SetTargetCatalogueTypeId(faker.PickRandom(CatalogueTypes).Id);

      return condition;
    });

    FinishWith((_, condition) => EnsureValid(condition));
  }
}
