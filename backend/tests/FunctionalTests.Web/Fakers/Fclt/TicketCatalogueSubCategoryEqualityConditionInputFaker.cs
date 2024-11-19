using RealGimm.Core.Asst.CatalogueCategoryAggregate;
using RealGimm.Core.Shared;
using RealGimm.Infrastructure;
using RealGimm.Web.Fclt.Models;

namespace RealGimm.FunctionalTests.Web.Fakers.Fclt;

public sealed class TicketCatalogueSubCategoryEqualityConditionInputFaker : BaseSeededFaker<TicketCatalogueSubCategoryEqualityConditionInput>
{
  public required IEnumerable<CatalogueSubCategory> CatalogueSubCategories { get; init; }

  public TicketCatalogueSubCategoryEqualityConditionInputFaker() : base(seed: 1)
  {
    CustomInstantiator(faker =>
    {
      var input = new TicketCatalogueSubCategoryEqualityConditionInput()
      {
        Operator = faker.PickRandom<EqualityOperator>(),
        TargetCatalogueSubCategoryId = faker.PickRandom(CatalogueSubCategories).Id
      };

      return input;
    });
  }
}
