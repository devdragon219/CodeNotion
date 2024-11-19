using RealGimm.Infrastructure;
using RealGimm.Infrastructure.Asst.Data.Fakers;
using RealGimm.Web.Asst.Models;

namespace RealGimm.FunctionalTests.Web.Fakers.Asst;

public sealed class CatalogueSubCategoryInputFaker : BaseSeededFaker<CatalogueSubCategoryInput>
{
  public CatalogueSubCategoryInputFaker() : base(seed: 1)
  {
    CustomInstantiator(faker =>
    {
      var input = new CatalogueSubCategoryInput()
      {
        Name = CatalogueSubCategoryFaker.GenerateName(faker),
        InternalCode = CatalogueSubCategoryFaker.GenerateInternalCode(faker),
      };

      return input;
    });
  }
}
