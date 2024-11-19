using RealGimm.Core.Asst.CatalogueCategoryAggregate;
using RealGimm.Core.Fclt.SLAAggregate;
using RealGimm.Core.Shared;

namespace RealGimm.Infrastructure.Fclt.Data.Fakers;

public sealed class TicketCatalogueCategoryEqualityConditionFaker : BaseSeededFaker<TicketCatalogueCategoryEqualityCondition>
{
  public required IEnumerable<CatalogueCategory> CatalogueCategories { get; init; }

  public TicketCatalogueCategoryEqualityConditionFaker()
  {
    CustomInstantiator(faker =>
    {
      var condition = new TicketCatalogueCategoryEqualityCondition();
      condition.SetOperator(faker.PickRandom<EqualityOperator>());
      condition.SetTargetCatalogueCategoryId(faker.PickRandom(CatalogueCategories).Id);

      return condition;
    });

    FinishWith((_, condition) => EnsureValid(condition));
  }
}
