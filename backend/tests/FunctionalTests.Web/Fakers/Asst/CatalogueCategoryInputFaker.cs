using Bogus;
using RealGimm.Infrastructure;
using RealGimm.Infrastructure.Asst.Data.Fakers;
using RealGimm.Web.Asst.Models;

namespace RealGimm.FunctionalTests.Web.Fakers.Asst;

public sealed class CatalogueCategoryInputFaker : BaseSeededFaker<CatalogueCategoryInput>
{
  public CatalogueSubCategoryInputFaker SubCategoryInputFaker { get; private set; } = new();

  public CatalogueCategoryInputFaker() : base(seed: 1)
  {
    CustomInstantiator(faker =>
    {
      var input = new CatalogueCategoryInput()
      {
        Name = CatalogueCategoryFaker.GenerateName(faker),
        InternalCode = CatalogueCategoryFaker.GenerateInternalCode(faker),
        SubCategories = SubCategoryInputFaker.GenerateBetween(1, 10).ToArray()
      };

      return input;
    });
  }

  public CatalogueCategoryInputFaker UseSubCategoryInputFaker(CatalogueSubCategoryInputFaker subCategoryInputFaker)
  {
    SubCategoryInputFaker = subCategoryInputFaker ?? throw new ArgumentNullException(nameof(subCategoryInputFaker));

    return this;
  }
}
