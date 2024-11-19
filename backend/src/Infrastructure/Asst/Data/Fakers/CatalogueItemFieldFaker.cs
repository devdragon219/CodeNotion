using Bogus;
using RealGimm.Core.Asst.CatalogueItemAggregate;
using RealGimm.Core.Asst.CatalogueTypeAggregate;
using RealGimm.Core.CrossModule;

namespace RealGimm.Infrastructure.Asst.Data.Fakers;

public sealed class CatalogueItemFieldFaker : BaseSeededFaker<CatalogueItemField>
{
  public CatalogueTypeField? TemplateTypeField { get; private set; }

  public CatalogueItemFieldFaker()
  {
    CustomInstantiator(faker =>
    {
      var field = new CatalogueItemField();

      if (TemplateTypeField is not null)
      {
        field.SetTemplateTypeId(TemplateTypeField.Id);
        field.SetName(TemplateTypeField.Name);
        field.SetIsMandatory(TemplateTypeField.IsMandatory);
        field.SetType(TemplateTypeField.Type);
        field.SetValue(GenerateValue(faker, TemplateTypeField.Type, TemplateTypeField.IsMandatory, TemplateTypeField.ValidValues));
      }
      else
      {
        field.SetName(GenerateName(faker));
        field.SetIsMandatory(GenerateIsMandatory(faker));
        field.SetType(PickType(faker));
        field.SetValue(GenerateValue(faker, field.Type, field.IsMandatory, null));
      }

      return field;
    });

    FinishWith((_, field) =>
    {
      var validationErrors = field.Validate().ToList();
      if (validationErrors.Count > 0)
      {
        var errorMessages = string.Join(", ", validationErrors.Select(error => error.ErrorMessage));
        throw new InvalidOperationException($"Invalid {nameof(CatalogueTypeActivity)} entity! Errors: {errorMessages}");
      }
    });
  }

  public static string? GenerateValue(Faker faker, CustomFieldType type, bool isMandatory, string[]? validValues)
  {
    var value = type switch
    {
      CustomFieldType.SimpleText => faker.Lorem.Word(),
      CustomFieldType.SimpleNumber => faker.Random.Number(50).ToString(),
      CustomFieldType.Date => faker.Date.PastDateOnly().ToString(),
      CustomFieldType.SingleItemFromList when validValues is not null => faker.PickRandom(validValues),
      CustomFieldType.SingleItemFromList => faker.Lorem.Word(),

      _ => throw new NotImplementedException()
    };

    if (!isMandatory)
    {
      value = value.OrNull(faker);
    }

    return value;
  }

  public static string GenerateName(Faker faker) => CatalogueTypeFieldFaker.GenerateName(faker);

  public static bool GenerateIsMandatory(Faker faker) => CatalogueTypeFieldFaker.GenerateIsMandatory(faker);

  public static CustomFieldType PickType(Faker faker) => CatalogueTypeFieldFaker.PickType(faker);

  public CatalogueItemFieldFaker UseTemplateTypeField(CatalogueTypeField? catalogueTypeField)
  {
    TemplateTypeField = catalogueTypeField;

    return this;
  }
}
