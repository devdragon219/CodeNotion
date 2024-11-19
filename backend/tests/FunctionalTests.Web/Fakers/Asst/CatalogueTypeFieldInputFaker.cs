using RealGimm.Core.CrossModule;
using RealGimm.Infrastructure;
using RealGimm.Infrastructure.Asst.Data.Fakers;
using RealGimm.Web.Asst.Models;

namespace RealGimm.FunctionalTests.Web.Fakers.Asst;

public sealed class CatalogueTypeFieldInputFaker : BaseSeededFaker<CatalogueTypeFieldInput>
{
  public CatalogueTypeFieldInputFaker() : base(seed: 1)
  {
    CustomInstantiator(faker =>
    {
      var type = CatalogueTypeFieldFaker.PickType(faker);

      var validValues = type is CustomFieldType.SingleItemFromList
        ? CatalogueTypeFieldFaker.GenerateValidValues(faker)
        : null;

      var input = new CatalogueTypeFieldInput()
      {
        Name = CatalogueTypeFieldFaker.GenerateName(faker),
        IsMandatory = CatalogueTypeFieldFaker.GenerateIsMandatory(faker),
        Type = type,
        ValidValues = validValues
      };

      return input;
    });
  }
}
