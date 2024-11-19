using RealGimm.Core.Asst.CatalogueTypeAggregate;
using RealGimm.Infrastructure;
using RealGimm.Infrastructure.Asst.Data.Fakers;
using RealGimm.Web.Asst.Models;

namespace RealGimm.FunctionalTests.Web.Fakers.Asst;

public class CatalogueItemFieldInputFaker : BaseSeededFaker<CatalogueItemFieldInput>
{
  public CatalogueTypeField? TypeField { get; private set; } = default!;

  public CatalogueItemFieldInputFaker() : base(seed: 1)
  {
    CustomInstantiator(faker =>
    {
      if (TypeField is not null)
      {
        return new CatalogueItemFieldInput()
        {
          TemplateTypeId = TypeField.Id,
          Name = TypeField.Name!,
          IsMandatory = TypeField.IsMandatory,
          Type = TypeField.Type,
          Value = CatalogueItemFieldFaker.GenerateValue(faker, TypeField.Type, TypeField.IsMandatory, TypeField.ValidValues)
        };
      }
      else
      {
        var input = new CatalogueItemFieldInput()
        {
          Name = CatalogueItemFieldFaker.GenerateName(faker),
          IsMandatory = CatalogueItemFieldFaker.GenerateIsMandatory(faker),
          Type = CatalogueItemFieldFaker.PickType(faker),
        };

        return input with
        {
          Value = CatalogueItemFieldFaker.GenerateValue(faker, input.Type, input.IsMandatory, null)
        };
      }
    });
  }

  public CatalogueItemFieldInputFaker UseTypeField(CatalogueTypeField? catalogueTypeField)
  {
    TypeField = catalogueTypeField;

    return this;
  }
}
