using RealGimm.Infrastructure;
using RealGimm.Infrastructure.Asst.Data.Fakers;
using RealGimm.Web.Asst.Models;

namespace RealGimm.FunctionalTests.Web.Fakers.Asst;

public class CatalogueTypeActivityInputFaker : BaseSeededFaker<CatalogueTypeActivityInput>
{
  public CatalogueTypeActivityInputFaker() : base(seed: 1)
  {
    CustomInstantiator(faker =>
    {
      var input = new CatalogueTypeActivityInput()
      {
        Name = CatalogueTypeActivityFaker.GenerateName(faker),
        ActivityType = CatalogueTypeActivityFaker.PickActivityType(faker),
        IsMandatoryByLaw = CatalogueTypeActivityFaker.GenerateIsMandatoryByLaw(faker)
      };

      return input;
    });
  }
}
