using RealGimm.Core.Asst.CatalogueCategoryAggregate;
using RealGimm.Core.Fclt.SLAAggregate;
using RealGimm.Core.Shared;

namespace RealGimm.Infrastructure.Fclt.Data.Fakers;

public sealed class TicketCatalogueSubCategoryEqualityConditionFaker : BaseSeededFaker<TicketCatalogueSubCategoryEqualityCondition>
{
  public required IEnumerable<CatalogueSubCategory> CatalogueSubCategories { get; init; }

  public TicketCatalogueSubCategoryEqualityConditionFaker()
  {
    CustomInstantiator(faker =>
    {
      var condition = new TicketCatalogueSubCategoryEqualityCondition();
      condition.SetOperator(faker.PickRandom<EqualityOperator>());
      condition.SetTargetCatalogueSubCategoryId(faker.PickRandom(CatalogueSubCategories).Id);

      return condition;
    });

    FinishWith((_, condition) => EnsureValid(condition));
  }
}
