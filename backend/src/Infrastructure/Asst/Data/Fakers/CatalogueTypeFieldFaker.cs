using Bogus;
using RealGimm.Core.Asst.CatalogueTypeAggregate;
using RealGimm.Core.CrossModule;

namespace RealGimm.Infrastructure.Asst.Data.Fakers;

public sealed class CatalogueTypeFieldFaker : BaseSeededFaker<CatalogueTypeField>
{
  public CatalogueTypeFieldFaker()
  {
    CustomInstantiator(faker =>
    {
      var typeField = new CatalogueTypeField();
      typeField.SetName(GenerateName(faker));
      typeField.SetMandatory(GenerateIsMandatory(faker));
      typeField.SetType(PickType(faker));

      if (typeField.Type == CustomFieldType.SingleItemFromList)
      {
        typeField.SetValidValues(GenerateValidValues(faker));
      }

      return typeField;
    });

    FinishWith((_, typeField) =>
    {
      var validationErrors = typeField.Validate().ToList();
      if (validationErrors.Count > 0)
      {
        var errorMessages = string.Join(", ", validationErrors.Select(error => error.ErrorMessage));
        throw new InvalidOperationException($"Invalid {nameof(CatalogueTypeActivity)} entity! Errors: {errorMessages}");
      }
    });
  }

  public static string GenerateName(Faker faker) => faker.Lorem.Word();

  public static bool GenerateIsMandatory(Faker faker) => faker.Random.Bool();

  public static CustomFieldType PickType(Faker faker) => faker.PickRandom<CustomFieldType>();
  
  public static string[] GenerateValidValues(Faker faker) => faker.Lorem.Words(faker.Random.Int(1, 5));
}
